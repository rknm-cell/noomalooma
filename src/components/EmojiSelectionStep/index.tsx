'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import BouncingEmoji from '../BouncingEmoji';
import type { BouncingEmoji as BouncingEmojiType } from '../../types/bouncingEmoji';

interface EmojiSelectionStepProps {
  bouncingEmojis: BouncingEmojiType[];
  setBouncingEmojis: React.Dispatch<React.SetStateAction<BouncingEmojiType[]>>;
  selectedEmoji: string;
  selectedColor: string;
  isDragOverDropZone: boolean;
  setIsDragOverDropZone: (isOver: boolean) => void;
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiSelectionStep({
  bouncingEmojis,
  setBouncingEmojis,
  selectedEmoji,
  selectedColor,
  isDragOverDropZone,
  setIsDragOverDropZone,
  onEmojiSelect
}: EmojiSelectionStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-light font-jakarta text-primary mb-6">how did it feel?</h3>
        <p className="text-sm font-light font-jakarta text-gray-600 mb-4">drag an emoji into this box to select</p>
        <div className={`w-full h-20 border-2 border-dashed rounded-xl flex items-center justify-center transition-colors ${
          isDragOverDropZone 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 bg-gray-50'
        }`}>
          <span className={`text-sm font-jakarta ${
            isDragOverDropZone ? 'text-green-600' : 'text-gray-400'
          }`}>
            {isDragOverDropZone ? 'drop here!' : 'drop zone'}
          </span>
        </div>
      </motion.div>

      {/* Physics-based bouncing emojis */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-none border border-red-500 z-20"
      >
        {bouncingEmojis.map((emoji) => (
          <BouncingEmoji
            key={emoji.id}
            emoji={emoji}
            selectedEmoji={selectedEmoji}
            selectedColor={selectedColor}
            onEmojiSelect={onEmojiSelect}
            setBouncingEmojis={setBouncingEmojis}
            setIsDragOverDropZone={setIsDragOverDropZone}
          />
        ))}
      </div>
    </>
  );
}
