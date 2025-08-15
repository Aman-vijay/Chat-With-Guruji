
import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 bg-[#2A2F32] rounded-2xl px-3 py-2 w-fit">
      <span className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
      </span>
    </div>
  );
}
