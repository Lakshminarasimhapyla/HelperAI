import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import ChatMessage from "./components/ChatMessage.jsx";
import ChatInput from "./components/ChatInput.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import EmptyState from "./components/EmptyState.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";
import MobileBottomNav from "./components/MobileBottomNav.jsx";
import Toast from "./components/Toast.jsx";
import LoadingSkeleton from "./components/LoadingSkeleton.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import { useChat } from "./context/ChatContext.jsx";
import { useAutoScroll } from "./hooks/useAutoScroll.js";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { activeChat, error, isTyping, isLoading, startNewChat, toast, suggestions, sendMessage, regenerateLastResponse } = useChat();
  const scrollRef = useAutoScroll([activeChat?.messages, isTyping]);
  const messages = activeChat?.messages ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950 transition-colors duration-300 dark:bg-ink-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_75%_10%,rgba(168,85,247,0.18),transparent_26%),linear-gradient(120deg,rgba(59,130,246,0.10),transparent,rgba(20,184,166,0.08))] bg-[length:200%_200%] animate-gradient-shift" />

      <div className="relative flex h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
            onRegenerate={regenerateLastResponse}
          />

          <section ref={scrollRef} className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-36 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {isLoading ? <LoadingSkeleton /> : null}
              {error ? <ErrorBanner message={error} /> : null}

              {!isLoading && messages.length === 0 ? (
                <EmptyState suggestions={suggestions} onSelectSuggestion={sendMessage} />
              ) : (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{ opacity: 0, y: 14, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22 }}
                      >
                        <ChatMessage message={message} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping ? <TypingIndicator /> : null}
                </div>
              )}
            </div>
          </section>

          <ChatInput />
        </main>
      </div>

      <MobileBottomNav onNewChat={startNewChat} onOpenSettings={() => setSettingsOpen(true)} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Toast toast={toast} />
    </div>
  );
}
