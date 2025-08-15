import Image from "next/image";
import Link from "next/link";
import { instructors } from "@/data/instructors";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Chat With your favourite Teacher</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
           Select an instructor to explore topics in their style
            </p>
        </header>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((inst) => (
            <Link
              key={inst.id}
              href={`/chat/${inst.id}`}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/60 transition p-5 flex flex-col"
            >
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-zinc-800">
                <Image
                  src={inst.image}
                  alt={inst.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition duration-300"
                />
              </div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {inst.name}
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                  {inst.title}
                </span>
              </h2>
              <p className="text-sm text-zinc-400 mt-2 line-clamp-3">{inst.bio}</p>
              <span className="mt-auto pt-4 inline-flex items-center text-xs text-zinc-400 group-hover:text-zinc-200 transition">
                Start conversation →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
