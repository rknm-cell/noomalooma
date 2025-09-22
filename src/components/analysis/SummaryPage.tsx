'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SummaryPageProps {
  summary: string;
  onNext: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];

export default function SummaryPage({ summary, onNext }: SummaryPageProps) {
  const [colors, setColors] = useState<{ heading: string; text: string; button: string }>({
    heading: 'purple',
    text: 'primary',
    button: 'green'
  });

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] || 'purple',
      text: 'primary',
      button: availableColors[Math.floor(Math.random() * availableColors.length)] || 'blue'
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
          <h1 className="text-5xl font-bold text-primary mb-4">
            Your Play Wrapped
          </h1>
          <p className="text-xl text-primary/70">This week in your playful life</p>
        </motion.div>

        {/* Summary Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className={`text-3xl font-bold text-${colors.heading} mb-6`}>This Week You...</h2>
          <p className="text-primary text-2xl leading-relaxed">{summary}</p>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onNext}
          className={`text-${colors.button} text-2xl font-semibold hover:opacity-70 transition-opacity`}
        >
          Discover Your Play Type →
        </motion.button>
      </motion.div>
    </div>
  );
}
