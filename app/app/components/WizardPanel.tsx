"use client";

import { useState } from "react";
import { UserProfile } from "@/lib/profile";
import {
  WIZARD_STEPS,
  WizardAnswers,
  getDocumentChecklist,
  NEXT_STEPS_TEXT,
} from "@/lib/wizard-data";

interface Props {
  profile: UserProfile | null;
  onClose: () => void;
}

const REASONS = [
  { value: "work", label: "Lavoro" },
  { value: "study", label: "Studio" },
  { value: "family", label: "Ricongiungimento familiare" },
  { value: "other", label: "Altro motivo" },
] as const;

export default function WizardPanel({ profile, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({
    nationality: profile?.nationality,
    reasonForStay: profile?.reasonForStay,
  });
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const totalSteps = WIZARD_STEPS.length;
  const step = WIZARD_STEPS[currentStep - 1];

  function updateAnswer<K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDoc(id: string) {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const canProceed =
    currentStep === 1 ? true :
    currentStep === 2 ? !!answers.reasonForStay :
    currentStep === 3 ? true :
    true;

  const checklist = getDocumentChecklist(answers);

  return (
    <div className="flex flex-col h-full bg-blue-50 border-r border-blue-100">
      {/* Header */}
      <div className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-80 uppercase tracking-wide">Wizard guidato</p>
          <h2 className="font-semibold text-sm">Permesso di soggiorno — prima richiesta</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-lg leading-none"
          aria-label="Chiudi wizard"
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between text-xs text-blue-600 mb-1">
          <span>{step.title}</span>
          <span>{currentStep} / {totalSteps}</span>
        </div>
        <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {currentStep === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              Questa guida ti aiuterà a capire esattamente <strong>quali documenti ti servono</strong> e <strong>come procedere</strong> per ottenere il tuo primo permesso di soggiorno in Italia.
            </p>
            <p className="text-sm text-gray-700">
              Ci vogliono circa <strong>2 minuti</strong> per completare la guida.
            </p>
            {profile?.nationality && (
              <div className="bg-white rounded-xl p-3 border border-blue-200">
                <p className="text-xs text-blue-600 font-medium mb-1">Profilo rilevato</p>
                <p className="text-sm text-gray-700">Nazionalità: <strong>{profile.nationality}</strong></p>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-3">Per quale motivo ti trovi in Italia?</p>
            {REASONS.map((r) => (
              <label
                key={r.value}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors bg-white ${
                  answers.reasonForStay === r.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name="wizard-reason"
                  checked={answers.reasonForStay === r.value}
                  onChange={() => updateAnswer("reasonForStay", r.value)}
                  className="accent-blue-600"
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-2">Rispondi a queste domande per personalizzare la tua checklist:</p>
            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={!!answers.hasWorkContract}
                onChange={(e) => updateAnswer("hasWorkContract", e.target.checked)}
                className="accent-blue-600 mt-0.5"
              />
              <div>
                <p className="text-sm font-medium">Ho un contratto di lavoro o lettera di assunzione</p>
                <p className="text-xs text-gray-500">o una lettera di invito / certificato di iscrizione</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={!!answers.hasHousing}
                onChange={(e) => updateAnswer("hasHousing", e.target.checked)}
                className="accent-blue-600 mt-0.5"
              />
              <div>
                <p className="text-sm font-medium">Ho un contratto d&apos;affitto o alloggio</p>
                <p className="text-xs text-gray-500">o una dichiarazione di ospitalità da un familiare/amico</p>
              </div>
            </label>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-2">Spunta i documenti man mano che li prepari:</p>
            {checklist.map((doc) => (
              <label
                key={doc.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors bg-white ${
                  checkedDocs.has(doc.id) ? "border-green-400 bg-green-50" : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.has(doc.id)}
                  onChange={() => toggleDoc(doc.id)}
                  className="accent-green-600 mt-0.5"
                />
                <div>
                  <p className={`text-sm ${checkedDocs.has(doc.id) ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {doc.label}
                  </p>
                  {doc.note && (
                    <p className="text-xs text-blue-600 mt-0.5">💡 {doc.note}</p>
                  )}
                </div>
              </label>
            ))}
            <p className="text-xs text-gray-500 mt-2">
              {checkedDocs.size}/{checklist.length} documenti pronti
            </p>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-3 text-sm text-gray-700">
            {NEXT_STEPS_TEXT.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={i} className="font-semibold text-blue-700 mt-2">{line.replace(/\*\*/g, "")}</p>;
              }
              if (line.match(/^\d+\./)) {
                return <p key={i} className="pl-2">{line}</p>;
              }
              if (line.startsWith("- ")) {
                return <p key={i} className="pl-4 text-blue-700">{line.slice(2)}</p>;
              }
              return line ? <p key={i}>{line}</p> : null;
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 py-3 border-t border-blue-100 flex gap-2">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex-1 border border-blue-300 text-blue-700 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ← Indietro
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Avanti →
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Chiudi guida ✓
          </button>
        )}
      </div>
    </div>
  );
}
