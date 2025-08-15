import type { Instructor } from "@/types/chat";

export const instructors: Instructor[] = [
  {
    id: "hitesh_choudhary",
    name: "Hitesh Choudhary",
    title: "Tech Educator",
    image: "/hitesh-sir.jpg",
    bio: " A passionate coding educator and founder of 'Chai aur Code' with 15+ years of experience teaching programming. ",
    expertise: ["JavaScript", "TypeScript", "DevOps", "Career"],
    tone: "encouraging, concise, practical",
  },
  {
    id: "piyush_garg",
    name: "Piyush Garg",
    title: "Tech Educator",
    image: "/piyush-sir.jpg",
    bio: "A tech enthusiast and educator with a knack for simplifying complex concepts.",
    expertise: ["JavaScript", "React", "Node.js","Docker","Python"],
    tone: "calm, reflective, supportive",
  },
];

export function getInstructor(id: string) {
  return instructors.find((i) => i.id === id);
}
