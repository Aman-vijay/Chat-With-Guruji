
"use client";



import { useRouter, useParams } from "next/navigation";
import { getInstructorWithPersona } from "@/data/combined";
import { instructors } from "@/data/instructors";
import ChatUi from "@/components/chat/ChatUi";

import Sidebar from "@/components/chat/Sidebar";

export default function ChatClient({ instructorId }: { instructorId: string }) {
  const router = useRouter();
  const params = useParams();
  const selectedId = (params?.id as string) || instructorId;
  const instructor = getInstructorWithPersona(selectedId)!;

  const handleSelect = (id: string) => {
    if (id !== selectedId) {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <div className="flex h-screen">
  <Sidebar instructors={instructors} selectedId={selectedId} onSelect={handleSelect} />
      <div className="flex-1 flex flex-col">
        <ChatUi key={selectedId} instructor={instructor} />
      </div>
    </div>
  );
}
