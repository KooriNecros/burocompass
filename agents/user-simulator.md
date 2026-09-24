# Agent: user-simulator

Sub-agent Claude Code per il test intensivo dell'applicazione BuroCompass.

**Definizione:** `.claude/agents/user-simulator.md`

---

## Scopo

Simula una persona straniera con bassa alfabetizzazione digitale che interagisce con BuroCompass. Verifica:
- Risposte multilingue coerenti
- Trigger automatico aggiornamento profilo (`PROFILE_UPDATE`)
- Suggerimento wizard al menzione di "permesso di soggiorno"
- Gestione di domande fuori scope
- Assenza di errori 500

---

## Come invocarlo

```
Agent(subagent_type: "user-simulator")                     # lingua casuale
Agent(subagent_type: "user-simulator", args: "english")    # lingua specificata
Agent(subagent_type: "user-simulator", args: "العربية")    # arabo
Agent(subagent_type: "user-simulator", args: "français")   # francese
```

Oppure dal contesto Claude Code:
```
Avvia il simulatore utente in italiano
Testa l'app in arabo
Simula un utente ucraino
```

---

## Lingue supportate

| Lingua | Persona simulata |
|---|---|
| italiano | Rumeno, arrivato da 3 mesi per lavoro |
| english | Nigerian, just arrived, looking for work permit |
| français | Sénégalais, venu pour rejoindre sa famille |
| العربية | Marocchino, arrivato per lavoro, ha già il codice fiscale |
| español | Ecuadoriano, arrivato da 6 mesi per lavoro |
| українська | Ucraina, arrivata per motivi familiari, con figli a carico |
| 中文 | Cinese, arrivato per studio |

---

## Scenari testati (per ogni sessione)

1. Domanda iniziale sul permesso di soggiorno
2. Follow-up su un documento specifico
3. **Trigger PROFILE_UPDATE** — menziona documento già ottenuto
4. **Trigger wizard** — ri-menziona permesso di soggiorno
5. Domanda fuori scope (conto bancario, scuola, ecc.)
6. Verifica coerenza linguistica in ogni risposta

---

## Output: report di test

```
=== TEST REPORT ===
Language: english
Persona: Nigerian, just arrived, looking for work permit
Turns: 6

✓ App responded in correct language (every turn)
✓ PROFILE_UPDATE block detected in turn 3
✓ Wizard trigger phrase detected in response
✓ Edge case handled gracefully
✗ Turn 4 returned 500 — GOOGLE_AI_API_KEY rate limit

Issues found:
- Rate limit hit on turn 4, retry after 1s resolved it
```

---

## Endpoint testato

```
POST http://localhost:3000/api/chat
Content-Type: application/json

{
  "messages": [{ "role": "user", "content": "..." }],
  "userProfile": { ... }
}
```

Il server deve essere in esecuzione su `localhost:3000` prima di invocare l'agente.
