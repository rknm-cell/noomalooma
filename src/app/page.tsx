'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const letters = ['n', 'o', 'o', 'm', 'a', 'l', 'o', 'o', 'm', 'a'];
  const colors = [
    'var(--color-green)',
    'var(--color-purple)',
    'var(--color-pink)',
    'var(--color-orange)',
    'var(--color-lavender)',
    'var(--color-blue)',
    'var(--color-fuschia)',
    'var(--color-tan)',
    'var(--color-green)',
    'var(--color-purple)',
  ];

  const [colorsState, setColorsState] = useState(colors);

  const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)] ?? colors[0] ?? '';
  };

  const handleLetterHover = (index: number) => {
    const newColors = [...colorsState];
    newColors[index] = getRandomColor();
    setColorsState(newColors);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[var(--color-bg-main)] px-4 pt-8 sm:pt-16">
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-jakarta tracking-tight cursor-pointer"
            style={{ color: colorsState[index] }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
              // Default transition for hover exit
              y: { duration: 0.5, ease: "easeOut" }
            }}
            whileHover={{ 
              y: -15,
              // Transition for hover enter
              transition: { duration: 0.2, ease: "easeOut" }
            }}
              onHoverStart={() => handleLetterHover(index)}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </main>
  );
}
