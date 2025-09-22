'use client';

import { motion } from 'framer-motion';

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

export default function StatsPage({ patterns, onNext, onPrev }: StatsPageProps) {
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
            Your Stats
          </h1>
          <p className="text-xl text-primary/70">The numbers behind your play</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          {patterns.map((pattern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="bg-orange rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{pattern.emoji}</span>
                <h3 className="text-2xl font-bold text-primary">{pattern.title}</h3>
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
            Keep Playing →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
