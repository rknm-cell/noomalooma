'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Pattern {
  title: string;
  description: string;
  emoji: string;
}

interface StatsPageProps {
  patterns: Pattern[];
  onNext: () => void;
  onPrev: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];

export default function StatsPage({ patterns, onNext, onPrev }: StatsPageProps) {
  const [colors, setColors] = useState<{ heading: string; back: string; next: string; patternTitles: string[] }>({
    heading: 'purple',
    back: 'tan',
    next: 'green',
    patternTitles: []
  });

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple',
      back: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'orange',
      next: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'blue',
      patternTitles: patterns.map(() => availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'pink')
    };
    setColors(randomColors);
  }, [patterns]);

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
            Your Play Patterns
          </h1>
          <p className="text-xl text-primary/70">What your moments reveal</p>
        </motion.div>

        {/* Stats Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8 mb-12"
        >
          {patterns.map((pattern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-4xl">{pattern.emoji}</span>
                <h3 className={`text-2xl font-bold text-${colors.patternTitles[index] ?? 'primary'}`}>{pattern.title}</h3>
              </div>
              <p className="text-primary text-lg">{pattern.description}</p>
            </motion.div>
          ))}
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
            onClick={onNext}
            className={`text-${colors.next} text-xl font-semibold hover:opacity-70 transition-opacity`}
          >
            What&apos;s Next →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
