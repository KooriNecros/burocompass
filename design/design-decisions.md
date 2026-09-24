# BuroCompass — Piano di design e decisioni architetturali

**Data:** 24 settembre 2026  
**Team:** Francesco Giovo, Manuel Marseglia  
**Metodo:** Sessione di design con skill `/grill-me` (Claude Code)

---

## Metodologia: skill grill-me

Prima di scrivere una singola riga di codice, il team ha usato la skill `/grill-me` di Claude Code per stress-testare il design dell'applicazione. La skill conduce un'**intervista relentless a rounds**: ad ogni round l'AI mappa le decisioni aperte (il "frontier"), propone le sue raccomandazioni con opzioni numerate, e **attende che siano gli umani a decidere**. Solo quando il frontier è vuoto — ogni ramo dell'albero delle decisioni visitato — si procede con l'implementazione.

> **Principio chiave:** l'AI propone, l'umano decide.

---

## Round 1 — Decisioni fondamentali (Q1–Q8)

---

### ❓ Q1 — Modello di interazione principale

Quale deve essere il paradigma primario con cui l'utente interagisce con BuroCompass?

**Opzioni proposte dall'AI:**
- **A)** Solo wizard guidato passo-passo — strutturato, prevedibile, ma rigido
- **B)** Solo chat conversazionale — flessibile, multilingue, ma meno guidato
- **C)** Chat + wizard panel affiancato — ibrido: chat sempre visibile, wizard opzionale

➡️ **Raccomandazione AI:** C) — il wizard garantisce completezza per i casi critici (permesso di soggiorno); la chat gestisce tutto il resto e le domande non previste.

✅ **Decisione del team:** **B) privilegiando la creazione del chatbot** come nucleo principale, con il wizard come funzione complementare accessibile su richiesta. La chat deve essere sempre visibile anche quando il wizard è aperto.

---

### ❓ Q2 — Golden path: quale procedura implementare nel wizard

Il wizard non può coprire tutto in un hackathon. Quale procedura burocrazia ha il più alto impatto per l'utente target?

**Opzioni proposte dall'AI:**
- **A)** Permesso di soggiorno (prima richiesta) — la pratica più urgente e complessa per chi arriva
- **B)** Codice fiscale — più semplice, ma prerequisito di quasi tutto
- **C)** Flusso multipli in parallelo — troppo ambizioso per 4 ore

➡️ **Raccomandazione AI:** A) — il permesso di soggiorno è il documento identitario che sblocca tutto il resto; ha il maggior valore percepito dall'utente.

✅ **Decisione del team:** **A) Permesso di soggiorno — prima richiesta.**

---

### ❓ Q3 — Gestione della lingua

Come gestire le molteplici lingue degli utenti (arabo, francese, cinese, spagnolo, inglese, italiano)?

**Opzioni proposte dall'AI:**
- **A)** Selettore lingua esplicito nell'interfaccia
- **B)** Auto-detect dalla prima frase dell'utente, risposta nella stessa lingua
- **C)** Solo italiano (limita il target ma semplifica l'implementazione)

➡️ **Raccomandazione AI:** B) — Claude Sonnet supporta natively il multilinguismo; aggiungere un selettore crea attrito per utenti con bassa digital literacy.

✅ **Decisione del team:** **Auto-detect senza selettore.** Claude risponde sempre nella lingua in cui l'utente scrive.

---

### ❓ Q4 — Persistenza dei dati

Dove e come salvare profilo utente e storico conversazione?

**Opzioni proposte dall'AI:**
- **A)** Nessuna persistenza — stateless, ogni sessione riparte da zero
- **B)** Session storage — dati solo per la sessione corrente
- **C)** localStorage — profilo utente strutturato + storico conversazione, persistenti tra sessioni

➡️ **Raccomandazione AI:** C) — il profilo consente all'agente di personalizzare le risposte in modo significativo; perderlo ad ogni sessione vanifica il valore dell'onboarding.

✅ **Decisione del team:** **localStorage con log delle informazioni dell'utente.** Il profilo ha priorità sullo storico.

---

### ❓ Q5 — Profondità del wizard

Cosa deve produrre il wizard al termine del flow?

**Opzioni proposte dall'AI:**
- **A)** Solo testo informativo step-by-step
- **B)** Raccolta dati + invio a Claude per risposta personalizzata
- **C)** Raccolta dati → checklist documenti personalizzata generata dinamicamente

