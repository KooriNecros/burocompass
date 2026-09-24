# BuroCompass — Assistente digitale per stranieri in Italia

Progetto sviluppato per hackathon.

## Team
- Francesco Giovo
- [Collega da aggiungere]

---

## Scope del progetto

Costruire un **assistente digitale accessibile** per persone straniere con **bassa alfabetizzazione digitale** che si trovano ad affrontare le pratiche burocratiche e amministrative italiane.

L'obiettivo è abbattere le barriere linguistiche, cognitive e procedurali che rendono difficile l'accesso ai servizi della pubblica amministrazione, guidando l'utente passo dopo passo in modo semplice, chiaro e multilingue.

---

## Problematiche burocratiche degli stranieri in Italia

### Identità e soggiorno
- **Permesso di soggiorno** — iter complesso (questura, kit postale, attesa mesi), documenti numerosi, rinnovi periodici con rischio scadenza
- **Codice fiscale** — necessario per quasi tutto (conto bancario, affitto, sanità, lavoro), ma non sempre chiaro come ottenerlo
- **Iscrizione anagrafica (residenza)** — registrarsi al Comune è prerequisito per molti altri servizi, ma richiede contratto d'affitto regolare (spesso negato a stranieri)
- **SPID / CIE** — identità digitale richiesta per accedere ai portali PA, ma difficile da attivare senza supporto

### Sanità
- **Iscrizione al SSN e tessera sanitaria** — molti non sanno di averne diritto o come iscriversi all'ASL
- **Scelta del medico di base** — processo poco chiaro, barriere linguistiche con il personale sanitario

### Lavoro e previdenza
- **Contratto di lavoro e busta paga** — comprensione dei documenti, differenze rispetto ai paesi d'origine
- **INPS — contributi e prestazioni** — disoccupazione (NASpI), maternità, assegno unico: diritti spesso sconosciuti
- **Dichiarazione dei redditi (730/CU)** — obblighi fiscali poco chiari, rischio sanzioni per ignoranza

### Famiglia e istruzione
- **Ricongiungimento familiare** — procedura lunga e documentazione estesa (visto, nulla osta, ISEE)
- **Iscrizione scolastica dei figli** — iter burocratico, documenti stranieri da tradurre/legalizzare
- **Riconoscimento titoli di studio esteri** — processo lento e costoso, spesso non noto

### Vita quotidiana
- **Apertura conto bancario** — alcune banche rifiutano senza permesso di soggiorno valido o con documenti stranieri
- **Contratto di affitto** — discriminazioni, richiesta di garanzie eccessive, incomprensione delle clausole
- **Patente di guida** — conversione da patente estera, esame, differenze per paese d'origine (accordi bilaterali)
- **Mediazione con enti pubblici** — INAIL, Comune, Prefettura: linguaggio tecnico e procedure opache

---

## Utente target

- Stranieri neo-arrivati in Italia (prima generazione)
- Bassa o media alfabetizzazione digitale
- Scarsa o nulla conoscenza della lingua italiana (o conoscenza di base)
- Accesso prevalente da smartphone

---

## Structure

```
├── backend/        # API / server-side logic
├── frontend/       # UI / client-side
├── docs/           # documentazione, diagrammi, note
└── .github/
    └── workflows/  # CI/CD (opzionale)
```

## Getting started

_Istruzioni di setup da aggiungere una volta definito lo stack._

1. Clone: `git clone <url>`
2. Vedi `backend/README.md` e `frontend/README.md` per il setup dei singoli moduli.
