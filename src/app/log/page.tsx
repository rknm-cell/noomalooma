'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { PlayMoment } from '../../types/playMoment';
import { useBouncingEmojis } from '../../hooks/useBouncingEmojis';
import TextInputStep from '../../components/TextInputStep';
import EmojiSelectionStep from '../../components/EmojiSelectionStep';
import ColorSelectionStep from '../../components/ColorSelectionStep';
import LogConfirmation from '../../components/LogConfirmation';

export default function LogPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('😊');
  const [selectedColor, setSelectedColor] = useState<string>('bg-green');
  const [currentStep, setCurrentStep] = useState<'text' | 'emoji' | 'color' | 'confirmation'>('text');
  const [loggedMoment, setLoggedMoment] = useState<PlayMoment | null>(null);
  const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);

  const emojis = useMemo(() => ['😊', '🤪', '😌', '✨', '🎉', '🎨', '🎭', '🎪'], []);
  const colors = useMemo(() => ['bg-green', 'bg-purple', 'bg-pink', 'bg-orange', 'bg-lavender', 'bg-blue', 'bg-fuschia', 'bg-tan'], []);
  
  // Emoji to mood mapping
  const emojiToMood = useMemo(() => ({
    '😊': 'Happy',
    '🤪': 'Silly', 
    '😌': 'Peaceful',
    '✨': 'Magical',
    '🎉': 'Celebratory',
    '🎨': 'Creative',
    '🎭': 'Dramatic',
    '🎪': 'Adventurous'
  }), []);

  // Use bouncing emojis hook
  const { bouncingEmojis, setBouncingEmojis } = useBouncingEmojis();

  // Randomize initial selections
  useEffect(() => {
    setSelectedEmoji(emojis[Math.floor(Math.random() * emojis.length)] ?? '😊');
    setSelectedColor(colors[Math.floor(Math.random() * colors.length)] ?? 'bg-green');
  }, [emojis, colors]);

  const handleTextSubmit = () => {
    if (text.trim()) {
      setCurrentStep('emoji');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setCurrentStep('color');
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    
    // Save the complete moment
    const moment: PlayMoment = {
      id: Date.now().toString(),
      timestamp: new Date(),
      text,
      emoji: selectedEmoji,
      color: selectedColor,
      mood: emojiToMood[selectedEmoji as keyof typeof emojiToMood] || 'Playful',
      tags: []
    };
    
    // Save to localStorage
    const existingMoments = JSON.parse(localStorage.getItem('noomalooma-play-moments') ?? '[]') as PlayMoment[];
    existingMoments.push(moment);
    localStorage.setItem('noomalooma-play-moments', JSON.stringify(existingMoments));
    
    // Show confirmation step
    setLoggedMoment(moment);
    setCurrentStep('confirmation');
  };

  const handleContinue = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 border border-red-500">
      <motion.div
        id="main-card"
        className={`${selectedColor} rounded-3xl p-8 w-full max-w-sm relative border border-red-500`}
        initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 2, -1, 0] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Back button - hidden during confirmation */}
        {currentStep !== 'confirmation' && (
          <motion.button
            onClick={handleBack}
            className="absolute -top-4 -left-4 bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-jakarta border border-red-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
        )}

        {/* Step 1: Text Input */}
        {currentStep === 'text' && (
          <TextInputStep
            text={text}
            setText={setText}
            onNext={handleTextSubmit}
            selectedColor={selectedColor}
          />
        )}

        {/* Step 2: Emoji Selection */}
        {currentStep === 'emoji' && (
          <EmojiSelectionStep
            bouncingEmojis={bouncingEmojis}
            setBouncingEmojis={setBouncingEmojis}
            selectedEmoji={selectedEmoji}
            selectedColor={selectedColor}
            isDragOverDropZone={isDragOverDropZone}
            setIsDragOverDropZone={setIsDragOverDropZone}
            onEmojiSelect={handleEmojiSelect}
          />
        )}

        {/* Step 3: Color Selection */}
        {currentStep === 'color' && (
          <ColorSelectionStep
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 'confirmation' && loggedMoment && (
          <LogConfirmation
            moment={loggedMoment}
            onContinue={handleContinue}
          />
        )}
      </motion.div>
    </main>
  );
}
