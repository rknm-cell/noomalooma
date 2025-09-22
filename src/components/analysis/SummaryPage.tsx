'use client';

import { motion } from 'framer-motion';

interface SummaryPageProps {
  summary: string;
  onNext: () => void;
}

export default function SummaryPage({ summary, onNext }: SummaryPageProps) {
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

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-purple mb-6">This Week You...</h2>
          <p className="text-primary text-2xl leading-relaxed">{summary}</p>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-green text-primary px-8 py-4 rounded-full font-bold text-xl"
        >
          Discover Your Play Type →
        </motion.button>
      </motion.div>
    </div>
  );
}
