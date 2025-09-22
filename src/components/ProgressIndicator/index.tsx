'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: 'text' | 'emoji' | 'color' | 'confirmation';
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const stepIndex = {
    'text': 0,
    'emoji': 1,
    'color': 2,
    'confirmation': 3
  }[currentStep];

  // Design system colors for each step
  const stepColors = [
    'bg-green',      // Step 1: Text Input
    'bg-purple',     // Step 2: Emoji Selection
    'bg-pink',       // Step 3: Color Selection
    'bg-orange'      // Step 4: Confirmation
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