➡️ **Raccomandazione AI:** C) — la checklist è un output concreto e azionabile; l'utente può spuntare i documenti man mano che li ottiene.

✅ **Decisione del team:** **C) Raccolta dati → checklist documenti personalizzata** in base a nazionalità, motivo del soggiorno e situazione alloggiativa.

---

### ❓ Q6 — Onboarding al primo avvio

Come raccogliere il profilo utente alla prima visita?

**Opzioni proposte dall'AI:**
- **A)** Modale minima al primo avvio (5 campi essenziali)
- **B)** Onboarding lungo e dettagliato (>10 campi)
- **C)** Nessun onboarding: il profilo si costruisce progressivamente dalla chat

➡️ **Raccomandazione AI:** A) — un onboarding lungo scoraggia gli utenti con bassa digital literacy; 5 campi coprono le personalizzazioni più significative.

✅ **Decisione del team:** **A) Modale minima a 5 campi:** nazionalità, motivo permanenza, tempo in Italia, documenti già ottenuti, familiari in Italia.

---

### ❓ Q7 — Gestione dello storico conversazione

Quanta conversazione passata inviare a Claude ad ogni richiesta?

**Opzioni proposte dall'AI:**
- **A)** Storico completo — massima coerenza, ma costo token elevato
- **B)** Nessuno storico — ogni messaggio è isolato
- **C)** Storico ridotto (ultimi 10 messaggi), priorità al profilo strutturato

➡️ **Raccomandazione AI:** C) — il profilo strutturato compensa la mancanza di storico lungo; 10 messaggi coprono il contesto recente senza sprecare token.

✅ **Decisione del team:** **C) Storico ridotto (max 10 messaggi), dando precedenza alla compilazione del profilo.**

---

### ❓ Q8 — Meccanismo di aggiornamento del profilo

Come aggiornare il profilo utente quando Claude apprende nuove informazioni dalla conversazione?

**Opzioni proposte dall'AI:**
- **A)** Aggiornamento limitato — solo dall'onboarding, non dalla chat
- **B)** Aggiornamento dalla chat — Claude segnala nuove info, le integra nel profilo
- **C)** Solo deduzione silenziosa — Claude usa le info ma non aggiorna il profilo

➡️ **Raccomandazione AI:** B) — permette al profilo di crescere organicamente senza chiedere all'utente di compilare moduli aggiuntivi.

✅ **Decisione del team:** **A) + B) — aggiornamento limitato ma con integrazione dal profilo.** Claude emette un blocco `<!--PROFILE_UPDATE:{...}-->` nella risposta; il sistema lo estrae, aggiorna localStorage e mostra una notifica visiva discreta.

---

## Round 2 — Dettagli implementativi (Q9–Q12)

---

### ❓ Q9 — Relazione tra wizard e chat

Quando il wizard è aperto, la chat deve restare visibile?

**Opzioni proposte dall'AI:**
- **A)** Il wizard sostituisce la chat durante il flow (utente non può chattare)
- **B)** Wizard affiancato: pannello sinistro 40%, chat destra sempre visibile
- **C)** Wizard come overlay/modal sopra la chat

➡️ **Raccomandazione AI:** B) — la chat affiancata permette all'utente di chiedere chiarimenti su ciò che il wizard sta mostrando senza perdere il contesto.

✅ **Decisione del team:** **B) — chat sempre visibile per permettere domande di dettaglio o segnalare impedimenti.** Su mobile: tab in fondo per passare tra wizard e chat.

---

### ❓ Q10 — Campi del profilo: familiari

Il profilo deve includere informazioni sui familiari presenti in Italia?

**Opzioni proposte dall'AI:**
- **A)** Solo info base (nazionalità, motivo, tempo in Italia, documenti)
- **B)** Aggiungere familiari in Italia, distinguendo tra a carico e non a carico

➡️ **Raccomandazione AI:** B) — il ricongiungimento familiare e le agevolazioni INPS/bonus dipendono spesso dal numero e tipo di familiari.

✅ **Decisione del team:** **Aggiungere familiari, sia a carico che non a carico** — toggle booleano + contatori separati per le due categorie.

---

### ❓ Q11 — Trigger del wizard

Come l'utente apre il wizard?

