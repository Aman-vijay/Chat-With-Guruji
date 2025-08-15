import OpenAI from "openai";
import { getInstructorWithPersona } from "@/data/combined";
import { personas } from "@/data/personas";
import type { ChatMessage } from "@/types/chat";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function streamChatResponse(
  instructorOrPersonaId: string,
  messages: Pick<ChatMessage, "role" | "content">[]
) {
  const instructor = getInstructorWithPersona(instructorOrPersonaId);
  const persona = personas.find((p) => p.id === instructorOrPersonaId);
  if (!instructor || !persona) throw new Error("Instructor or Persona not found");

  const trainingPairs: Pick<ChatMessage, "role" | "content">[] =
    (persona.training_examples || [])
      .slice(0, 6)
      .flatMap((ex) => [
        { role: "user" as const, content: ex.user_input },
        { role: "assistant" as const, content: ex.expected_response },
      ]);

  const socialPairs: Pick<ChatMessage, "role" | "content">[] =
    (persona.social_media_context_examples || [])
      .slice(0, 2)
      .flatMap((ex) => [
        { role: "user" as const, content: ex.user_input },
        { role: "assistant" as const, content: ex.expected_response },
      ]);

  const composed: Pick<ChatMessage, "role" | "content">[] = [
    { role: "system", content: instructor.systemPrompt },
    ...trainingPairs,
    ...socialPairs,
    ...messages,
  ];

  const stream = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: composed,
    stream: true,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
