import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { seedChats, suggestions } from "../data/seedData.js";
import { createAiResponse } from "../services/aiProvider.js";
import { exportChatAsMarkdown } from "../utils/exportChat.js";

const ChatContext = createContext(null);

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createMessage(role, content, extra = {}) {
  return {
    id: createId(role),
    role,
    content,
    createdAt: new Date().toISOString(),
    ...extra
  };
}

function createChat(title = "Untitled chat") {
  return {
    id: createId("chat"),
    title,
    messages: [],
    updatedAt: new Date().toISOString()
  };
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(seedChats);
  const [activeChatId, setActiveChatId] = useState(seedChats[0]?.id);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? chats[0];

  const showToast = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const updateActiveChat = useCallback((updater) => {
    setChats((currentChats) =>
      currentChats.map((chat) => (chat.id === activeChatId ? updater(chat) : chat))
    );
  }, [activeChatId]);

  const streamAssistantMessage = useCallback((fullText) => {
    const assistantId = createId("assistant");
    updateActiveChat((chat) => ({
      ...chat,
      messages: [...chat.messages, createMessage("assistant", "", { id: assistantId, isStreaming: true })],
      updatedAt: new Date().toISOString()
    }));

    let index = 0;
    const interval = window.setInterval(() => {
      index += Math.max(2, Math.floor(fullText.length / 34));
      const nextText = fullText.slice(0, index);

      updateActiveChat((chat) => ({
        ...chat,
        messages: chat.messages.map((message) =>
          message.id === assistantId
            ? { ...message, content: nextText, isStreaming: index < fullText.length }
            : message
        ),
        updatedAt: new Date().toISOString()
      }));

      if (index >= fullText.length) {
        window.clearInterval(interval);
        setIsTyping(false);
      }
    }, 42);
  }, [updateActiveChat]);

  const createStreamingAssistant = useCallback(() => {
    const assistantId = createId("assistant");

    updateActiveChat((chat) => ({
      ...chat,
      messages: [...chat.messages, createMessage("assistant", "", { id: assistantId, isStreaming: true })],
      updatedAt: new Date().toISOString()
    }));

    return {
      append(fullText) {
        updateActiveChat((chat) => ({
          ...chat,
          messages: chat.messages.map((message) =>
            message.id === assistantId ? { ...message, content: fullText, isStreaming: true } : message
          ),
          updatedAt: new Date().toISOString()
        }));
      },
      finish(fullText) {
        updateActiveChat((chat) => ({
          ...chat,
          messages: chat.messages.map((message) =>
            message.id === assistantId ? { ...message, content: fullText, isStreaming: false } : message
          ),
          updatedAt: new Date().toISOString()
        }));
      }
    };
  }, [updateActiveChat]);

  const sendMessage = useCallback(async (content) => {
    const trimmed = content.trim();

    if (!trimmed || isTyping) {
      return;
    }

    setError(null);
    updateActiveChat((chat) => ({
      ...chat,
      title: chat.messages.length === 0 ? trimmed.slice(0, 42) : chat.title,
      messages: [...chat.messages, createMessage("user", trimmed)],
      updatedAt: new Date().toISOString()
    }));

    setIsTyping(true);

    try {
      let assistantStream = null;
      let streamedText = "";
      const response = await createAiResponse(trimmed, false, (token, fullText) => {
        if (!assistantStream) {
          assistantStream = createStreamingAssistant();
        }

        streamedText = fullText || `${streamedText}${token}`;
        assistantStream.append(streamedText);
      });

      if (assistantStream) {
        assistantStream.finish(response || streamedText);
        setIsTyping(false);
      } else {
        streamAssistantMessage(response);
      }
    } catch (err) {
      setIsTyping(false);
      setError(err.message || "The assistant could not answer. Please try again.");
      showToast("Something went wrong", "error");
    }
  }, [createStreamingAssistant, isTyping, showToast, streamAssistantMessage, updateActiveChat]);

  const startNewChat = useCallback(() => {
    const newChat = createChat("New conversation");
    setChats((currentChats) => [newChat, ...currentChats]);
    setActiveChatId(newChat.id);
    showToast("New chat created");
  }, [showToast]);

  const clearActiveChat = useCallback(() => {
    updateActiveChat((chat) => ({ ...chat, messages: [], title: "New conversation" }));
    showToast("Chat cleared");
  }, [showToast, updateActiveChat]);

  const deleteChat = useCallback((chatId) => {
    setChats((currentChats) => {
      const nextChats = currentChats.filter((chat) => chat.id !== chatId);
      if (chatId === activeChatId) {
        setActiveChatId(nextChats[0]?.id);
      }
      return nextChats.length ? nextChats : [createChat("New conversation")];
    });
    showToast("Chat deleted");
  }, [activeChatId, showToast]);

  const copyMessage = useCallback(async (content) => {
    await navigator.clipboard.writeText(content);
    showToast("Copied to clipboard");
  }, [showToast]);

  const exportActiveChat = useCallback(() => {
    if (!activeChat) {
      return;
    }

    exportChatAsMarkdown(activeChat);
    showToast("Chat exported");
  }, [activeChat, showToast]);

  const regenerateLastResponse = useCallback(async () => {
    const lastUserMessage = [...(activeChat?.messages ?? [])].reverse().find((message) => message.role === "user");

    if (!lastUserMessage || isTyping) {
      showToast("No user message to regenerate", "error");
      return;
    }

    updateActiveChat((chat) => ({
      ...chat,
      messages: chat.messages.filter((message, index, messages) => {
        const isLastAssistant = message.role === "assistant" && index === messages.length - 1;
        return !isLastAssistant;
      })
    }));

    setIsTyping(true);

    try {
      let assistantStream = null;
      let streamedText = "";
      const response = await createAiResponse(lastUserMessage.content, true, (token, fullText) => {
        if (!assistantStream) {
          assistantStream = createStreamingAssistant();
        }

        streamedText = fullText || `${streamedText}${token}`;
        assistantStream.append(streamedText);
      });

      if (assistantStream) {
        assistantStream.finish(response || streamedText);
        setIsTyping(false);
      } else {
        streamAssistantMessage(response);
      }
    } catch (err) {
      setIsTyping(false);
      setError(err.message || "The assistant could not regenerate. Please try again.");
      showToast("Something went wrong", "error");
    }
  }, [activeChat, createStreamingAssistant, isTyping, showToast, streamAssistantMessage, updateActiveChat]);

  const value = useMemo(() => ({
    activeChat,
    activeChatId,
    chats,
    clearActiveChat,
    copyMessage,
    deleteChat,
    error,
    exportActiveChat,
    isLoading,
    isTyping,
    regenerateLastResponse,
    sendMessage,
    setActiveChatId,
    showToast,
    startNewChat,
    suggestions,
    toast
  }), [
    activeChat,
    activeChatId,
    chats,
    clearActiveChat,
    copyMessage,
    deleteChat,
    error,
    exportActiveChat,
    isLoading,
    isTyping,
    regenerateLastResponse,
    sendMessage,
    showToast,
    startNewChat,
    toast
  ]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }

  return context;
}
