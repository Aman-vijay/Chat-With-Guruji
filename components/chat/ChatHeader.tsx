import React, { useState, useEffect } from "react";

export function ChatHeader({ image, name }: { image: string; name: string; }) {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState("Active now");


  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsOnline(prev => !prev);
        if (!isOnline) {
          setLastSeen("Active now");
        } else {
          setLastSeen("Last seen just now");
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <header className="relative border-b border-zinc-800/50 px-6 py-4 bg-gradient-to-r from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 backdrop-blur-xl">
  
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 opacity-30 animate-pulse"></div>
      
      <div className="relative flex items-center gap-4">
       
        <div className="relative">
          <div className="size-14 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600/50 shadow-xl ring-2 ring-green-500/20 transition-all duration-300 hover:ring-green-500/40 hover:scale-105">
            <img 
              src={image} 
              alt={name} 
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" 
            />
          </div>
          
         
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full border-2 border-zinc-900 transition-colors duration-500 ${
              isOnline 
                ? "bg-green-500 shadow-lg shadow-green-500/50" 
                : "bg-zinc-500"
            }`}>
              {isOnline && (
                <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"></div>
              )}
            </div>
          </div>
        </div>

        {/* Name and status info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              {name}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="transition-colors duration-300 hover:text-zinc-300">
              {lastSeen}
            </span>
            
          </div>
        </div>

       
      </div>
    </header>
  );
}