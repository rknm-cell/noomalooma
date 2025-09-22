'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PersonalityPageProps {
  personality: {
    title: string;
    description: string;
    emoji: string;
  };
  onNext: () => void;
  onPrev: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];

export default function PersonalityPage({ personality, onNext, onPrev }: PersonalityPageProps) {
  const [colors, setColors] = useState<{ heading: string; title: string; description: string; back: string; next: string }>({
    heading: 'purple',
    title: 'primary',
    description: 'primary',
    back: 'tan',
    next: 'green'
  });

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'purple',
      title: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'pink',
      description: 'primary',
      back: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'orange',
      next: availableColors[Math.floor(Math.random() * availableColors.length)] ?? 'blue'
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
            Your Play Type
          </h1>
          <p className="text-xl text-primary/70">The personality behind your play</p>
        </motion.div>

        {/* Personality Content */}
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
            className="text-8xl mb-6"
          >
            {personality.emoji}
          </motion.div>
          <h2 className={`text-4xl font-bold text-${colors.title} mb-4`}>
            You&apos;re {personality.title}
          </h2>
          <p className="text-primary text-xl leading-relaxed">{personality.description}</p>
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
            See Your Stats →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
