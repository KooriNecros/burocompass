import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { UserProfile, Message, formatProfileForPrompt } from "@/lib/profile";

const anthropic = new Anthropic({
  authToken: process.env.ANTHROPIC_AUTH_TOKEN,
});
const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

const BASE_SYSTEM_PROMPT = `Sei BuroCompass, un assistente digitale che aiuta persone straniere a orientarsi nella burocrazia italiana.

Il tuo compito è guidare l'utente passo dopo passo nelle pratiche amministrative in modo semplice, chiaro e accessibile.

REGOLE DI COMPORTAMENTO:
- Rispondi SEMPRE nella stessa lingua in cui ti scrive l'utente (italiano, inglese, francese, arabo, cinese, spagnolo, ecc.)
- Se l'utente scrive in arabo, rispondi ESCLUSIVAMENTE in arabo. Se scrive in francese, rispondi ESCLUSIVAMENTE in francese. Nessuna frase in italiano nelle risposte in altra lingua.
- Usa un linguaggio semplice, evita termini tecnici senza spiegarli
- Sii concreto: elenca i passi da seguire, i documenti necessari, gli uffici da contattare
- Se non conosci la risposta esatta, dillo e suggerisci dove trovare informazioni aggiornate
- Non dare mai consulenza legale specifica: orienta, non prescrivi

AREE DI COMPETENZA:
- Permesso di soggiorno (richiesta, rinnovo, tipologie)
- Codice fiscale e come ottenerlo
- Residenza anagrafica e iscrizione al Comune
- SPID e identità digitale
- Iscrizione al Servizio Sanitario Nazionale (SSN) e tessera sanitaria
- Ricongiungimento familiare
- Lavoro: contratti, busta paga, INPS, NASpI
- Dichiarazione dei redditi (730)
- Iscrizione scolastica dei figli
- Riconoscimento titoli di studio esteri
- Apertura conto bancario
- Affitto e contratti di locazione
- Patente di guida (conversione/riconoscimento)
- Cittadinanza italiana

STRUTTURA DELLE RISPOSTE:
- Inizia sempre con una frase di comprensione della situazione
- Elenca i passi in ordine numerato quando possibile
- Indica l'ufficio o il portale di riferimento per ogni passo
- Chiudi sempre chiedendo se l'utente ha bisogno di approfondire qualcosa

AGGIORNAMENTO PROFILO:
Se durante la conversazione l'utente menziona di aver ottenuto un documento NON già presente nel suo profilo, aggiungi alla FINE della tua risposta questo blocco JSON (non mostrarlo all'utente, sarà rimosso automaticamente):
<!--PROFILE_UPDATE:{"documentsObtained":["permesso_soggiorno"]}-->
I valori validi per documentsObtained sono: codice_fiscale, permesso_soggiorno, residenza, spid, tessera_sanitaria.
NON emettere il blocco PROFILE_UPDATE per documenti già elencati nel profilo utente sopra.

Ricorda: l'utente potrebbe avere poca dimestichezza con la burocrazia italiana e con il digitale. Sii paziente, chiaro e incoraggiante.`;

const PROFILE_UPDATE_REGEX = /<!--PROFILE_UPDATE:([\s\S]*?)-->/;

