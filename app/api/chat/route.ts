import { NextRequest } from "next/server";
import { streamChatResponse } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { personaId, messages } = await req.json();
    const readable = await streamChatResponse(personaId, messages);

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error(error);
    const status = error.message === "Instructor not found" ? 404 : 500;
    return new Response(error.message || "Error", { status });
  }
}
