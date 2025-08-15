
export interface Persona {
  id: string;
  system_instruction?: string;
  training_examples?: {
    user_input: string;
    expected_response: string;
    context: string;
  }[];
  social_media_context_examples?: {
    user_input: string;
    expected_response: string;
    context: string;
  }[];
}

export interface Instructor {
  id: string;
  name: string;
  title?: string;
  image: string;
  expertise?: string[];
  bio: string;
  tone: string;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}
