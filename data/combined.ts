
import type { Instructor, Persona } from "@/types/chat";
import { getInstructor } from "./instructors";
import { personas } from "./personas";

export function getInstructorWithPersona(id: string): (Instructor & Persona & { systemPrompt: string }) | null {
  const instructor = getInstructor(id);
  const persona = personas.find((p) => p.id === id);

  if (!instructor || !persona) return null;

  return {
    ...instructor,
    ...persona,
    systemPrompt: persona.system_instruction || "",
  };
}
