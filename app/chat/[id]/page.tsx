import { notFound } from "next/navigation";
import { getInstructorWithPersona } from "@/data/combined";
import ChatClient from "./Client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const instructor = getInstructorWithPersona(id);
  if (!instructor) return notFound();
  return <ChatClient instructorId={instructor.id} />;
}
