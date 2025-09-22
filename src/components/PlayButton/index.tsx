'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PlayButtonProps {
  onClick: () => void;
  isAnimating?: boolean;
}

export default function PlayButton({ onClick, isAnimating = false }: PlayButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-green');

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
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setButtonColor(randomColor);
  }, []);

  const handleTap = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    onClick();
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main Play Button */}
      <motion.button
        className={`relative ${buttonColor} text-primary text-6xl sm:text-7xl md:text-8xl font-light font-jakarta w-32 h-32 sm:w-50 sm:h-36 md:w-40 md:h-40 rounded-full focus:outline-none focus:ring-4 focus:ring-green/30 flex items-center justify-center`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
          // Hand-drawn scribble animation on load
          rotate: [0, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1]
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
        play
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
