'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RecommendationsPageProps {
  recommendations: string[];
  onNext: () => void;
  onPrev: () => void;
}

const availableColors = ['purple', 'pink', 'orange', 'lavender', 'blue', 'fuschia'];

export default function RecommendationsPage({ recommendations, onNext, onPrev }: RecommendationsPageProps) {
  const [colors, setColors] = useState<{ heading: string; back: string; next: string; sparkles: string[] }>({
    heading: 'purple',
    back: 'tan',
    next: 'green',
    sparkles: []
  });

  useEffect(() => {
    const randomColors = {
      heading: availableColors[Math.floor(Math.random() * availableColors.length)] || 'purple',
      back: availableColors[Math.floor(Math.random() * availableColors.length)] || 'orange',
      next: availableColors[Math.floor(Math.random() * availableColors.length)] || 'blue',
      sparkles: recommendations.map(() => availableColors[Math.floor(Math.random() * availableColors.length)] || 'pink')
    };
    setColors(randomColors);
  }, [recommendations]);

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
            Keep the Play Going
          </h1>
          <p className="text-xl text-primary/70">Your next playful adventures</p>
        </motion.div>

        {/* Recommendations Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-12"
        >
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="flex items-start gap-4 justify-center"
            >
              <span className={`text-2xl text-${colors.sparkles[index] || 'primary'}`}>✨</span>
              <p className="text-primary text-lg text-center">{rec}</p>
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
            Fun Fact →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
