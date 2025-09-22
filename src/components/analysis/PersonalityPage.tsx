'use client';

import { motion } from 'framer-motion';

interface PersonalityPageProps {
  personality: {
    title: string;
    description: string;
    emoji: string;
  };
  onNext: () => void;
  onPrev: () => void;
}

export default function PersonalityPage({ personality, onNext, onPrev }: PersonalityPageProps) {
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
            Your Play Type
          </h1>
          <p className="text-xl text-primary/70">The personality behind your play</p>
        </motion.div>

        {/* Personality Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-pink rounded-3xl p-8 mb-8 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            {personality.emoji}
          </motion.div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            You're {personality.title}
          </h2>
          <p className="text-primary text-xl leading-relaxed">{personality.description}</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            className="bg-tan text-primary px-6 py-3 rounded-full font-semibold text-lg"
          >
            ← Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-green text-primary px-6 py-3 rounded-full font-semibold text-lg"
          >
            See Your Stats →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
