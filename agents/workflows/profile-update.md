# Workflow: Aggiornamento automatico del profilo utente

## Scopo

Permettere all'agente BuroCompass di aggiornare il profilo utente in modo silenzioso e autonomo durante la conversazione, senza richiedere un secondo API call né interrompere il flusso della chat.

## Flusso completo

```
Utente scrive: "ho appena ottenuto il codice fiscale"
        │
        ▼
Chat.tsx  →  POST /api/chat  { messages, userProfile }
        │
        ▼
route.ts  →  Claude Sonnet
              system prompt include istruzione PROFILE_UPDATE
        │
        ▼
Claude risponde (testo + blocco nascosto):
  "Ottimo! Con il codice fiscale puoi ora..."
  <!--PROFILE_UPDATE:{"documentsObtained":["codice_fiscale"]}-->
        │
        ▼
route.ts  →  PROFILE_UPDATE_REGEX.match(responseText)
              estrae JSON  →  profileUpdate = { documentsObtained: ["codice_fiscale"] }
              rimuove il blocco dal testo  →  messageText pulito
              return { message: messageText, profileUpdate }
        │
        ▼
Chat.tsx  riceve { message, profileUpdate }
              updateProfileFields(profileUpdate)  →  merge in localStorage
              onProfileUpdate("codice fiscale")   →  page.tsx
        │
        ▼
page.tsx  →  setToastMessage("codice fiscale")
              setProfile(loadProfile())   ← ricarica profilo aggiornato
        │
        ▼
ProfileToast  →  "✓ Profilo aggiornato: codice fiscale"  (auto-dismiss 4s)
```

## Istruzione nel system prompt

```
AGGIORNAMENTO PROFILO:
Se durante la conversazione l'utente menziona di aver ottenuto un documento o di aver cambiato
situazione, aggiungi alla FINE della tua risposta questo blocco JSON:
<!--PROFILE_UPDATE:{"documentsObtained":["codice_fiscale"]}-->
I valori validi per documentsObtained sono:
  codice_fiscale, permesso_soggiorno, residenza, spid, tessera_sanitaria
```

## Regex di parsing

```typescript
// app/app/api/chat/route.ts
const PROFILE_UPDATE_REGEX = /<!--PROFILE_UPDATE:([\s\S]*?)-->/;
```

Il flag `s` non è disponibile nel target ES di questo tsconfig — si usa `[\s\S]*?` per match multiline.

## Schema del blocco

```json
<!--PROFILE_UPDATE:{
  "documentsObtained": ["codice_fiscale", "spid"],
  "reasonForStay": "work",
  "timeInItaly": "less_1_year"
}-->
```

Tutti i campi sono opzionali. Il merge in `updateProfileFields()` fa `Object.assign` sul profilo esistente, con array-merge per `documentsObtained` (deduplica via `Set`).

## Valori validi

| Campo | Valori |
|---|---|
| `documentsObtained` | `codice_fiscale`, `permesso_soggiorno`, `residenza`, `spid`, `tessera_sanitaria` |
| `reasonForStay` | `work`, `study`, `family`, `other` |
| `timeInItaly` | `just_arrived`, `less_1_year`, `more_1_year` |

## Protezioni

- Il blocco viene **sempre rimosso** dal testo visibile prima di mostrarlo all'utente
- JSON malformato viene ignorato silenziosamente (try/catch in route.ts)
- Il profilo aggiornato viene ricaricato da localStorage (source of truth) — non da una variabile in memoria
