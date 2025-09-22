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
    <div className="w-full text-center">
      {/* Emoji and Text Pill */}
      <div className={`${moment.color} rounded-full px-6 py-4 mb-8 flex items-center justify-center mx-auto max-w-md`}>
        <div className="text-3xl mr-3">{moment.emoji}</div>
        <p className="text-lg font-light font-jakarta text-primary leading-relaxed">
          {moment.text}
        </p>
      </div>

      {/* Continue button */}
      <button
        onClick={onContinue}
        className={`${moment.color} w-16 h-16 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity mx-auto`}
      >
        <Image 
          src="/arrow_right.png" 
          alt="continue" 
          width={24} 
          height={24}
          className="opacity-80"
        />
      </button>
    </div>
  );
}
