import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export function useChat(personaId: string) {
  // Load chat history from sessionStorage on mount
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`chat_history_${personaId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {}
      }
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Save chat history to sessionStorage whenever messages change
  // Sync chat history to sessionStorage and across tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`chat_history_${personaId}`, JSON.stringify(messages));
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, personaId]);

  // Listen for sessionStorage changes in other tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.storageArea === sessionStorage && e.key === `chat_history_${personaId}`) {
        if (e.newValue) {
          try {
            setMessages(JSON.parse(e.newValue));
          } catch {}
        } else {
          setMessages([]);
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [personaId]);

  // Clear chat history for this instructor
  function clearHistory() {
    setMessages([]);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`chat_history_${personaId}`);
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    // Use full chat history (including new message) for context
    const chatHistory = [...messages, userMessage];

    setMessages(chatHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId,
          messages: chatHistory.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantMessage = {
          ...assistantMessage,
          content: assistantMessage.content + chunk,
        };
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessage.id ? assistantMessage : msg))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        sendMessage();
      }
    }
   
  }

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
    clearHistory,
    bottomRef,
  };
}
