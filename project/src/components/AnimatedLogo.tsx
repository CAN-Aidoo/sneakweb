import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-black min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-2 relative">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl animate-pulse" />
        
        {/* Number 16 with pixel art style border */}
        <div className="text-6xl font-black text-white border-4 border-white px-4 py-2 mb-4 relative">
          <div className="absolute inset-0 bg-cyan-500/30 blur animate-pulse" />
          16
        </div>

        {/* Main text with glow effect */}
        <div 
          className="text-7xl font-black tracking-wider mb-2"
          style={{
            color: 'white',
            textShadow: `0 0 ${glowIntensity/10}px #fff,
                        0 0 ${glowIntensity/8}px #0ff,
                        0 0 ${glowIntensity/6}px #0ff`,
            WebkitTextStroke: '2px cyan'
          }}
        >
          SIXTEEN
        </div>

        {/* Wears text */}
        <div 
          className="text-3xl font-bold tracking-[0.3em] text-white relative"
        >
          WEARS
        </div>

        {/* Power button icon */}
        <div className="absolute -right-8 top-0 text-cyan-500 animate-pulse">
          ⚡
        </div>
      </div>
    </div>
  );
}