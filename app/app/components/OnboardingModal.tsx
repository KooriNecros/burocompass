"use client";

import { useState, useEffect } from "react";
import { UserProfile, saveProfile } from "@/lib/profile";
import {
  detectLang, isKnownNationality, isValidInput, TRANSLATIONS,
} from "@/lib/onboarding-translations";

const NATIONALITY_TRANSLATIONS = [
  { question: "Da dove vieni?",           label: "Nazionalità" },
  { question: "Where are you from?",      label: "Nationality" },
  { question: "من أين أنت؟",             label: "الجنسية" },
  { question: "你来自哪里？",              label: "国籍" },
  { question: "D'où venez-vous ?",        label: "Nationalité" },
  { question: "¿De dónde eres?",          label: "Nacionalidad" },
  { question: "Звідки ви?",              label: "Національність" },
  { question: "De unde ești?",            label: "Naționalitate" },
  { question: "Откуда вы?",              label: "Гражданство" },
  { question: "আপনি কোথায় থেকে?",     label: "জাতীয়তা" },
  { question: "Saan ka nanggaling?",      label: "Nasyonalidad" },
  { question: "Skąd jesteś?",             label: "Narodowość" },
  { question: "از کجا می آیید؟",         label: "ملیت" },
];

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const DOCUMENT_OPTIONS: { value: UserProfile["documentsObtained"][number]; key: keyof typeof TRANSLATIONS["en"]["docs"] }[] = [
  { value: "codice_fiscale",      key: "codice_fiscale" },
  { value: "permesso_soggiorno",  key: "permesso_soggiorno" },
  { value: "residenza",           key: "residenza" },
  { value: "spid",                key: "spid" },
  { value: "tessera_sanitaria",   key: "tessera_sanitaria" },
];

export default function OnboardingModal({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [nationality, setNationality] = useState("");
  const [reason, setReason] = useState<UserProfile["reasonForStay"] | "">("");
  const [timeInItaly, setTimeInItaly] = useState<UserProfile["timeInItaly"] | "">("");
  const [docs, setDocs] = useState<UserProfile["documentsObtained"]>([]);
  const [hasFamily, setHasFamily] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [nonDependents, setNonDependents] = useState(0);

  // Step-1 cycling animation
  const [langIndex, setLangIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (step !== 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLangIndex(i => (i + 1) % NATIONALITY_TRANSLATIONS.length);
        setFade(true);
      }, 250);
    }, 1200);
    return () => clearInterval(interval);
  }, [step]);

  const cyclingLang = NATIONALITY_TRANSLATIONS[langIndex];

  // Detected language from nationality input
  const detectedLang = detectLang(nationality);
  const known = isKnownNationality(nationality);
  const valid = isValidInput(nationality);
  const t = TRANSLATIONS[detectedLang];

  const REASONS = [
    { value: "work"   as const, label: t.reasons.work },
    { value: "study"  as const, label: t.reasons.study },
    { value: "family" as const, label: t.reasons.family },
    { value: "other"  as const, label: t.reasons.other },
  ];

  const TIME_OPTIONS = [
    { value: "just_arrived"  as const, label: t.times.just_arrived },
    { value: "less_1_year"   as const, label: t.times.less_1_year },
    { value: "more_1_year"   as const, label: t.times.more_1_year },
  ];

  function toggleDoc(val: UserProfile["documentsObtained"][number]) {
    setDocs(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
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
    step === 1 ? valid :
    step === 2 ? reason !== "" :
    step === 3 ? timeInItaly !== "" :
    true;

  // Step 1 titles use cycling animation; steps 2+ use detected language
  const stepTitles: Record<number, string> = {
    2: t.step2Title,
    3: t.step3Title,
    4: t.step4Title,
    5: t.step5Title,
  };

  return (
    <div className="fixed inset-0 bg-blue-700 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🧭</div>
          <h1 className="text-xl font-bold text-blue-700">BuroCompass</h1>
          <p className="text-gray-500 text-sm mt-1 min-h-[1.25rem]">
            {step === 1 ? (
              <span className={`transition-opacity duration-[250ms] ${fade ? "opacity-100" : "opacity-0"}`}>
                {cyclingLang.question}
              </span>
            ) : stepTitles[step]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(s => (
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

          {/* Step 1 — Nationality */}
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className={`transition-opacity duration-[250ms] ${fade ? "opacity-100" : "opacity-0"}`}>
                  {cyclingLang.label}
                </span>
              </label>
              <input
                type="text"
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                placeholder="es. marocchino, ucraino, cinese..."
                className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  nationality.length > 0 && !valid
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                autoFocus
              />
              {/* Language detection feedback */}
              <div className="mt-2 min-h-[1.2rem] text-xs">
                {nationality.length > 0 && !valid && (
                  <span className="text-red-500">
                    Inserisci una nazionalità valida (min. 3 lettere)
                  </span>
                )}
                {valid && known && (
                  <span className="text-green-600 font-medium">
                    🌍 {t.langName}
                  </span>
                )}
                {valid && !known && (
                  <span className="text-amber-600">
                    🌍 {t.unknownNationality}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Step 2 — Reason */}
          {step === 2 && (
            <div className="space-y-2">
              {REASONS.map(r => (
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

          {/* Step 3 — Time in Italy */}
          {step === 3 && (
            <div className="space-y-2">
              {TIME_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    timeInItaly === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="time"
                    value={opt.value}
                    checked={timeInItaly === opt.value}
                    onChange={() => setTimeInItaly(opt.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Step 4 — Documents */}
          {step === 4 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 mb-3">{t.step4Subtitle}</p>
              {DOCUMENT_OPTIONS.map(d => (
                <label
                  key={d.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    docs.includes(d.value)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={docs.includes(d.value)}
                    onChange={() => toggleDoc(d.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{t.docs[d.key]}</span>
                </label>
              ))}
            </div>
          )}

          {/* Step 5 — Family */}
          {step === 5 && (
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFamily}
                  onChange={e => setHasFamily(e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-sm">{t.hasFamily}</span>
              </label>
              {hasFamily && (
                <div className="space-y-3 pl-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      {t.dependents}
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setDependents(Math.max(0, dependents - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-lg">−</button>
                      <span className="w-8 text-center font-medium">{dependents}</span>
                      <button onClick={() => setDependents(dependents + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-lg">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      {t.nonDependents}
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
              {t.back}
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {t.next}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {t.start}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
