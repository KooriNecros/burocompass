---
name: grill-me
description: A relentless interview to sharpen a plan or design. Entry-point che delega a grilling.
scope: user-level (~/.claude/skills/grill-me/SKILL.md)
disable-model-invocation: true
source: https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md
---

# Skill: grill-me

Entry-point user-facing per invocare la skill `grilling`. Non invoca il modello direttamente — redirige alla skill di intervista.

## Implementazione

```markdown
---
name: grill-me
description: A relentless interview to sharpen a plan or design.
disable-model-invocation: true
---

Call the Skill tool with "grilling".
```

## Come invocarla

```
/grill-me
```

## Relazione con grilling

```
/grill-me  →  (delega a)  →  grilling  →  intervista a rounds
```

`grill-me` è il comando esposto all'utente; `grilling` contiene la logica vera e propria.

## Installazione

Le skill sono installate a livello utente in:
```
~/.claude/skills/
  grill-me/SKILL.md
  grilling/SKILL.md
```

Non sono nel repository del progetto ma sono state usate nel processo di design di BuroCompass.
