# BuroCompass — Struttura Agentica

## Architettura

BuroCompass utilizza un'architettura agentica a singolo agente specializzato, ottimizzata per utenti con bassa alfabetizzazione digitale.

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
│  System Prompt:                                             │
│  • Ruolo: assistente burocrazia italiana                    │
│  • Contesto: profilo utente personalizzato                  │
│  • Istruzioni lingua: risponde nella lingua dell'utente     │
│  • Istruzioni update: emette <!--PROFILE_UPDATE:{...}-->    │
│                                                             │
│  Competenze:                                                │
│  • Permesso di soggiorno      • Codice fiscale              │
│  • Residenza anagrafica       • SPID                        │
│  • Tessera sanitaria          • Lavoro e contratti          │
│  • Ricongiungimento familiare • Cittadinanza                │
└──────────┬──────────────────────────────┬───────────────────┘
           │ risposta testuale            │ PROFILE_UPDATE block
           ▼                             ▼
┌──────────────────────┐    ┌────────────────────────────────┐
│   RISPOSTA UTENTE    │    │      PROFILE UPDATER           │
│   (testo pulito)     │    │  • parsing JSON dal blocco     │
│                      │    │  • merge con profilo esistente │
│                      │    │  • salvataggio localStorage    │
│                      │    │  • notifica toast visiva       │
└──────────────────────┘    └────────────────────────────────┘
```

## Agente Principale: BuroCompassAgent

| Proprietà | Valore |
|---|---|
| Modello | `claude-sonnet-4-5` |
| Input | `messages: MessageParam[]` + `userProfile?: UserProfile` |
| Output | `{ message: string, profileUpdate?: Partial<UserProfile> }` |
| Lingua | Auto-detect (italiano, inglese, arabo, francese, cinese, spagnolo, ...) |
| Memoria | Profilo strutturato in localStorage + storico conversazione (10 msg) |

## Profilo Utente

Il profilo utente è il contesto persistente che l'agente usa per personalizzare le risposte:

```typescript
interface UserProfile {
  nationality: string;
  reasonForStay: 'work' | 'study' | 'family' | 'other';
  timeInItaly: 'just_arrived' | 'less_1_year' | 'more_1_year';
  documentsObtained: ('codice_fiscale' | 'permesso_soggiorno' | 'residenza' | 'spid' | 'tessera_sanitaria')[];
  familyInItaly: { hasFamily: boolean; dependents: number; nonDependents: number };
}
```

## Meccanismo di Aggiornamento Profilo

L'agente può aggiornare autonomamente il profilo utente durante la conversazione:

1. L'utente menziona un documento ottenuto ("ho già il codice fiscale")
2. L'agente include nella risposta: `<!--PROFILE_UPDATE:{"documentsObtained":["codice_fiscale"]}-->`
3. Il route handler parsa il blocco, lo rimuove dal testo, aggiorna localStorage
4. L'UI mostra una notifica toast discreta

## Wizard Guidato (Sub-flow)

Il wizard per il permesso di soggiorno è un flow strutturato complementare alla chat:

```
Step 1: Benvenuto + conferma nazionalità
Step 2: Motivo del soggiorno (lavoro / studio / famiglia / altro)
Step 3: Situazione attuale (contratto lavoro, alloggio)
Step 4: Checklist documenti personalizzata (spuntabile)
Step 5: Prossimi passi (Questura, kit postale, tempi)
```

La checklist al passo 4 è generata dinamicamente in base alle risposte degli step precedenti.
