export interface UserProfile {
  nationality: string;
  reasonForStay: "work" | "study" | "family" | "other";
  timeInItaly: "just_arrived" | "less_1_year" | "more_1_year";
  documentsObtained: Array<
    "codice_fiscale" | "permesso_soggiorno" | "residenza" | "spid" | "tessera_sanitaria"
  >;
  familyInItaly: {
    hasFamily: boolean;
    dependents: number;
    nonDependents: number;
  };
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PROFILE_KEY = "burocompass_profile";
export const HISTORY_KEY = "burocompass_history";

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function updateProfileFields(fields: Partial<UserProfile>): void {
  const current = loadProfile();
  if (!current) return;
  const updated = { ...current, ...fields };
  if (fields.documentsObtained && current.documentsObtained) {
    updated.documentsObtained = Array.from(
      new Set([...current.documentsObtained, ...fields.documentsObtained])
    ) as UserProfile["documentsObtained"];
  }
  saveProfile(updated);
}

export function loadHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(messages: Message[]): void {
  if (typeof window === "undefined") return;
  const trimmed = messages.slice(-10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function formatProfileForPrompt(profile: UserProfile): string {
  const docsLabel: Record<string, string> = {
    codice_fiscale: "codice fiscale",
    permesso_soggiorno: "permesso di soggiorno",
    residenza: "residenza anagrafica",
    spid: "SPID",
    tessera_sanitaria: "tessera sanitaria",
  };
  const reasonLabel: Record<string, string> = {
    work: "lavoro",
    study: "studio",
    family: "ricongiungimento familiare",
    other: "altro",
  };
  const timeLabel: Record<string, string> = {
    just_arrived: "appena arrivato/a",
    less_1_year: "meno di 1 anno",
    more_1_year: "più di 1 anno",
  };

  const docs =
    profile.documentsObtained.length > 0
      ? profile.documentsObtained.map((d) => docsLabel[d]).join(", ")
      : "nessuno";

  const family = profile.familyInItaly.hasFamily
    ? `sì (${profile.familyInItaly.dependents} a carico, ${profile.familyInItaly.nonDependents} non a carico)`
    : "no";

  return `PROFILO UTENTE (personalizza le risposte in base a questi dati):
- Nazionalità: ${profile.nationality}
- Motivo permanenza: ${reasonLabel[profile.reasonForStay]}
- In Italia da: ${timeLabel[profile.timeInItaly]}
- Documenti già ottenuti: ${docs}
- Familiari in Italia: ${family}`;
}
