'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { PlayMoment } from '../../types/playMoment';
import { useBouncingEmojis } from '../../hooks/useBouncingEmojis';
import { useLoggingPrompts } from '../../hooks/useLoggingPrompts';
import TextInputStep from '../../components/TextInputStep';
import EmojiSelectionStep from '../../components/EmojiSelectionStep';
import ColorSelectionStep from '../../components/ColorSelectionStep';
import LogConfirmation from '../../components/LogConfirmation';
import ProgressIndicator from '../../components/ProgressIndicator';

export default function LogPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('😊');
  const [selectedColor, setSelectedColor] = useState<string>('bg-green');
  const [currentStep, setCurrentStep] = useState<'text' | 'emoji' | 'color' | 'confirmation'>('text');
  const [loggedMoment, setLoggedMoment] = useState<PlayMoment | null>(null);
  const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
  
  // Use dynamic prompts
  const { textPrompt, emojiPrompt, colorPrompt } = useLoggingPrompts();

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
    if (currentStep === 'text') {
      // If on text step, go back to home
      router.push('/');
    } else if (currentStep === 'emoji') {
      // Go back to text step
      setCurrentStep('text');
    } else if (currentStep === 'color') {
      // Go back to emoji step
      setCurrentStep('emoji');
    } else if (currentStep === 'confirmation') {
      // Go back to color step
      setCurrentStep('color');
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Navigation - Fixed at top */}
      <motion.div
        className="w-full flex items-center justify-between p-4 pt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image 
            src="/arrow_left.png" 
            alt="back" 
            width={20} 
            height={20}
            className="opacity-70"
          />
        </motion.button>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />

        {/* Spacer for balance */}
        <div className="w-10"></div>
      </motion.div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">

      {/* Text Prompt - above the main card */}
      {currentStep === 'text' && (
        <motion.div
          className="w-full max-w-sm px-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-light font-schoolbell text-primary text-center leading-relaxed">
            {textPrompt}
          </h2>
        </motion.div>
      )}
      
      <motion.div
        id="main-card"
        className={`${selectedColor} rounded-3xl p-8 w-full max-w-sm relative`}
        initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 2, -1, 0] }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >

        {/* Step 1: Text Input */}
        {currentStep === 'text' && (
          <TextInputStep
            text={text}
            setText={setText}
            onNext={handleTextSubmit}
            selectedColor={selectedColor}
            prompt={textPrompt}
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
            prompt={emojiPrompt}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        )}

        {/* Step 3: Color Selection */}
        {currentStep === 'color' && (
          <ColorSelectionStep
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
            prompt={colorPrompt}
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
      </div>
    </main>
  );
}
