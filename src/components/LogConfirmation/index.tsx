'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
      

     
        {/* Emoji and Text Pill */}
        <motion.div
          className={`${moment.color} rounded-full px-6 py-4 mb-4 flex items-center justify-center`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="text-3xl mr-3">{moment.emoji}</div>
          <p className="text-lg font-light font-jakarta text-primary leading-relaxed">
            {moment.text}
          </p>
        </motion.div>
        
       

      {/* Continue button */}
      <motion.button
        onClick={onContinue}
        className={`${moment.color} w-16 h-16 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image 
          src="/arrow_right.png" 
          alt="continue" 
          width={24} 
          height={24}
          className="opacity-80"
        />
      </motion.button>
    </motion.div>
  );
}
