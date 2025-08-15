import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
   
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
      </div>
      
   
      <span className="text-zinc-400 text-xs font-medium animate-pulse">
         thinking...
      </span>
    </div>
  );
};

export default TypingIndicator;