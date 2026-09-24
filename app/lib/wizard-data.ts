export interface WizardAnswers {
  nationality?: string;
  reasonForStay?: "work" | "study" | "family" | "other";
  hasWorkContract?: boolean;
  hasHousing?: boolean;
  hasDependents?: boolean;
}

export interface DocumentItem {
  id: string;
  label: string;
  note?: string;
  required: boolean;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  type: "info" | "choice" | "checklist" | "summary";
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: "Benvenuto",
    description: "Guida alla prima richiesta del permesso di soggiorno",
    type: "info",
  },
  {
    id: 2,
    title: "Tipo di soggiorno",
    description: "Per quale motivo sei venuto/a in Italia?",
    type: "choice",
  },
  {
    id: 3,
    title: "La tua situazione",
    description: "Aiutaci a capire meglio la tua situazione",
    type: "choice",
  },
  {
    id: 4,
    title: "Documenti necessari",
    description: "Ecco la tua checklist personalizzata",
    type: "checklist",
  },
  {
    id: 5,
    title: "Prossimi passi",
    description: "Dove andare e cosa fare",
    type: "summary",
  },
];

export function getDocumentChecklist(answers: WizardAnswers): DocumentItem[] {
  const docs: DocumentItem[] = [
    {
      id: "passport",
      label: "Passaporto valido (originale + fotocopia di tutte le pagine)",
      required: true,
    },
    {
      id: "photos",
      label: "4 foto tessera recenti (sfondo bianco)",
      required: true,
    },
    {
      id: "marca_bollo",
      label: "Marca da bollo da €16,00",
      note: "Si compra in tabaccheria",
      required: true,
    },
    {
      id: "kit_postale",
      label: "Modulo kit postale compilato",
      note: "Si ritira gratuitamente in ufficio postale (Poste Italiane)",
      required: true,
    },
    {
      id: "contributo",
      label: "Contributo permesso di soggiorno (€30–€50 a seconda della durata)",
      note: "Si paga all'ufficio postale con bollettino incluso nel kit",
      required: true,
    },
  ];

  const reason = answers.reasonForStay;

  if (reason === "work") {
    docs.push({
      id: "contratto",
      label: "Contratto di lavoro o lettera di assunzione (originale + fotocopia)",
      required: true,
    });
    docs.push({
      id: "codice_fiscale",
      label: "Codice fiscale",
      note: "Si ottiene gratuitamente all'Agenzia delle Entrate",
      required: true,
    });
  }

  if (reason === "study") {
    docs.push({
      id: "iscrizione",
      label: "Certificato di iscrizione all'università/scuola",
      required: true,
    });
    docs.push({
      id: "mezzi_economici",
      label: "Dimostrazione mezzi di sostentamento (estratto conto o dichiarazione sponsor)",
      required: true,
    });
  }

  if (reason === "family") {
    docs.push({
      id: "nulla_osta",
      label: "Nulla osta all'ingresso per ricongiungimento familiare",
      note: "Si ottiene dalla Prefettura",
      required: true,
    });
    docs.push({
      id: "atto_matrimonio",
      label: "Atto di matrimonio o certificato di parentela (tradotto e legalizzato)",
      required: true,
    });
  }

  if (answers.hasHousing) {
    docs.push({
      id: "alloggio",
      label: "Contratto d'affitto o dichiarazione di ospitalità",
      note: "Serve per dimostrare di avere un alloggio",
      required: true,
    });
  }

  return docs;
}

export const NEXT_STEPS_TEXT = `**Come procedere:**

1. **Ritira il kit postale** — vai in un qualsiasi ufficio Poste Italiane e chiedi il "kit permesso di soggiorno". È gratuito.

2. **Compila il modulo** — segui le istruzioni nel kit. Puoi chiedere aiuto a un patronato (ACLI, INAS, INCA) gratuitamente.

3. **Torna alle Poste con tutti i documenti** — pagherai il contributo (€30-50) e consegnerai la busta. Ti daranno una ricevuta con la data dell'appuntamento in Questura.

4. **Vai in Questura** — porta la ricevuta, i documenti originali e le fotocopie. Ti prenderanno le impronte digitali e la foto.

5. **Attendi** — i tempi medi sono 2-6 mesi. Puoi seguire lo stato della pratica sul sito della Questura.

**Patronati che ti possono aiutare gratuitamente:**
- ACLI — acli.it
- INAS-CISL — inas.it
- INCA-CGIL — inca.it

**Numero verde immigrazione:** 800 309 309 (gratuito)`;
