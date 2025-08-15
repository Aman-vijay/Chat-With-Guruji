import { notFound } from "next/navigation";
import { getInstructorWithPersona } from "@/data/combined";
import ChatClient from "./Client";

interface ChatPageProps {
  params: { id: string };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const resolvedParams = await params;
  const instructor = getInstructorWithPersona(resolvedParams.id);
  if (!instructor) return notFound();
  return <ChatClient instructorId={instructor.id} />;
}