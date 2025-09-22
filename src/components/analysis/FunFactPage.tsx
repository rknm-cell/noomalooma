'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FunFactPageProps {
  funFact: string;
  onPrev: () => void;
  onComplete: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];

export default function FunFactPage({ funFact, onPrev, onComplete }: FunFactPageProps) {
  const [colors, setColors] = useState<{ heading: string; emoji: string; back: string; complete: string }>({
    heading: 'purple',
    emoji: 'primary',
    back: 'tan',
    complete: 'fuschia'
  });

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple',
      emoji: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'pink',
      back: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'orange',
      complete: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'blue'
    };
    setColors(randomColors);
  }, []);

  return (
    <div className="min-h-screen bg-main flex flex-col items-center justify-center p-4">
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
          <h1 className={`text-5xl font-bold text-${colors.heading} mb-4`}>
            Something Special
          </h1>
          <p className="text-xl text-primary/70">A delightful discovery about you</p>
        </motion.div>

        {/* Fun Fact Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className={`text-6xl mb-6 text-${colors.emoji}`}
          >
            🤯
          </motion.div>
          <p className="text-primary text-2xl leading-relaxed">{funFact}</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-8"
        >
          <button
            onClick={onPrev}
            className={`text-${colors.back} text-xl font-semibold hover:opacity-70 transition-opacity`}
          >
            ← Back
          </button>
          <button
            onClick={onComplete}
            className={`text-${colors.complete} text-xl font-semibold hover:opacity-70 transition-opacity`}
          >
            Wonderful! 🎉
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
