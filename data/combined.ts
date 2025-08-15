import { getInstructor } from "./instructors";
import { personas } from "./personas";

function normalize(id: string) {
  // Map instructor style ids (hitesh-sir) to persona ids (hitesh_choudhary) as needed
  if (id === "hitesh-sir") return "hitesh_choudhary";
  if (id === "piyush-sir") return "piyush_garg";
  return id;
}

export function getInstructorWithPersona(id: string) {
  const instructor = getInstructor(id);
  const persona = personas.find((p) => p.id === normalize(id));

  if (!instructor || !persona) return null;

  return {
    ...instructor,
    ...persona,
    systemPrompt: persona.system_instruction, // unified key
  };
}
