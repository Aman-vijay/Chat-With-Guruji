export interface Persona {
  id: string;
  name: string;
    image: string;
  description: string;
  temperature: number;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}
