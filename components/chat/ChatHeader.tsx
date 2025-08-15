import React from "react";

export function ChatHeader({ image, name }: { image: string; name: string; }) {
  return (
    <header className="border-b border-zinc-800 px-6 py-4 flex items-center gap-4 bg-zinc-900/50 backdrop-blur">
      <div className="relative size-12 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
      <div>
        <h1 className="text-lg font-semibold">{name}</h1>
        {/* <p className="text-xs text-zinc-400">{title}</p> */}
      </div>
    </header>
  );
}