function buildLanguageLock(messages: Message[]): string {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");

  if (/[؀-ۿ]/.test(userText))
    return "[LANGUAGE LOCK] The user writes in Arabic. You MUST respond EXCLUSIVELY in Arabic (العربية). Do not write a single word in Italian or any other language.";
  if (/[一-鿿㐀-䶿]/.test(userText))
    return "[LANGUAGE LOCK] The user writes in Chinese. You MUST respond EXCLUSIVELY in Chinese (中文). Do not write any Italian.";
  if (/[Ѐ-ӿ]/.test(userText))
    return "[LANGUAGE LOCK] The user writes in a Cyrillic-script language. You MUST respond EXCLUSIVELY in that language. Do not write any Italian.";

  const lower = userText.toLowerCase();
  if (/\b(the|and|for|how|can|i |my|do |what|where|when|get|need|have|is |it |you|help|please|want|already|just|arrived)\b/.test(lower))
    return "[LANGUAGE LOCK] The user writes in English. You MUST respond EXCLUSIVELY in English. Do not write any Italian.";
  if (/\b(je |vous|nous|le |la |les |un |une |des |et |ou |comment|pour |avec|mon |ma |mes |est |pas |que |qui |bonjour|merci)\b/.test(lower))
    return "[LANGUAGE LOCK] L'utilisateur écrit en français. Vous DEVEZ répondre EXCLUSIVEMENT en français. N'écrivez pas en italien.";
  if (/\b(yo |tu |él |ella|como|para|con |que |por |una |un |los |las |mi |su |es |no |en |hola|gracias|quiero|necesito)\b/.test(lower))
    return "[LANGUAGE LOCK] El usuario escribe en español. Debes responder EXCLUSIVAMENTE en español. No escribas en italiano.";

  return "";
}

function isRateLimitError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const msg = String((error as { message?: string }).message ?? "");
    const status = (error as { status?: number }).status;
    return (
      status === 429 ||
      msg.includes("[429") ||
      msg.toLowerCase().includes("quota exceeded") ||
      msg.toLowerCase().includes("rate limit")
    );
  }
  return false;
}

function getLocalizedErrors(languageLock: string): { rate: string; internal: string } {
  const lock = languageLock.toLowerCase();
  if (lock.includes("arabic"))
    return { rate: "الخدمة مشغولة مؤقتًا. يُرجى المحاولة بعد لحظات قليلة.", internal: "حدث خطأ داخلي. حاول مرة أخرى." };
  if (lock.includes("chinese"))
    return { rate: "服务暂时繁忙，请稍后再试。", internal: "发生内部错误，请重试。" };
  if (lock.includes("french"))
    return { rate: "Le service est temporairement surchargé. Réessayez dans quelques secondes.", internal: "Erreur interne du serveur." };
  if (lock.includes("spanish"))
    return { rate: "El servicio está temporalmente saturado. Inténtalo de nuevo en unos segundos.", internal: "Error interno del servidor." };
  if (lock.includes("english"))
    return { rate: "The service is temporarily overloaded. Please try again in a few seconds.", internal: "Internal server error." };
  if (lock.includes("cyrillic"))
    return { rate: "Сервис временно перегружен. Повторите попытку через несколько секунд.", internal: "Внутренняя ошибка сервера." };
  return {
    rate: "Il servizio è temporaneamente sovraccarico. Riprova tra qualche secondo.",
    internal: "Errore interno del server.",
  };
}

export async function POST(req: NextRequest) {
  let languageLock = "";
  try {
    const { messages, userProfile } = (await req.json()) as {
      messages: Message[];
      userProfile?: UserProfile;
    };

    if (!process.env.ANTHROPIC_AUTH_TOKEN) {
      return NextResponse.json(
        { error: "ANTHROPIC_AUTH_TOKEN non configurato." },
        { status: 500 }
      );
    }

    languageLock = buildLanguageLock(messages);
    const systemPrompt = [
      languageLock,
      BASE_SYSTEM_PROMPT,
      userProfile ? formatProfileForPrompt(userProfile) : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    let messageText =
      response.content[0].type === "text" ? response.content[0].text : "";
    let profileUpdate: Partial<UserProfile> | undefined;

    const match = messageText.match(PROFILE_UPDATE_REGEX);
    if (match) {
      try {
        profileUpdate = JSON.parse(match[1]);
      } catch {
        // malformed JSON, ignore
      }
      messageText = messageText.replace(PROFILE_UPDATE_REGEX, "").trim();
    }

    return NextResponse.json({ message: messageText, profileUpdate });
  } catch (error) {
    console.error("Errore API chat:", error);
    const errs = getLocalizedErrors(languageLock);
    if (isRateLimitError(error)) {
      return NextResponse.json({ error: errs.rate }, { status: 429 });
    }
    return NextResponse.json({ error: errs.internal }, { status: 500 });
  }
}
