import React from 'react';

interface GoldIconProps {
  icon: React.ReactNode;
  size?: number;
  className?: string;
}

export default function GoldIcon({ icon, size = 32, className = "" }: GoldIconProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width="0" height="0" className="absolute">
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F9D976" />
        </linearGradient>
      </svg>
      <div style={{ color: 'url(#gold-gradient)' }}>
        {React.cloneElement(icon as React.ReactElement, { 
          size, 
          strokeWidth: 1.5,
          className: "drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" 
        })}
      </div>
    </div>
  );
}