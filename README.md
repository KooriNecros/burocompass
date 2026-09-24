# BuroCompass — Assistente digitale per stranieri in Italia

Progetto sviluppato per hackathon.

## Team
- Francesco Giovo
- Manuel Marseglia

---

## Scope del progetto

Costruire un **assistente digitale accessibile** per persone straniere con **bassa alfabetizzazione digitale** che si trovano ad affrontare le pratiche burocratiche e amministrative italiane.

L'obiettivo è abbattere le barriere linguistiche, cognitive e procedurali che rendono difficile l'accesso ai servizi della pubblica amministrazione, guidando l'utente passo dopo passo in modo semplice, chiaro e multilingue.

---

## Problematiche degli stranieri con la PA italiana

Le difficoltà non riguardano solo le singole pratiche burocratiche, ma il sistema nel suo insieme. Esistono due livelli di barriera: **barriere strutturali** (come funziona il sistema) e **barriere procedurali** (le singole pratiche da completare).

---

### Barriere strutturali

#### 1. Barriera linguistica e lessico amministrativo
Il linguaggio burocratico italiano è distante dall'italiano quotidiano. Termini come *autocertificazione*, *domicilio*, *residenza*, *marca da bollo*, *dichiarazione sostitutiva*, *PEC*, *protocollo* sono opachi anche per italofoni. Per alcune procedure (es. permesso UE per soggiornanti di lungo periodo) è richiesta una conoscenza certificata dell'italiano (livello A2).

#### 2. Non sapere a quale ufficio rivolgersi
Il problema non è solo "fare la pratica", ma capire quale amministrazione sia competente:

| Ente | Competenza principale |
|---|---|
| Comune | Anagrafe, residenza, stato civile, servizi locali |
| Questura | Permesso di soggiorno, rinnovi |
| Prefettura | Cittadinanza, alcune procedure immigrazione |
| Agenzia delle Entrate | Codice fiscale, questioni fiscali |
| INPS | Previdenza, prestazioni sociali |
| ASL | Sanità, iscrizione SSN |
| Centro per l'impiego | Lavoro, NASpI |

#### 3. Frammentazione delle informazioni
Le informazioni sono distribuite tra Comuni, Ministeri, Questure, Prefetture, portali online e siti delle singole amministrazioni. La persona deve saper cercare e interpretare autonomamente fonti diverse — una competenza che non può essere data per scontata.

#### 4. Il circolo vizioso del digitale
La PA italiana è sempre più digitale, ma per uno straniero neo-arrivato esiste un problema circolare:
- per ottenere **SPID** servono documento italiano + codice fiscale/tessera sanitaria + email + cellulare
- per ottenere alcuni documenti italiani bisogna aver completato altre procedure
- alcune procedure richiedono a loro volta strumenti digitali

Senza supporto, uscire da questo circolo è molto difficile.

#### 5. Difficoltà a capire tempi e stato della pratica
Non è chiaro: quando presentare una domanda, quanto tempo richiede, se è stata accettata, se manca un documento, se bisogna aspettare una convocazione, dove controllare lo stato. Questo è critico nelle procedure di immigrazione, dove più pratiche possono essere aperte contemporaneamente presso enti diversi.

#### 6. Differenze culturali nel rapporto con la PA
Chi arriva da un altro Paese ha aspettative diverse su: come si prende un appuntamento, come ci si relaziona con un funzionario, quanto tempo richiedono le pratiche, quando è possibile contestare o correggere un errore. È un problema di *alfabetizzazione amministrativa*, non necessariamente di istruzione.

#### 7. Dipendenza da intermediari
Quando la persona non riesce ad autonomarsi si rivolge a patronati, CAF, associazioni, mediatori culturali o conoscenti italiani. Questi soggetti sono utili ma creano dipendenza: la persona ottiene il risultato senza comprendere il sistema, restando vulnerabile alla prossima pratica.

---

### Barriere procedurali (le pratiche principali)

#### Identità e soggiorno
- **Permesso di soggiorno** — iter complesso (questura, kit postale, mesi di attesa), rinnovi periodici con rischio scadenza
- **Codice fiscale** — indispensabile per quasi tutto (conto, affitto, sanità, lavoro), ma non sempre noto come ottenerlo
- **Iscrizione anagrafica (residenza)** — prerequisito per molti altri servizi; richiede contratto d'affitto regolare, spesso negato agli stranieri
- **SPID / CIE** — identità digitale per i portali PA, difficile da attivare senza supporto (vedi circolo vizioso sopra)

#### Documentazione
- Molte procedure richiedono documenti prodotti all'estero: **traduzione giurata**, **legalizzazione** o **apostille**
- Rischio di presentarsi allo sportello con documentazione incompleta e dover ricominciare da capo
- Non sempre è noto che alcuni documenti italiani possono essere sostituiti da **autocertificazioni**

#### Sanità
- **Iscrizione al SSN e tessera sanitaria** — molti non sanno di averne diritto o come iscriversi all'ASL
- **Scelta del medico di base** — processo poco chiaro, barriere linguistiche con il personale

#### Lavoro e previdenza
- **Contratto di lavoro e busta paga** — comprensione dei documenti, differenze rispetto ai paesi d'origine
- **INPS** — NASpI, maternità, assegno unico: diritti spesso sconosciuti
- **Dichiarazione dei redditi (730/CU)** — obblighi fiscali poco chiari, rischio sanzioni

#### Famiglia e istruzione
- **Ricongiungimento familiare** — procedura lunga, documentazione estesa (visto, nulla osta, ISEE)
- **Iscrizione scolastica dei figli** — documenti stranieri da tradurre e legalizzare
- **Riconoscimento titoli di studio esteri** — processo lento e costoso, spesso non noto

#### Vita quotidiana
- **Apertura conto bancario** — alcune banche rifiutano con documenti stranieri o permesso non ancora valido
- **Contratto di affitto** — discriminazioni, clausole incomprensibili, garanzie eccessive richieste
- **Patente di guida** — conversione da patente estera, accordi bilaterali variabili per paese

---

## Utente target

- Stranieri neo-arrivati in Italia (prima generazione)
- Bassa o media alfabetizzazione digitale
- Scarsa o nulla conoscenza della lingua italiana (o conoscenza di base)
- Accesso prevalente da smartphone

---

## Struttura del progetto

```
├── app/            # Applicazione Next.js (chatbot + wizard + profilo utente)
├── agents/         # Architettura agentica e documentazione del sistema AI
├── presentation/   # Presentazione HTML del progetto
└── README.md
```

## Getting started

```bash
cd app
npm install
cp .env.example .env.local   # aggiungi ANTHROPIC_API_KEY
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.
