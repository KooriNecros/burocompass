---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
scope: user-level (~/.claude/skills/grilling/SKILL.md)
source: https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md
---

# Skill: grilling

Skill di intervista relentless per stress-testare un piano o una decisione prima di implementarlo.

## Come funziona

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Format a round like so:

```
❓ **Q1** - **<question title>**: <question body>

➡️ <recommended answer>

---

❓ **Q2** - **<question title>**: <question body>

➡️ <recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

## Come invocarla

```
/grilling
```

oppure tramite `grill-me` (vedi `skills/grill-me.md`).

## Utilizzo nel progetto

Usata nella fase di design per definire le scelte architetturali di BuroCompass prima dell'implementazione. Le decisioni emerse dalla sessione di grilling sono documentate nel piano di implementazione (`memory/` del progetto Claude Code).
