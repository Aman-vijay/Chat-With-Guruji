
"use client";

import { getInstructorWithPersona } from "@/data/combined";
import ChatUi from "@/components/chat/ChatUi";

export default function ChatClient({ instructorId }: { instructorId: string }) {
  const instructor = getInstructorWithPersona(instructorId)!;
  return <ChatUi persona={instructor} />;
}
