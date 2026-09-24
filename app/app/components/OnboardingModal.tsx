"use client";

import { useState } from "react";
import { UserProfile, saveProfile } from "@/lib/profile";

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const REASONS = [
  { value: "work", label: "Lavoro / Work" },
  { value: "study", label: "Studio / Study" },
  { value: "family", label: "Ricongiungimento familiare / Family reunification" },
  { value: "other", label: "Altro / Other" },
] as const;

const TIME_OPTIONS = [
  { value: "just_arrived", label: "Appena arrivato/a · Just arrived" },
  { value: "less_1_year", label: "Meno di 1 anno · Less than 1 year" },
  { value: "more_1_year", label: "Più di 1 anno · More than 1 year" },
] as const;

const DOCUMENT_OPTIONS = [
  { value: "codice_fiscale", label: "Codice fiscale" },
  { value: "permesso_soggiorno", label: "Permesso di soggiorno" },
  { value: "residenza", label: "Residenza anagrafica" },
  { value: "spid", label: "SPID" },
  { value: "tessera_sanitaria", label: "Tessera sanitaria" },
] as const;

export default function OnboardingModal({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [nationality, setNationality] = useState("");
  const [reason, setReason] = useState<UserProfile["reasonForStay"] | "">("");
  const [timeInItaly, setTimeInItaly] = useState<UserProfile["timeInItaly"] | "">("");
  const [docs, setDocs] = useState<UserProfile["documentsObtained"]>([]);
  const [hasFamily, setHasFamily] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [nonDependents, setNonDependents] = useState(0);

  function toggleDoc(val: UserProfile["documentsObtained"][number]) {
    setDocs((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val]
    );
  }

  function handleSubmit() {
    if (!nationality || !reason || !timeInItaly) return;
    const profile: UserProfile = {
      nationality,
      reasonForStay: reason as UserProfile["reasonForStay"],
      timeInItaly: timeInItaly as UserProfile["timeInItaly"],
      documentsObtained: docs,
      familyInItaly: { hasFamily, dependents, nonDependents },
    };
    saveProfile(profile);
    onComplete(profile);
  }

  const canProceed =
    step === 1 ? nationality.trim().length > 0 :
    step === 2 ? reason !== "" :
    step === 3 ? timeInItaly !== "" :
    true;

  return (
    <div className="fixed inset-0 bg-blue-700 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🧭</div>
          <h1 className="text-xl font-bold text-blue-700">BuroCompass</h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === 1 && "Da dove vieni? · Where are you from?"}
            {step === 2 && "Perché sei in Italia? · Why are you in Italy?"}
            {step === 3 && "Da quanto sei in Italia? · How long have you been in Italy?"}
            {step === 4 && "Hai già questi documenti? · Do you already have these documents?"}
            {step === 5 && "Hai familiari in Italia? · Do you have family in Italy?"}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                s === step ? "bg-blue-600" : s < step ? "bg-blue-300" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[180px]">
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazionalità / Nationality
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="es. marocchino, ucraino, cinese..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              {REASONS.map((r) => (
                <label
                  key={r.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    reason === r.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    checked={reason === r.value}
                    onChange={() => setReason(r.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{r.label}</span>
                </label>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              {TIME_OPTIONS.map((t) => (
                <label
                  key={t.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    timeInItaly === t.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="time"
                    value={t.value}
                    checked={timeInItaly === t.value}
                    onChange={() => setTimeInItaly(t.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{t.label}</span>
                </label>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 mb-3">Seleziona tutti quelli che hai già</p>
              {DOCUMENT_OPTIONS.map((d) => (
                <label
                  key={d.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    docs.includes(d.value as UserProfile["documentsObtained"][number])
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={docs.includes(d.value as UserProfile["documentsObtained"][number])}
                    onChange={() => toggleDoc(d.value as UserProfile["documentsObtained"][number])}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{d.label}</span>
                </label>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFamily}
                  onChange={(e) => setHasFamily(e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-sm">Ho familiari in Italia · I have family in Italy</span>
              </label>
              {hasFamily && (
                <div className="space-y-3 pl-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Familiari a carico (figli, coniuge non lavorante...)
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setDependents(Math.max(0, dependents - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-lg">−</button>
                      <span className="w-8 text-center font-medium">{dependents}</span>
                      <button onClick={() => setDependents(dependents + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-lg">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Familiari non a carico (genitori, fratelli lavoranti...)
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setNonDependents(Math.max(0, nonDependents - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-lg">−</button>
                      <span className="w-8 text-center font-medium">{nonDependents}</span>
                      <button onClick={() => setNonDependents(nonDependents + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-lg">+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              ← Indietro
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Avanti →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Inizia ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
