"use client";

import { useState, useCallback } from "react";
import { UserProfile, loadProfile, PROFILE_KEY, HISTORY_KEY } from "@/lib/profile";
import Chat from "./components/Chat";
import OnboardingModal from "./components/OnboardingModal";
import WizardPanel from "./components/WizardPanel";
import ProfileToast from "./components/ProfileToast";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile());
  const [wizardOpen, setWizardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOnboardingComplete = useCallback((p: UserProfile) => {
    setProfile(p);
  }, []);

  const handleProfileUpdate = useCallback((label: string) => {
    setProfile(loadProfile());
    setToastMessage(label);
  }, []);

  const handleDismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Global header */}
      <header className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧭</span>
          <div>
            <h1 className="font-bold text-sm leading-tight">BuroCompass</h1>
            <p className="text-xs text-blue-200 hidden sm:block">
              Assistente per la burocrazia italiana
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {profile && (
            <span className="text-xs text-blue-200 hidden sm:block">
              {profile.nationality}
            </span>
          )}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={() => {
                localStorage.removeItem(PROFILE_KEY);
                localStorage.removeItem(HISTORY_KEY);
                window.location.reload();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-mono transition-colors"
              title="Reset profilo (solo in sviluppo)"
            >
              ⟳ reset
            </button>
          )}
          <button
            onClick={() => setWizardOpen(true)}
            className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            📋 Permesso di soggiorno
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Wizard panel (left, ~40% on desktop) */}
        {wizardOpen && (
          <div className="w-full sm:w-2/5 shrink-0 border-r border-gray-200 overflow-hidden">
            <WizardPanel
              profile={profile}
              onClose={() => setWizardOpen(false)}
            />
          </div>
        )}

        {/* Chat (right, always visible unless wizard full-screen on mobile) */}
        <div className={`flex-1 flex flex-col overflow-hidden ${wizardOpen ? "hidden sm:flex" : "flex"}`}>
          <Chat
            profile={profile}
            onWizardTrigger={() => setWizardOpen(true)}
            onProfileUpdate={handleProfileUpdate}
            wizardOpen={wizardOpen}
          />
        </div>
      </div>

      {/* Mobile: tabs when wizard is open */}
      {wizardOpen && (
        <div className="sm:hidden flex border-t border-gray-200 shrink-0">
          <button
            onClick={() => setWizardOpen(true)}
            className="flex-1 py-3 text-xs font-semibold text-blue-700 border-b-2 border-blue-700"
          >
            📋 Guida
          </button>
          <button
            onClick={() => setWizardOpen(false)}
            className="flex-1 py-3 text-xs font-semibold text-gray-500"
          >
            💬 Chat
          </button>
        </div>
      )}

      {/* Onboarding modal */}
      {!profile && <OnboardingModal onComplete={handleOnboardingComplete} />}

      {/* Profile update toast */}
      {toastMessage && (
        <ProfileToast message={toastMessage} onDismiss={handleDismissToast} />
      )}
    </div>
  );
}
