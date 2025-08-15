import React from "react";
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
  return (
    <div className="flex flex-col gap-2 p-4 bg-[#121b22] h-full overflow-y-auto">
      {messages.map((msg) => {
        const roleForUI = msg.role === "assistant" ? "bot" : msg.role;

        return (
          <div
            key={msg.id}
            className={`flex ${roleForUI === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow-md 
                ${roleForUI === "user"
                  ? "bg-[#005c4b] text-white rounded-br-none"
                  : "bg-[#202c33] text-[#e9edef] rounded-bl-none"}`}
            >
             <ReactMarkdown remarkPlugins={[remarkGfm]} >
  {msg.content}
</ReactMarkdown>

            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg px-3 py-2 text-sm shadow-md bg-[#202c33] text-[#e9edef] rounded-bl-none">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
