import React, { useState, useEffect } from "react";
import type { Instructor } from "@/types/chat";

interface SidebarProps {
  instructors: Instructor[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ instructors, selectedId, onSelect }: SidebarProps) {
  const [expanded, setExpanded] = useState(() => {
    // Initialize from localStorage if available, otherwise default to true
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-expanded');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Persist expanded state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-expanded', JSON.stringify(expanded));
    }
  }, [expanded]);

  return (
    <aside className={`h-full flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ease-in-out ${expanded ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-3">
        <button
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          onClick={() => setExpanded((e: boolean) => !e)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="px-4 pb-2">
        <h2 className={`text-zinc-400 text-xs font-medium uppercase tracking-wider transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"}`}>
          {expanded ? "Instructors" : ""}
        </h2>
      </div>

      {/* Instructor List */}
      <div className="flex-1 px-3 pb-4 space-y-2 ">
        {instructors.map((inst) => (
          <button
            key={inst.id}
            onClick={() => onSelect(inst.id)}
            className={`group relative flex items-center w-full rounded-lg border transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-green-500 ${
              expanded ? "px-3 py-3 gap-3" : "px-2 py-3 justify-center"
            } ${
              selectedId === inst.id 
                ? "bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white shadow-lg shadow-green-600/20" 
                : "bg-zinc-800/60 border-zinc-700/50 text-zinc-200 hover:bg-zinc-700/80 hover:border-zinc-600"
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img 
                src={inst.image} 
                alt={inst.name} 
                className={`rounded-full border-2 transition-all duration-200 ${
                  selectedId === inst.id 
                    ? "border-green-300/50 shadow-md" 
                    : "border-zinc-600/50 group-hover:border-zinc-500"
                } ${expanded ? "w-10 h-10" : "w-8 h-8"}`}
              />
              {selectedId === inst.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-zinc-900"></div>
              )}
            </div>

            {/* Text Content - Only show when expanded */}
            {expanded && (
              <div className="flex-1 min-w-0 text-left">
                <div className="font-semibold text-sm leading-tight truncate">
                  {inst.name}
                </div>
                <div className="text-xs text-zinc-400 leading-tight truncate mt-0.5">
                  {inst.title}
                </div>
              </div>
            )}

            {/* Tooltip for collapsed state */}
            {!expanded && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-lg border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                <div className="font-semibold">{inst.name}</div>
                <div className="text-xs text-zinc-400">{inst.title}</div>
                {/* Tooltip arrow */}
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-zinc-800 border-l border-b border-zinc-700 rotate-45"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}