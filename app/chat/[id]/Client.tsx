"use client";

import { useRouter, useParams } from "next/navigation";
import { getInstructorWithPersona } from "@/data/combined";
import { instructors } from "@/data/instructors";
import ChatUi from "@/components/chat/ChatUi";
import Sidebar from "@/components/chat/Sidebar";
import { useState, useEffect } from "react";

export default function ChatClient({ instructorId }: { instructorId: string }) {
  const router = useRouter();
  const params = useParams();
  const selectedId = (params?.id as string) || instructorId;
  const instructor = getInstructorWithPersona(selectedId)!;
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for smooth transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedId]);

  const handleSelect = (id: string) => {
    if (id !== selectedId) {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar instructors={instructors} selectedId={selectedId} onSelect={handleSelect} />
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-zinc-700 border-t-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-blue-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-zinc-400 text-sm font-medium animate-pulse">
                Loading conversation...
              </div>
            </div>
          </div>
        )}
        
        {/* Chat UI */}
        <div className={`h-full transition-all duration-300 ${isLoading ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          <ChatUi key={selectedId} instructor={instructor} />
        </div>
      </div>
    </div>
  );
}