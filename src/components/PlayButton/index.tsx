'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PlayButtonProps {
  onClick: () => void;
  isAnimating?: boolean;
}

export default function PlayButton({ onClick, isAnimating = false }: PlayButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-green');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const colors = [
    'bg-green',
    'bg-purple', 
    'bg-pink',
    'bg-orange',
    'bg-lavender',
    'bg-blue',
    'bg-fuschia',
    'bg-tan'
  ];

  useEffect(() => {
    // Randomize color on component mount
    const randomColor = colors[Math.floor(Math.random() * colors.length)] ?? 'bg-green';
    setButtonColor(randomColor);
  }, []);

  // Majesty animation sequence - triggered on click
  useEffect(() => {
    if (!showAnimation) return;

    const frames = [2, 3];
    let frameIndex = 0;
    
    const animate = () => {
      if (frameIndex < frames.length) {
        setCurrentFrame(frames[frameIndex]);
        frameIndex++;
      } else {
        // Animation complete, hide and reset
        setShowAnimation(false);
        setCurrentFrame(0);
      }
    };

    // Start animation sequence immediately
    animate();
    
    // Continue with remaining frames
    const interval = setInterval(animate, 100); // 100ms per frame
    
    // Cleanup after all frames are shown
    setTimeout(() => {
      clearInterval(interval);
    }, 300); // 2 frames * 100ms = 200ms, plus buffer

    return () => clearInterval(interval);
  }, [showAnimation]);

  const handleTap = () => {
    setIsPressed(true);
    setShowAnimation(true); // Trigger majesty animation
    setTimeout(() => setIsPressed(false), 300);
    
    // Wait 300ms for animation to complete before navigating
    setTimeout(() => {
      onClick();
    }, 300);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main Play Button */}
      <motion.button
        className={`relative ${buttonColor} text-primary text-4xl sm:text-7xl md:text-8xl font-light font-jakarta w-32 h-32 sm:w-50 sm:h-36 md:w-40 md:h-40 rounded-full focus:outline-none focus:ring-4 focus:ring-green/30 flex items-center justify-center`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        onTap={handleTap}
      >
        {showAnimation && currentFrame > 0 ? (
          <Image 
            src={`/majesty_0${currentFrame}.png`} 
            alt="play button"
            width={512}
            height={512}
            className="w-full h-full object-contain scale-200"
          />
        ) : (
          <span className="text-6xl sm:text-7xl md:text-8xl font-light font-jakarta">play</span>
        )}
      </motion.button>

      {/* Ripple Effect */}
      {isPressed && (
        <>
          <motion.div
            className={`absolute inset-0 ${buttonColor} rounded-full opacity-30`}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ 
              scale: [0, 1.5, 2],
              opacity: [0.6, 0.3, 0]
            }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          />
          <motion.div
            className={`absolute inset-0 ${buttonColor} rounded-full opacity-20`}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ 
              scale: [0, 1.2, 1.8],
              opacity: [0.4, 0.2, 0]
            }}
            transition={{ 
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut"
            }}
          />
          <motion.div
            className={`absolute inset-0 ${buttonColor} rounded-full opacity-10`}
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ 
              scale: [0, 1.1, 1.6],
              opacity: [0.3, 0.1, 0]
            }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
          />
        </>
      )}
    </div>
  );
}
