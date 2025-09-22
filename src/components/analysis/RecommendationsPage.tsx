'use client';

import { motion } from 'framer-motion';

interface RecommendationsPageProps {
  recommendations: string[];
  onNext: () => void;
  onPrev: () => void;
}

export default function RecommendationsPage({ recommendations, onNext, onPrev }: RecommendationsPageProps) {
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
            Keep the Play Going
          </h1>
          <p className="text-xl text-primary/70">Your next playful adventures</p>
        </motion.div>

        {/* Recommendations Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-lavender rounded-3xl p-8 mb-8 shadow-lg"
        >
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="flex items-start gap-4"
              >
                <span className="text-2xl">✨</span>
                <p className="text-primary text-lg text-left">{rec}</p>
              </motion.div>
            ))}
          </div>
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
            Fun Fact →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