**Opzioni proposte dall'AI:**
- **A)** Solo bottone manuale nell'header
- **B)** Auto-detect da keyword in chat ("permesso di soggiorno", "residence permit", …) + bottone manuale
- **C)** Solo auto-detect, nessun bottone esplicito

➡️ **Raccomandazione AI:** B) — il bottone garantisce accessibilità; l'auto-detect abbassa la barriera per chi non sa che il wizard esiste.

✅ **Decisione del team:** **B) Auto-detect + bottone.** Se l'utente scrive parole chiave legate al permesso di soggiorno, la chat mostra un invito "Apri guida guidata →".

---

### ❓ Q12 — Feedback visivo sull'aggiornamento del profilo

Come notificare l'utente quando il profilo viene aggiornato automaticamente da Claude?

**Opzioni proposte dall'AI:**
- **A)** Silenzioso — nessuna notifica, il profilo si aggiorna in background
- **B)** Toast notification discreta in basso a destra, auto-dismiss dopo 4 secondi
- **C)** Modal di conferma — l'utente deve approvare ogni aggiornamento

➡️ **Raccomandazione AI:** B) — il toast è informativo senza essere intrusivo; il modal interromperebbe il flusso conversazionale.

✅ **Decisione del team:** **B) Toast discreta** con messaggio "✓ Profilo aggiornato: {documento}".

---

## Riepilogo decisioni

| # | Decisione | Proposta AI | Scelta team | Delta |
|---|---|---|---|---|
| Q1 | Interaction model | Chat + wizard (C) | Chat primary + wizard complementare (B→C) | Enfasi sulla chat come nucleo |
| Q2 | Golden path wizard | Permesso di soggiorno (A) | **A)** | Allineati |
| Q3 | Lingua | Auto-detect (B) | **Auto-detect, nessun selettore** | Allineati |
| Q4 | Persistenza | localStorage (C) | **localStorage** | Allineati |
| Q5 | Profondità wizard | Checklist dinamica (C) | **C)** | Allineati |
| Q6 | Onboarding | Modale 5 campi (A) | **A)** | Allineati |
| Q7 | Storico chat | Ridotto + profilo (C) | **C) max 10 msg** | Allineati |
| Q8 | Aggiornamento profilo | Da chat (B) | **A) + B) — limitato + chat** | Team ha aggiunto vincolo di limitazione |
| Q9 | Wizard + chat | Affiancato (B) | **B)** | Allineati |
| Q10 | Campi familiari | Aggiungere (B) | **B) + distinzione carico/non carico** | Team ha raffinato la distinzione |
| Q11 | Trigger wizard | Auto-detect + bottone (B) | **B)** | Allineati |
| Q12 | Feedback profilo | Toast (B) | **B)** | Allineati |

---

## Piano di implementazione risultante

Le decisioni del Round 1 e Round 2 hanno prodotto direttamente il piano di implementazione eseguito:

### File creati
| File | Motivazione |
|---|---|
| `app/lib/profile.ts` | Q4, Q8, Q10 — tipo UserProfile + helpers localStorage |
| `app/lib/wizard-data.ts` | Q2, Q5 — 5 step wizard + checklist documenti dinamica |
| `app/app/components/OnboardingModal.tsx` | Q6 — modale primo avvio, 5 campi |
| `app/app/components/WizardPanel.tsx` | Q1, Q9 — pannello affiancato, progress bar |
| `app/app/components/ProfileToast.tsx` | Q12 — toast auto-dismiss 4s |

### File modificati
| File | Motivazione |
|---|---|
| `app/app/api/chat/route.ts` | Q3, Q7, Q8 — system prompt multilngue, storico 10 msg, PROFILE_UPDATE regex |
| `app/app/components/Chat.tsx` | Q1, Q11 — accetta profilo prop, auto-detect keyword wizard |
| `app/app/page.tsx` | Q1, Q9 — layout due pannelli, stato globale profilo/wizard/toast |

---

## Note di processo

- La sessione di grilling ha richiesto **2 round** per esaurire il frontier decisionale
- In 3 casi su 12 (Q1, Q8, Q10) il team ha **raffinato o esteso** la raccomandazione AI invece di accettarla passivamente
- Nessuna decisione è stata implementata prima che il team avesse confermato esplicitamente la scelta
- Il piano è stato convertito in un file di implementazione strutturato (`memory/plans/`) prima di avviare il coding
