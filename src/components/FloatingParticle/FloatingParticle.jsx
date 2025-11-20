import React from 'react';

export const FloatingParticle = ({ count = 40 }) => {
  // Create an array of particles
  const particles = Array.from({ length: count }, () => ({
    top: Math.random() * 100,      // percentage for top
    left: Math.random() * 100,     // percentage for left
    duration: Math.random() * 2 + 2 // 2s to 4s
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animation: `float ${p.duration}s infinite`
          }}
        ></div>
      ))}
    </div>
  );
};

