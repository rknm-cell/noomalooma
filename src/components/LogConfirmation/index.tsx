'use client';

import { motion } from 'framer-motion';
import type { PlayMoment } from '../../types/playMoment';

interface LogConfirmationProps {
  moment: PlayMoment;
  onContinue: () => void;
}

export default function LogConfirmation({ moment, onContinue }: LogConfirmationProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      className="w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success message */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-2xl font-light font-jakarta text-primary mb-2">
          play moment logged!
        </h2>
        <p className="text-sm font-light font-jakarta text-gray-600">
          {formatDate(moment.timestamp)} at {formatTime(moment.timestamp)}
        </p>
      </motion.div>

      {/* Moment details */}
      <motion.div
        className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl mr-3">{moment.emoji}</div>
          <div className={`w-8 h-8 rounded-full ${moment.color}`}></div>
        </div>
        
        <p className="text-lg font-light font-jakarta text-primary leading-relaxed">
          "{moment.text}"
        </p>
        
        <div className="mt-4 text-sm font-light font-jakarta text-gray-600">
          felt: {moment.mood}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.button
        onClick={onContinue}
        className={`${moment.color} text-primary px-8 py-4 rounded-full font-jakarta font-light text-lg hover:opacity-90 transition-opacity`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        continue
      </motion.button>
    </motion.div>
  );
}
