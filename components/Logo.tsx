
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 50 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red Pulse Beat Path */}
        <path 
          d="M5 25H12L15 15L22 35L29 10L32 25H40" 
          stroke="#ef4444" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-[pulse_2s_infinite]"
        />
        {/* Blue Plus Sign Circle Backdrop */}
        <circle cx="40" cy="15" r="7" fill="white" className="shadow-sm" />
        {/* Blue Plus Sign */}
        <path 
          d="M40 10V20M35 15H45" 
          stroke="#2f80ed" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
