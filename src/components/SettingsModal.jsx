import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Database, KeyRound, ShieldCheck, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useChat } from "../context/ChatContext.jsx";
import { getAiSettings, saveAiSettings } from "../services/aiProvider.js";

export default function SettingsModal({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useChat();
  const [settings, setSettings] = useState(getAiSettings);

  useEffect(() => {
    if (isOpen) {
      setSettings(getAiSettings());
    }
  }, [isOpen]);

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function handleSave() {
    saveAiSettings(settings);
    showToast(`AI provider set to ${settings.provider}`);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" type="button" onClick={onClose} aria-label="Close settings" />
          <motion.section
            className="glass-panel relative w-full max-w-lg rounded-2xl p-5"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 id="settings-title" className="text-lg font-bold">Settings</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Provider-ready preferences for HelperAI.</p>
              </div>
              <button className="icon-button" type="button" onClick={onClose} aria-label="Close settings">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                <p className="font-semibold text-cyan-700 dark:text-cyan-200">AI provider</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${settings.provider === "ollama" ? "bg-cyan-500 text-white" : "bg-white/70 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}
                    type="button"
                    onClick={() => updateSetting("provider", "ollama")}
                  >
                    Ollama
                  </button>
                  <button
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${settings.provider === "mock" ? "bg-cyan-500 text-white" : "bg-white/70 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}
                    type="button"
                    onClick={() => updateSetting("provider", "mock")}
                  >
                    Mock
                  </button>
                </div>
                <label className="mt-3 block text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Ollama model</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200/70 bg-white/80 px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
                    value={settings.ollamaModel}
                    onChange={(event) => updateSetting("ollamaModel", event.target.value)}
                    placeholder="llama3.2"
                  />
                </label>
                <label className="mt-3 block text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Ollama URL</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200/70 bg-white/80 px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
                    value={settings.ollamaBaseUrl}
                    onChange={(event) => updateSetting("ollamaBaseUrl", event.target.value)}
                    placeholder="http://localhost:11434"
                  />
                </label>
                <button className="gradient-button mt-3 w-full" type="button" onClick={handleSave}>
                  Save AI settings
                </button>
              </div>
              <SettingRow icon={ShieldCheck} title="Theme" text={`Currently using ${theme} mode`}>
                <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950" type="button" onClick={toggleTheme}>
                  Toggle
                </button>
              </SettingRow>
              <SettingRow icon={KeyRound} title="API keys" text="Ollama runs locally. OpenAI, Hugging Face, and LangChain adapters can be added next." />
              <SettingRow icon={Database} title="Memory" text="Local-only mock state today, provider memory later." />
              <SettingRow icon={Bell} title="Notifications" text="Badges and toast feedback are enabled." />
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SettingRow({ icon: Icon, title, text, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-500">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
      </div>
      {children}
    </div>
  );
}
