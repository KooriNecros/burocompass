# Pipeline: Controller → Developer

Sistema multi-agente per la risoluzione automatica delle issue GitHub aperte dal simulatore QA.

---

## Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER AGENT                         │
│  Diritti: lettura issue GitHub (gh issue list/view)         │
│  Strumenti: Bash (solo gh read), Read                       │
│                                                             │
│  1. gh issue list → filtra bug/deviation aperti            │
│  2. Legge file sorgente per contesto                        │
│  3. Spawna un Developer per ogni issue (in parallelo)       │
│  4. Raccoglie i risultati e stampa il report finale         │
└──────────────────────────┬──────────────────────────────────┘
                           │ spawna (Agent tool)
              ┌────────────┼────────────┐
              ▼            ▼            ▼
   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │  DEVELOPER   │ │  DEVELOPER   │ │  DEVELOPER   │
   │  #issue-N    │ │  #issue-M    │ │  #issue-K    │
   └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
          │                │                │
          ▼                ▼                ▼
   fix/issue-N-*    fix/issue-M-*    fix/issue-K-*
   (branch proprio) (branch proprio) (branch proprio)
          │
          ▼
   ┌──────────────────────────────────────────┐
   │         TEST-AND-COMMIT SCRIPT           │
   │  npx tsc --noEmit → npm run build →      │
   │  git commit → git push branch            │
   └──────────────────────────────────────────┘
          │
          ▼
   gh issue comment #N "Fixed in branch fix/issue-N-*"
```

---

## Diritti e restrizioni

| Agente | Branch | File sorgente | Issue GitHub | Commit/Push |
|---|---|---|---|---|
| **Controller** | ✗ nessuno | Sola lettura | Sola lettura | ✗ mai |
| **Developer** | ✓ solo il proprio | Lettura + scrittura | Solo commenti | ✓ solo branch proprio |

Il Developer **non può mai toccare** `master`, `main` o branch di altri Developer.

---

## Flusso del Developer per ogni issue

```
1. git checkout master && git pull
2. git checkout -b fix/issue-<N>-<slug>
3. Legge codice + design-decisions.md → identifica root cause
4. Implementa fix (max 3 file)
5. npx tsc --noEmit → npm run build
6. Se OK: .\agents\test-and-commit.ps1 -Message "Fix #N: <title>"
7. gh issue comment #N "Fixed in branch ..."
8. Stampa [DEVELOPER RESULT] per il Controller
```

---

## Come invocarlo

### Avvio manuale del Controller

```
Agent(subagent_type: "controller")
```

oppure da Claude Code:
```
/controller
```

### Il Controller spawna i Developer automaticamente

Il Controller non richiede parametri. Legge le issue aperte, filtra quelle con label `bug` o `deviation`, e dispatcha un Developer per ognuna.

---

## Naming convention branch

```
fix/issue-<numero>-<slug>

Esempi:
  fix/issue-3-q3-language-regression
  fix/issue-7-profile-update-spurious
  fix/issue-12-rate-limit-message
```

---

## Definizioni

| File | Ruolo |
|---|---|
| `.claude/agents/controller.md` | Definizione agente Controller |
| `.claude/agents/developer.md` | Definizione agente Developer |
| `.claude/agents/test-and-commit.md` | Sub-agent CI/CD (usato dal Developer) |
| `agents/test-and-commit.ps1` | Script PowerShell CI/CD |

---

## Prerequisiti

- `gh` autenticato (`gh auth status`)
- Server non necessario durante il fix (solo durante i test QA)
- Branch `master` aggiornato prima dell'avvio del Controller
