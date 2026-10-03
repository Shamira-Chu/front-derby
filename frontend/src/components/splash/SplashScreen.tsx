'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  onFinish,
  duration = 2400,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDone = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
      if (onFinish) onFinish();
    }, 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDone();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDone}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-102 pointer-events-none blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-6 max-w-2xl px-6">
        {/* Derby Synthetic Star Logo Icon */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
          <Image
            src="/derby-synthetic.svg"
            alt="Derby Synthetica"
            width={128}
            height={128}
            priority
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(212,181,255,0.75)]"
          />
        </div>

        {/* Title in Audiowide Font */}
        <h1
          style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}
          className="font-audiowide text-2xl sm:text-4xl md:text-5xl font-normal text-white uppercase tracking-[0.2em] leading-none pt-2"
        >
          DERBY SYNTHETICA
        </h1>

        {/* Subtitle in Magenta */}
        <p className="font-mono text-xs sm:text-sm text-[#FF2E97] tracking-[0.3em] uppercase font-medium">
          TEMPORADA 47 – FLAT TRACK
        </p>
      </div>
    </div>
  );
};
