"use client";

import { ChatHeader } from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import { useChat } from "@/hooks/useChat";
import type { Instructor } from "@/types/chat";
import { useState, useRef } from "react";

interface ChatUiProps {
  instructor: Instructor;
}

export default function ChatUi({ instructor }: ChatUiProps) {
  const instructorKey = instructor.id;
  const { messages, input, setInput, loading, sendMessage, onKeyDown, bottomRef } =
    useChat(instructorKey);
  
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        sendMessage();
      }
    }
    if (e.key === "Escape") {
      setInput("");
      inputRef.current?.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage();
    }
  };

  const quickReplies = [
    "👋 Hello!",
    "🤔 Can you explain this?",
    "💡 Give me an example",
    "🔍 Tell me more",
    "✅ Got it, thanks!",
  ];

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950 text-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-green-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/3 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <ChatHeader image={instructor.image} name={instructor.name} />

        <div className="flex-1 relative">
          <MessageList messages={messages} isTyping={loading} bottomRef={bottomRef} />
          
          {input.trim() === "" && messages.length > 0 && !loading && (
            <div className="absolute bottom-4 left-6 right-6 z-20">
              <div className="bg-zinc-900/80 backdrop-blur-xl rounded-xl border border-zinc-700/50 p-3 shadow-2xl animate-fade-in">
                <p className="text-xs text-zinc-400 mb-2 font-medium">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 bg-zinc-800/60 hover:bg-zinc-700/80 border border-zinc-600/30 hover:border-zinc-500/50 rounded-full text-xs text-zinc-300 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

     
        <div className="relative border-t border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl">
         
            <div className={`h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 ${
            loading ? "w-full animate-pulse" : "w-0"
          }`}></div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex items-end gap-3 max-w-4xl mx-auto">
           
              <div className="flex-1 relative">
                <div className={`relative rounded-2xl border transition-all duration-300 ${
                  isFocused 
                    ? "border-green-500/50 shadow-lg shadow-green-500/10" 
                    : "border-zinc-700/50"
                } ${loading ? "opacity-75" : ""}`}>
                  <textarea
                    ref={inputRef}
                    placeholder={`Ask ${instructor.name} anything...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={loading}
                    rows={1}
                    className="w-full bg-zinc-800/40 backdrop-blur-sm text-gray-200 px-6 py-4 rounded-2xl focus:outline-none resize-none placeholder:text-zinc-500 transition-all duration-200 min-h-[56px] max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
                    style={{ 
                      height: 'auto',
                      minHeight: '56px',
                    }}
                    onInput={(e) => {
                     
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                    }}
                  />
                  
                  {/* Character count for long messages */}
                  {input.length > 100 && (
                    <div className="absolute bottom-2 left-4 text-xs text-zinc-500">
                      {input.length}/500
                    </div>
                  )}
                </div>
              </div>

             

              {/* Send button */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`relative group p-5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                  loading || !input.trim()
                    ? "bg-zinc-800/40 border-zinc-700/50 text-zinc-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-green-500/50 text-white shadow-lg shadow-green-600/20 hover:shadow-green-500/30 hover:scale-105 focus:ring-green-500/50"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
                
                {/* Ripple effect */}
                {!loading && input.trim() && (
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity"></div>
                )}
              </button>
            </div>

          
          </form>
        </div>
      </div>
    </div>
  );
}