import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert } from "lucide-react";

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          className="fixed right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-xl dark:border-white/10 dark:bg-slate-900 dark:text-white"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          role="status"
        >
          {toast.type === "error" ? <CircleAlert className="text-red-500" size={18} /> : <CheckCircle2 className="text-emerald-500" size={18} />}
          {toast.message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
