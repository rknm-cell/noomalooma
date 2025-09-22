'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SummaryPageProps {
  summary: string;
  onNext: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];
const titleText = "Your Play Story";
const letters = titleText.split('');

export default function SummaryPage({ summary, onNext }: SummaryPageProps) {
  const [colors, setColors] = useState<{ heading: string; text: string; button: string }>({
    heading: 'purple',
    text: 'primary',
    button: 'green'
  });
  const [letterColors, setLetterColors] = useState<string[]>([]);

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple',
      text: 'primary',
      button: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'blue'
    };
    setColors(randomColors);

    // Initialize letter colors
    const initialLetterColors = letters.map(() => 
      availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple'
    );
    setLetterColors(initialLetterColors);
  }, []);

  // Animate letter colors
  useEffect(() => {
    const interval = setInterval(() => {
      setLetterColors(prev => 
        prev.map(() => availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple')
      );
    }, 1000); // Change colors every 1000ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-main flex flex-col items-center justify-start p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className={`text-${letterColors[index] ?? 'purple'}`}
                animate={{ 
                  color: `var(--color-${letterColors[index] ?? 'purple'})`,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  color: { duration: 0, ease: "linear" }, // Instant color change
                  scale: { duration: 0.6, ease: "easeInOut", delay: index * 0.05 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <p className="text-xl text-primary/70">A week of playful moments</p>
        </motion.div>

        {/* Summary Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className={`text-3xl font-bold text-${colors.heading} mb-6`}>Your Week of Play</h2>
          <p className="text-primary text-2xl leading-relaxed">{summary}</p>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onNext}
          className="flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <span className={`text-${colors.button} text-2xl font-semibold`}>
            Meet Your Play Self
          </span>
          <Image 
            src="/arrow_right.png" 
            alt="next" 
            width={24} 
            height={24}
            className="w-6 h-6"
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
