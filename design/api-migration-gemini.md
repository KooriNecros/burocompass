# BuroCompass — Migrazione API: Anthropic → Google Gemini

**Data:** 24 settembre 2026  
**Motivazione:** L'API Anthropic richiede una chiave a pagamento. Google Gemini offre un tier gratuito tramite Google AI Studio senza carta di credito.

---

## Decisione

| Voce | Prima | Dopo |
|---|---|---|
| Provider | Anthropic | Google AI Studio |
| Modello | `claude-sonnet-4-5` | `gemini-2.0-flash` |
| SDK | `@anthropic-ai/sdk` | `@google/generative-ai` |
| Variabile env | `ANTHROPIC_API_KEY` | `GOOGLE_AI_API_KEY` |
| Costo | A pagamento | Gratuito (free tier) |
| Chiave da | console.anthropic.com | aistudio.google.com/apikey |

---

## Scope della modifica

**3 file toccati, logica applicativa invariata.**

La logica PROFILE_UPDATE, il profilo utente, lo storico e tutti i componenti UI restano identici. Cambia solo lo strato di integrazione in `route.ts`.

### `app/package.json`
```diff
- "@anthropic-ai/sdk": "^0.128.0"
+ "@google/generative-ai": "^0.21.0"
```

### `app/app/api/chat/route.ts`

```diff
- import Anthropic from "@anthropic-ai/sdk";
- import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
+ import { GoogleGenerativeAI } from "@google/generative-ai";
+ import { Message } from "@/lib/profile";

- const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
+ const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY ?? "");
```

Conversione formato messaggi (Gemini usa `"model"` invece di `"assistant"`):
```typescript
const contents = messages.map((m) => ({
  role: m.role === "assistant" ? "model" : "user",
  parts: [{ text: m.content }],
}));
```

Chiamata al modello:
```typescript
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemPrompt,
});
const response = await geminiModel.generateContent({ contents });
const text = response.response.text();
```

### `app/.env.local` + `app/.env.example`
```diff
- ANTHROPIC_API_KEY=sk-ant-...
+ GOOGLE_AI_API_KEY=AIza...
```

---

## Come ottenere la chiave gratuita

1. Vai su **https://aistudio.google.com/apikey**
2. Accedi con account Google
3. "Create API key"
4. Incolla in `app/.env.local` come `GOOGLE_AI_API_KEY=AIza...`

---

## Alternative valutate e scartate

| Provider | Motivo esclusione |
|---|---|
| Groq | Richiede registrazione email separata, modelli llama meno precisi per istruzioni complesse in italiano |
| Ollama | Richiede installazione + download modello da ~4GB, non adatto a demo rapida |

---

## Verifica

1. `npm install` in `app/`
2. Inserire chiave in `.env.local`
3. `npm run dev` → test conversazione
4. Verificare PROFILE_UPDATE con "ho il codice fiscale"
5. Verificare wizard permesso di soggiorno
