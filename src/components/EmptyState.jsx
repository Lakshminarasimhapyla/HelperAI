import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Code2, FileText, Sparkles } from "lucide-react";

const cards = [
  { icon: BrainCircuit, title: "Reason", text: "Explore ideas, tradeoffs, and plans." },
  { icon: Code2, title: "Code", text: "Draft components, debug, and review." },
  { icon: FileText, title: "Write", text: "Summarize, rewrite, and polish." }
];

export default function EmptyState({ suggestions, onSelectSuggestion }) {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-4xl flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-300">
          <Sparkles size={15} />
          Premium AI workspace
        </div>
        <h2 className="max-w-3xl text-4xl font-extrabold tracking-normal text-slate-950 dark:text-white sm:text-5xl">
          How can HelperAI help today?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Start with a prompt, pick a suggestion, or use the chat controls to export, regenerate, and manage conversations.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="glass-panel rounded-xl p-4">
            <card.icon className="mb-3 text-cyan-500" size={22} />
            <h3 className="font-semibold">{card.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="group flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/70 p-4 text-left text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-200 dark:hover:bg-white/10"
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            <span>{suggestion}</span>
            <ArrowUpRight className="text-slate-400 transition group-hover:text-cyan-500" size={17} />
          </button>
        ))}
      </div>
    </div>
  );
}
