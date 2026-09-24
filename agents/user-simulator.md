# Agent: user-simulator

Sub-agent Claude Code per il test intensivo e la QA dell'applicazione BuroCompass.

**Definizione:** `.claude/agents/user-simulator.md`

---

## Scopo

Simula una persona straniera con bassa alfabetizzazione digitale che interagisce con BuroCompass via API. Quando rileva un'issue (errore bloccante, deviazione dal piano di design, comportamento inatteso), **apre immediatamente un issue su GitHub** e prosegue il test senza interruzioni.

---

## Come invocarlo

```
Agent(subagent_type: "user-simulator")                      # lingua casuale
Agent(subagent_type: "user-simulator", args: "english")
Agent(subagent_type: "user-simulator", args: "français")
Agent(subagent_type: "user-simulator", args: "العربية")
Agent(subagent_type: "user-simulator", args: "español")
Agent(subagent_type: "user-simulator", args: "українська")
Agent(subagent_type: "user-simulator", args: "中文")
Agent(subagent_type: "user-simulator", args: "italiano")
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

## Protocollo di apertura issue

Quando viene rilevata un'issue, l'agente esegue immediatamente:

```bash
gh issue create \
  --repo KooriNecros/burocompass \
  --title "[QA][<LANG>] <descrizione breve>" \
  --label "bug" \
  --body "..."
```

Poi **prosegue al turno successivo** senza interrompere la sessione.

### Trigger per apertura issue

| Evento | Label | Severity |
|---|---|---|
| HTTP 500 su qualsiasi turno | `bug` | Critical |
| HTTP 429 senza messaggio retry | `bug` | High |
| Risposta in lingua sbagliata | `bug` | High |
| Blocco PROFILE_UPDATE visibile nel message | `bug` | Medium |
| PROFILE_UPDATE non emesso dopo menzione documento | `bug` | Medium |
| Nessun passo numerato in risposta procedurale | `deviation` | Medium |
| Nessun riferimento ufficio | `deviation` | Low |
| Nessuna domanda di chiusura | `deviation` | Low |
| Linguaggio legale prescrittivo rilevato | `bug` | High |
| Connection refused / crash | `bug` | Critical |

---

## Turni di test (7 obbligatori)

| Turno | Scenario | Contratto verificato |
|---|---|---|
| 1 | Apertura su permesso di soggiorno | Q3, SP steps, SP offices, SP question |
| 2 | Follow-up documento specifico | Q3 coerenza |
| 3 | Documento già ottenuto | Q8 emissione + stripping |
| 4 | Familiare in Italia | Adattamento contesto |
| 5 | Ri-menziona permesso | Q11 no 500 |
| 6 | Domanda fuori scope | Gestione graceful |
| 7 | Messaggio ambiguo/rotto | No 500, recovery |

---

## Report finale

Alla fine dei 7 turni, il report include:
- Risultato per ogni turno
- Tabella deviazioni dal piano
- **Elenco issue GitHub aperte con link**
- Raccomandazioni

---

## Prerequisiti

- Server in esecuzione su `localhost:3000`
- `GOOGLE_AI_API_KEY` valida in `app/.env.local`
- `gh` autenticato (`gh auth status`)
