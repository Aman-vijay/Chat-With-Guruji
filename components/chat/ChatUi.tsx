"use client";

import { ChatHeader } from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import { useChat } from "@/hooks/useChat";
import type { Instructor } from "@/types/chat";

interface ChatUiProps {
  instructor: Instructor;

}

export default function ChatUi({ instructor }: ChatUiProps) {
  const instructorKey = instructor .id;
  const { messages, input, setInput, loading, sendMessage, onKeyDown, bottomRef } =
    useChat(instructorKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-gray-100">
      <ChatHeader image={instructor.image} name={instructor.name} />

      <MessageList messages={messages} isTyping={loading} bottomRef={bottomRef} />

      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4 flex gap-2">
        <input
          type="text"
          placeholder={`Message ${instructor.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-[#1a1a1a] text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
