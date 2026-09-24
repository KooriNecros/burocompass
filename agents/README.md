# BuroCompass — Struttura Agentica

Documentazione completa degli agenti, istruzioni, prompt, skill e workflow utilizzati nel progetto.

---

## Indice

```
agents/
  README.md                        ← questo file
  test-and-commit.ps1              ← script CI/CD locale
  prompts/
    burocompass-system-prompt.md   ← system prompt completo dell'agente principale
  skills/
    grilling.md                    ← skill di intervista relentless (design)
    grill-me.md                    ← entry-point utente per grilling
  workflows/
    profile-update.md              ← aggiornamento automatico profilo da conversazione
    test-and-commit.md             ← workflow test → commit → push
```

Sub-agent Claude Code (invocabile via Agent tool):
```
.claude/agents/
  test-and-commit.md               ← sub-agent per CI/CD automatico
```

---

## Agente principale: BuroCompassAgent

| Proprietà | Valore |
|---|---|
| Modello | `claude-sonnet-4-5` |
| Definito in | `app/app/api/chat/route.ts` |
| System prompt | `agents/prompts/burocompass-system-prompt.md` |
| Input | `{ messages: MessageParam[], userProfile?: UserProfile }` |
| Output | `{ message: string, profileUpdate?: Partial<UserProfile> }` |
| Lingua | Auto-detect (italiano, inglese, arabo, francese, cinese, spagnolo, …) |
| Memoria | Profilo strutturato + storico (10 msg) in localStorage |

### Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                        UTENTE                               │
│              (straniero, bassa digital literacy)            │
└────────────────────────┬────────────────────────────────────┘
                         │ messaggio in lingua naturale
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CHAT INTERFACE                            │
│  • auto-detect lingua   • storico conversazione (max 10)    │
│  • trigger wizard       • profilo utente persistito         │
└────────────────────────┬────────────────────────────────────┘
                         │ messages + userProfile
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BUROCOMPASS AGENT (Claude Sonnet)              │
│                                                             │
│  System prompt:                                             │
│    [BASE_SYSTEM_PROMPT]                                     │
│    + PROFILO UTENTE (iniettato dinamicamente se presente)   │
│                                                             │
│  Emette <!--PROFILE_UPDATE:{...}--> quando apprende        │
│  nuove informazioni sull'utente dalla conversazione         │
└──────────┬──────────────────────────────┬───────────────────┘
           │ risposta testuale            │ blocco PROFILE_UPDATE
           ▼                             ▼
┌──────────────────────┐    ┌────────────────────────────────┐
│   RISPOSTA UTENTE    │    │      PROFILE UPDATER           │
│   (testo pulito)     │    │  • parsing JSON dal blocco     │
│                      │    │  • merge con profilo esistente │
│                      │    │  • salvataggio localStorage    │
│                      │    │  • notifica toast visiva       │
└──────────────────────┘    └────────────────────────────────┘
```

---

## Sub-agent: test-and-commit

| Proprietà | Valore |
|---|---|
| Definito in | `.claude/agents/test-and-commit.md` |
| Script standalone | `agents/test-and-commit.ps1` |
| Trigger | Dopo modifiche al codice, prima del push |
| Workflow | `agents/workflows/test-and-commit.md` |

Esegue `tsc --noEmit` → `npm run build` → `git commit` → `git push`. Commit solo se entrambi i check passano.

---

## Skill

### grilling
Skill di intervista relentless per stress-testare decisioni di design prima dell'implementazione.
Documentazione: `agents/skills/grilling.md`

### grill-me
Entry-point utente che delega a `grilling`.
Documentazione: `agents/skills/grill-me.md`

Usata nella fase di design di BuroCompass per definire le scelte architetturali (interaction model, storage, profilo utente, trigger wizard, lingua).

---

## Workflow

### Profile Update
Come l'agente aggiorna autonomamente il profilo utente durante la conversazione.
Documentazione: `agents/workflows/profile-update.md`

### Test and Commit
Pipeline CI/CD locale: type-check + build → commit → push.
Documentazione: `agents/workflows/test-and-commit.md`

---

## Profilo utente (schema)

```typescript
interface UserProfile {
  nationality: string;
  reasonForStay: 'work' | 'study' | 'family' | 'other';
  timeInItaly: 'just_arrived' | 'less_1_year' | 'more_1_year';
  documentsObtained: (
    'codice_fiscale' | 'permesso_soggiorno' | 'residenza' | 'spid' | 'tessera_sanitaria'
  )[];
  familyInItaly: {
    hasFamily: boolean;
    dependents: number;
    nonDependents: number;
  };
}
```

Definito in `app/lib/profile.ts`. Persistito in `localStorage` con chiave `burocompass_profile`.
