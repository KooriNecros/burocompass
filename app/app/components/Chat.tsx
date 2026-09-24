"use client";

import { useState, useRef, useEffect } from "react";
import { UserProfile, Message, loadHistory, saveHistory, updateProfileFields } from "@/lib/profile";

interface Props {
  profile: UserProfile | null;
  onWizardTrigger: () => void;
  onProfileUpdate: (label: string) => void;
  wizardOpen: boolean;
}

const QUICK_QUESTIONS = [
  "Come ottengo il permesso di soggiorno?",
  "Ho bisogno del codice fiscale",
  "Come mi iscrivo al medico?",
  "Come faccio la residenza?",
];

const WIZARD_KEYWORDS = [
  "permesso di soggiorno", "permesso soggiorno", "residence permit",
  "permis de séjour", "إقامة", "居留许可",
];

const DOC_LABELS: Record<string, string> = {
  codice_fiscale: "codice fiscale",
  permesso_soggiorno: "permesso di soggiorno",
  residenza: "residenza",
  spid: "SPID",
  tessera_sanitaria: "tessera sanitaria",
};

export default function Chat({ profile, onWizardTrigger, onProfileUpdate, wizardOpen }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWizardSuggestion, setShowWizardSuggestion] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  function detectWizardTrigger(text: string): boolean {
    const lower = text.toLowerCase();
    return WIZARD_KEYWORDS.some((kw) => lower.includes(kw));
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    setShowWizardSuggestion(false);

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const triggersWizard = detectWizardTrigger(text);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, userProfile: profile }),
      });

      const data = await res.json();

      if (res.status === 429) {
        throw new Error(data.error || "Il servizio è momentaneamente sovraccarico. Riprova tra qualche secondo.");
      }
      if (!res.ok) {
        throw new Error(data.error || "Errore sconosciuto");
      }

      const assistantMessage: Message = { role: "assistant", content: data.message };
      setMessages([...updatedMessages, assistantMessage]);

      if (data.profileUpdate) {
        updateProfileFields(data.profileUpdate);
        const labels = (data.profileUpdate.documentsObtained as string[] | undefined)
          ?.map((d: string) => DOC_LABELS[d] ?? d)
          .join(", ");
        if (labels) onProfileUpdate(labels);
      }

      if (triggersWizard && !wizardOpen) {
        setShowWizardSuggestion(true);
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: `Si è verificato un errore: ${err instanceof Error ? err.message : "Riprova più tardi."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full px-4 py-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8 space-y-6">
            <p className="text-base">Come posso aiutarti oggi?</p>
            <div className="grid grid-cols-1 gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm px-4 py-3 rounded-xl text-left transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-100 text-black rounded-br-sm"
                  : "bg-gray-50 text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-bl-sm">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {showWizardSuggestion && !wizardOpen && (
          <div className="flex justify-start">
            <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%]">
              <p className="text-sm text-blue-800 mb-2">
                Vuoi che ti guidi passo dopo passo nella procedura?
              </p>
              <button
                onClick={() => { setShowWizardSuggestion(false); onWizardTrigger(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Apri guida guidata →
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Scrivi la tua domanda... / Write your question..."
          rows={1}
          className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 overflow-y-auto"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-3 rounded-xl transition-colors text-sm font-medium"
        >
          Invia
        </button>
      </div>
    </div>
  );
}
