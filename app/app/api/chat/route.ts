import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { NextRequest, NextResponse } from "next/server";
import { UserProfile, formatProfileForPrompt } from "@/lib/profile";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BASE_SYSTEM_PROMPT = `Sei BuroCompass, un assistente digitale che aiuta persone straniere a orientarsi nella burocrazia italiana.

Il tuo compito è guidare l'utente passo dopo passo nelle pratiche amministrative in modo semplice, chiaro e accessibile.

REGOLE DI COMPORTAMENTO:
- Rispondi SEMPRE nella stessa lingua in cui ti scrive l'utente (italiano, inglese, francese, arabo, cinese, spagnolo, ecc.)
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
Se durante la conversazione l'utente menziona di aver ottenuto un documento o di aver cambiato situazione (es. "ho già il codice fiscale", "ho trovato lavoro", "ho un figlio a carico"), aggiungi alla FINE della tua risposta questo blocco JSON (non mostrarlo all'utente, sarà rimosso automaticamente):
<!--PROFILE_UPDATE:{"documentsObtained":["codice_fiscale"]}-->
I valori validi per documentsObtained sono: codice_fiscale, permesso_soggiorno, residenza, spid, tessera_sanitaria.

Ricorda: l'utente potrebbe avere poca dimestichezza con la burocrazia italiana e con il digitale. Sii paziente, chiaro e incoraggiante.`;

const PROFILE_UPDATE_REGEX = /<!--PROFILE_UPDATE:([\s\S]*?)-->/;

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json() as {
      messages: MessageParam[];
      userProfile?: UserProfile;
    };

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY non configurata. Aggiungila nel file .env.local" },
        { status: 500 }
      );
    }

    const systemPrompt = userProfile
      ? `${BASE_SYSTEM_PROMPT}\n\n${formatProfileForPrompt(userProfile)}`
      : BASE_SYSTEM_PROMPT;

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Risposta inattesa dal modello" }, { status: 500 });
    }

    let messageText = content.text;
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
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
