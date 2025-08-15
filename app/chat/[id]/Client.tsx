// "use client";

// import { instructors } from "@/data/instructors";
// import { useChat } from "@/hooks/useChat";
// import ChatUi from "@/components/chat/ChatUi";

// export default function ChatClient({ instructorId }: { instructorId: string }) {
//   const instructor = instructors.find((i) => i.id === instructorId)!;
//   const { messages, input, setInput, loading, sendMessage, onKeyDown, bottomRef } =
//     useChat(instructorId);

//   return (
//     <div className="flex flex-col h-screen w-full bg-[#0b141a] text-white">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] border-b border-[#2f3b43]">
//         <img
//           src={instructor.image}
//           alt={instructor.name}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-semibold text-[#e9edef]">{instructor.name}</p>
//           <p className="text-xs text-[#8696a0]">Online</p>
//         </div>
//       </div>

//       {/* Messages */}
//       <MessageList
//         messages={messages.map((m) => ({
//           id: m.id,
//           role: m.role as "user" | "bot",
//           content: m.content,
//         }))}
//       />
//       <div ref={bottomRef} />

//       {/* Input */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendMessage();
//         }}
//         className="flex items-center gap-2 px-4 py-3 bg-[#202c33] border-t border-[#2f3b43]"
//       >
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={onKeyDown}
//           placeholder={`Message ${instructor.name}...`}
//           className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-full px-4 py-2 text-sm outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading || !input.trim()}
//           className="bg-[#00a884] hover:bg-[#029e7e] transition-colors px-4 py-2 rounded-full text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { getInstructorWithPersona } from "@/data/combined";
import ChatUi from "@/components/chat/ChatUi";

export default function ChatClient({ instructorId }: { instructorId: string }) {
  const instructor = getInstructorWithPersona(instructorId)!;
  return <ChatUi persona={instructor} />;
}
