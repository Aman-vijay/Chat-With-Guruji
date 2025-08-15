import OpenAI from "openai";
import { getInstructorWithPersona } from "@/data/combined";
import { personas } from "@/data/personas";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function normalize(id: string) {
  if (id === "hitesh-sir") return "hitesh_choudhary";
  if (id === "piyush-sir") return "piyush_garg";
  return id;
}

export async function streamChatResponse(instructorOrPersonaId: string, messages: any[]) {
  const instructor = getInstructorWithPersona(instructorOrPersonaId);
  const persona = personas.find(p => p.id === normalize(instructorOrPersonaId));
  if (!instructor || !persona) throw new Error("Instructor or Persona not found");

  const trainingPairs = persona.training_examples.slice(0,6).flatMap(ex => ([
    { role: "user", content: ex.user_input },
    { role: "assistant", content: ex.expected_response },
  ]));
  const socialPairs = persona.social_media_context_examples.slice(0,2).flatMap(ex => ([
    { role: "user", content: ex.user_input },
    { role: "assistant", content: ex.expected_response },
  ]));

  const composed = [
    { role: "system", content: instructor.systemPrompt },
    ...trainingPairs,
    ...socialPairs,
    ...messages,
  ];

  const stream = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: composed as any,
    stream: true,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
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
