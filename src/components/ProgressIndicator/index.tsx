'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: 'text' | 'emoji' | 'color' | 'confirmation' | 'loading' | 'summary' | 'personality' | 'stats' | 'recommendations' | 'funfact' | 'complete';
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const stepIndex = {
    'text': 0,
    'emoji': 1,
    'color': 2,
    'confirmation': 3,
    'loading': 0,
    'summary': 0,
    'personality': 1,
    'stats': 2,
    'recommendations': 3,
    'funfact': 4,
    'complete': 5
  }[currentStep];

  // Design system colors for each step
  const stepColors = [
    'bg-green',      // Step 1: Text Input / Summary
    'bg-purple',     // Step 2: Emoji Selection / Personality
    'bg-pink',       // Step 3: Color Selection / Stats
    'bg-orange',     // Step 4: Confirmation / Recommendations
    'bg-lavender',   // Step 5: Fun Fact
    'bg-blue'        // Step 6: Complete
  ];

  return (
    <motion.div
      className="flex items-center justify-center gap-3 mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index <= stepIndex 
              ? stepColors[index] 
              : 'bg-gray-300'
          }`}
          animate={{
            scale: index === stepIndex ? 0.7 : 0.7,
            opacity: index <= stepIndex ? 1 : 0.4
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.1
          }}
        />
      ))}
    </motion.div>
  );
}
