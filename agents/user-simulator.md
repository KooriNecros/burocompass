# Agent: user-simulator

Sub-agent Claude Code per il test intensivo e la QA dell'applicazione BuroCompass.

**Definizione:** `.claude/agents/user-simulator.md`

---

## Scopo

Simula una persona straniera con bassa alfabetizzazione digitale che interagisce con BuroCompass via API. Al termine della sessione produce un report strutturato con:

- Risultato per ogni turno (OK / errore)
- **Deviazioni dal piano di design** (confronto con `design/design-decisions.md`)
- **Errori HTTP** o risposte inattese
- Raccomandazioni di miglioramento

---

## Come invocarlo

```
Agent(subagent_type: "user-simulator")                      # lingua casuale
Agent(subagent_type: "user-simulator", args: "english")     # inglese
Agent(subagent_type: "user-simulator", args: "français")    # francese
Agent(subagent_type: "user-simulator", args: "العربية")     # arabo
Agent(subagent_type: "user-simulator", args: "español")     # spagnolo
Agent(subagent_type: "user-simulator", args: "українська")  # ucraino
Agent(subagent_type: "user-simulator", args: "中文")         # cinese
Agent(subagent_type: "user-simulator", args: "italiano")    # italiano
```

---

## Lingue e personas simulate

| Lingua | Persona |
|---|---|
| italiano | Dragos, rumeno, 28 anni, lavoro in magazzino, arrivato 3 mesi fa |
| english | Emeka, nigeriano, 32 anni, appena arrivato, nessun documento |
| français | Mamadou, senegalese, 35 anni, ricongiungimento familiare, moglie + 2 figli |
| العربية | Youssef, marocchino, 41 anni, lavoro, ha già il codice fiscale |
| español | Diego, ecuadoriano, 26 anni, 6 mesi in Italia, lavoro |
| українська | Oksana, ucraina, 38 anni, motivi familiari, 1 figlio a carico |
| 中文 | Wei, cinese, 22 anni, studente universitario |

---

## Turni di test (7 obbligatori)

| Turno | Scenario | Cosa verifica |
|---|---|---|
| 1 | Domanda apertura su permesso di soggiorno | Lingua corretta, passi numerati |
| 2 | Follow-up su un documento specifico | Lingua coerente, ufficio citato |
| 3 | Menziona documento già ottenuto | `PROFILE_UPDATE` presente nel raw, assente nel message |
| 4 | Menziona familiare in Italia | Risposta adattata al contesto familiare |
| 5 | Ri-menziona permesso di soggiorno | Nessun errore server |
| 6 | Domanda fuori scope (banca, scuola, patente) | Risposta graceful, no rifiuto |
| 7 | Messaggio ambiguo o rotto | Nessun errore 500 |

---

## Contratti di design verificati

Estratti da `design/design-decisions.md`:

| Ref | Contratto | Criteri |
|---|---|---|
| Q3 | Auto-detect lingua | Ogni risposta nella lingua dell'utente |
| Q8 | PROFILE_UPDATE emesso | Blocco HTML nel raw JSON al turno 3 |
| Q8 | PROFILE_UPDATE rimosso | Campo `message` pulito (no HTML comment) |
| Q11 | Keyword wizard sicure | Nessun errore server al trigger |
| SP | Passi numerati | Procedure elencate con numeri |
| SP | Riferimenti uffici | Almeno un ufficio citato per risposta |
| SP | Domanda di chiusura | Ogni risposta termina con una domanda |
| SP | No consulenza legale | Nessuna prescrizione legale diretta |

---

## Esempio report

```
╔══════════════════════════════════════════════════════════════╗
║              BUROCOMPASS — TEST REPORT                      ║
╠══════════════════════════════════════════════════════════════╣
║ Language   : english                                        ║
║ Persona    : Emeka — Nigerian, just arrived, no documents   ║
║ Turns      : 7                                              ║
║ HTTP Errors: 0                                              ║
╚══════════════════════════════════════════════════════════════╝

── DEVIATIONS FROM DESIGN PLAN ──────────────────────────────

[Q3]  Auto-detect language         ✓  All 7 responses in English
[Q8]  PROFILE_UPDATE emitted       ✓  Found in raw response turn 3
[Q8]  PROFILE_UPDATE stripped      ✓  message field clean
[Q11] Wizard keywords safe         ✓  No 500 errors
[SP]  Numbered steps               ⚠  Turn 6 response had no numbered list
[SP]  Office references            ✓  Questura/Comune cited in turns 1,2,5
[SP]  Closing question             ✗  Turns 4 and 7 had no closing question
[SP]  No legal advice              ✓

── RECOMMENDATIONS ───────────────────────────────────────────
1. System prompt closing question rule not consistently applied — consider
   adding a stricter reminder at the end of BASE_SYSTEM_PROMPT
2. Out-of-scope responses (bank account) lack numbered steps — add to
   system prompt that ALL procedural answers must use numbered lists
```

---

## Prerequisiti

- Server in esecuzione su `localhost:3000` (`npm run dev` in `app/`)
- `GOOGLE_AI_API_KEY` configurata in `app/.env.local`
