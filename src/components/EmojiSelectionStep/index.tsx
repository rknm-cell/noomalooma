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
  prompt: string;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

export default function EmojiSelectionStep({
  bouncingEmojis,
  setBouncingEmojis,
  selectedEmoji,
  selectedColor,
  isDragOverDropZone,
  setIsDragOverDropZone,
  onEmojiSelect,
  prompt,
  isDragging,
  setIsDragging
}: EmojiSelectionStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full text-center flex flex-col items-center justify-start">
        <h3 className="text-xl font-light font-schoolbell text-primary mb-6">{prompt}</h3>
        <p className="text-sm font-light font-jakarta text-gray-600 mb-4">drag an emoji into this box to select</p>
        <div className={`w-full h-20 border-2 border-dashed rounded-xl flex items-start justify-center pt-4 transition-colors ${
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
      </div>

      {/* Physics-based bouncing emojis */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
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
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        ))}
      </div>
    </>
  );
}
