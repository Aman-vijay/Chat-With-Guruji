import React, { useState, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping = false, bottomRef }) => {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);


  useEffect(() => {
    if (messages.length > visibleMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(messages.map(m => m.id));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, visibleMessages.length]);

  const formatTime = (timestamp?: Date) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col gap-1 p-6 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      {/* Welcome message for empty state */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-200 mb-2">Start a conversation</h3>
            <p className="text-zinc-500 text-sm">Ask me anything, and I'll help you learn and grow!</p>
          </div>
        </div>
      )}

      {messages.map((msg, index) => {
        const roleForUI = msg.role === "assistant" ? "bot" : msg.role;
        const isVisible = visibleMessages.includes(msg.id);
        const isLastMessage = index === messages.length - 1;

        return (
          <div
            key={msg.id}
            className={`flex gap-3 group transition-all duration-500 ${
              roleForUI === "user" ? "justify-end" : "justify-start"
            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
          
            {roleForUI === "bot" && (
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}

            <div className={`flex flex-col ${roleForUI === "user" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[70%]`}>
            
              <div
                className={`rounded-2xl px-4 py-3 shadow-lg transition-all duration-300 group-hover:shadow-xl relative ${
                  roleForUI === "user"
                    ? "bg-gradient-to-br from-green-600 to-green-700 text-white rounded-br-md border border-green-500/30"
                    : "bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 text-zinc-100 rounded-bl-md border border-zinc-700/50 backdrop-blur-sm"
                } ${isLastMessage ? "animate-pulse-once" : ""}`}
              >
               
                <div className="relative z-10">
                  {roleForUI === "user" ? (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          code: ({ children, className }) => 
                            className ? (
                              <code className="bg-zinc-950/50 text-green-400 px-2 py-1 rounded text-xs border border-zinc-700/50">
                                {children}
                              </code>
                            ) : (
                              <code className="bg-zinc-950/30 text-green-400 px-1 rounded text-xs">
                                {children}
                              </code>
                            ),
                          pre: ({ children }) => (
                            <pre className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-700/50 overflow-x-auto my-2">
                              {children}
                            </pre>
                          ),
                          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="text-zinc-300 italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
                          li: ({ children }) => <li className="text-zinc-200">{children}</li>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {roleForUI === "user" && (
                  <div className="absolute -bottom-1 -right-1 flex items-center">
                    <div className="bg-green-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

            
              
            </div>

            {/* User avatar */}
            {roleForUI === "user" && (
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex gap-3 justify-start animate-fade-in">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-pulse">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-zinc-700/50 backdrop-blur-sm">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
};

export default MessageList;

