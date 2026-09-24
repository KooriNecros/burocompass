# Workflow: Test → Commit → Push

## Scopo

Garantire che nessuna modifica venga pushata su GitHub senza prima aver superato i controlli di qualità del codice (type-check + build).

## Flusso

```
Modifica al codice
        │
        ▼
[1] npx tsc --noEmit         (TypeScript type-check)
        │
   FAIL ├──────────────────► STOP — riporta errori, nessun commit
        │
   PASS ▼
[2] npm run build             (Next.js production build)
        │
   FAIL ├──────────────────► STOP — riporta errori, nessun commit
        │
   PASS ▼
[3] git add <files>           (esclude .env.local e file con segreti)
        │
        ▼
[4] git commit -m "<message>" (messaggio custom o auto-generato)
        │
        ▼
[5] git push                  (origin/master)
        │
        ▼
     DONE ✓
```

## Modi di esecuzione

### A. Claude Code sub-agent (automatico)

Definito in `.claude/agents/test-and-commit.md`. Invocabile da Claude Code con:

```
Agent(subagent_type: "test-and-commit", prompt: "Commit my changes with message: ...")
```

Claude Code lo usa automaticamente quando viene chiesto di fare commit dopo modifiche.

### B. Script PowerShell (manuale)

```powershell
# Da root del repo — auto-genera messaggio dai file modificati
.\agents\test-and-commit.ps1

# Con messaggio custom
.\agents\test-and-commit.ps1 -Message "Add wizard step 3 personalization"
```

## Regole di sicurezza

- Mai committare file `.env*` o `.env.local`
- Mai usare `--no-verify` (non bypassare i git hooks)
- Mai amend di commit esistenti — sempre nuovo commit
- Il push fallisce silenziosamente se non c'è niente da committare

## File coinvolti

| File | Ruolo |
|---|---|
| `.claude/agents/test-and-commit.md` | Definizione del sub-agent Claude Code |
| `agents/test-and-commit.ps1` | Script PowerShell standalone |

## Commit message format

```
<descrizione imperativa, max 72 char>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
