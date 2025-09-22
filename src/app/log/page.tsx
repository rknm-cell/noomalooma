'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { PlayMoment } from '../../types/playMoment';

interface BouncingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function LogPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('😊');
  const [selectedColor, setSelectedColor] = useState<string>('bg-green');
  const [currentStep, setCurrentStep] = useState<'text' | 'emoji' | 'color'>('text');
  const animationRef = useRef<number | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  const emojis = ['😊', '🤪', '😌', '✨', '🎉', '🎨', '🎭', '🎪'];
  const colors = ['bg-green', 'bg-purple', 'bg-pink', 'bg-orange', 'bg-lavender', 'bg-blue', 'bg-fuschia', 'bg-tan'];

  // Initialize bouncing emojis
  const [bouncingEmojis, setBouncingEmojis] = useState<BouncingEmoji[]>([]);

  // Randomize initial selections
  useEffect(() => {
    setSelectedEmoji(emojis[Math.floor(Math.random() * emojis.length)] ?? '😊');
    setSelectedColor(colors[Math.floor(Math.random() * colors.length)] ?? 'bg-green');
  }, []);

  // Initialize bouncing emojis
  useEffect(() => {
    const initEmojis: BouncingEmoji[] = emojis.map((emoji, index) => ({
      id: index,
      emoji,
      x: Math.random() * (window.innerWidth - 64),
      y: Math.random() * (window.innerHeight - 64),
      vx: (Math.random() - 0.5) * 4, // Random velocity between -2 and 2
      vy: (Math.random() - 0.5) * 4,
      size: 64
    }));
    setBouncingEmojis(initEmojis);
  }, []);

  // Animation loop for bouncing physics
  useEffect(() => {
    const animate = () => {
      setBouncingEmojis(prev => {
        return prev.map(emoji => {
          let newX = emoji.x + emoji.vx;
          let newY = emoji.y + emoji.vy;
          let newVx = emoji.vx;
          let newVy = emoji.vy;

          // Bounce off viewport edges (accounting for emoji size)
          if (newX <= 0 || newX >= window.innerWidth - emoji.size) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(window.innerWidth - emoji.size, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - emoji.size) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(window.innerHeight - emoji.size, newY));
          }

          // Check collision with other emojis (prevent sticking)
          prev.forEach(other => {
            if (other.id !== emoji.id) {
              const dx = (newX + emoji.size/2) - (other.x + other.size/2);
              const dy = (newY + emoji.size/2) - (other.y + other.size/2);
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = emoji.size + 2; // Add small buffer to prevent sticking

              if (distance < minDistance && distance > 0) {
                // Collision detected - bounce and separate
                const tempVx = newVx;
                const tempVy = newVy;
                
                // Reverse velocities with dampening
                newVx = -tempVx * 0.8;
                newVy = -tempVy * 0.8;
                
                // Force separation to prevent sticking
                const overlap = minDistance - distance;
                const separationX = (dx / distance) * overlap;
                const separationY = (dy / distance) * overlap;
                
                newX = newX + separationX;
                newY = newY + separationY;
                
                // Additional separation force if they're still too close
                if (distance < emoji.size * 0.8) {
                  newX = newX + separationX * 0.5;
                  newY = newY + separationY * 0.5;
                }
              }
            }
          });

          return {
            ...emoji,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
      mood: 'Playful',
      tags: []
    };
    
    // Save to localStorage
    const existingMoments = JSON.parse(localStorage.getItem('noomalooma-play-moments') ?? '[]') as PlayMoment[];
    existingMoments.push(moment);
    localStorage.setItem('noomalooma-play-moments', JSON.stringify(existingMoments));
    
    // Navigate back to home
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 border border-red-500">
      <motion.div
        className={`${selectedColor} rounded-3xl p-8 w-full max-w-sm relative border border-red-500`}
        initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 2, -1, 0] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Back button */}
        <motion.button
          onClick={handleBack}
          className="absolute -top-4 -left-4 bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-jakarta border border-red-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        {/* Physics-based bouncing emojis - only shown during emoji selection step */}
        {currentStep === 'emoji' && (
          <div 
            ref={containerRef}
            className="fixed inset-0 w-full h-full pointer-events-none border border-red-500 z-20"
          >
            {bouncingEmojis.map((emoji) => (
              <motion.button
                key={emoji.id}
                className={`absolute text-4xl cursor-grab pointer-events-auto z-10 border border-red-500 ${
                  selectedEmoji === emoji.emoji ? `${selectedColor} rounded-full p-2` : ''
                }`}
                onDragEnd={(event, info) => {
                  if (info) {
                    // Check if emoji was dragged into the card area
                    const cardElement = document.querySelector('.bg-white');
                    if (cardElement) {
                      const cardRect = cardElement.getBoundingClientRect();
                      const emojiCenterX = info.point.x;
                      const emojiCenterY = info.point.y;
                      
                      // Check if emoji center is within card bounds
                      if (emojiCenterX >= cardRect.left && 
                          emojiCenterX <= cardRect.right && 
                          emojiCenterY >= cardRect.top && 
                          emojiCenterY <= cardRect.bottom) {
                        handleEmojiSelect(emoji.emoji);
                      }
                    }
                  }
                  
                  // Set new velocity based on drag speed
                  const velocityX = info?.velocity.x * 0.01 || 0;
                  const velocityY = info?.velocity.y * 0.01 || 0;
                  
                  setBouncingEmojis(prev => prev.map(e => 
                    e.id === emoji.id 
                      ? { ...e, vx: velocityX, vy: velocityY }
                      : e
                  ));
                }}
              style={{
                left: emoji.x,
                top: emoji.y,
                width: emoji.size,
                height: emoji.size,
              }}
              drag
              dragConstraints={{
                left: 0,
                right: window.innerWidth - emoji.size,
                top: 0,
                bottom: window.innerHeight - emoji.size,
              }}
              dragElastic={0.1}
              dragMomentum={false}
              onDrag={(event, info) => {
                // Update position during drag
                if (info) {
                  setBouncingEmojis(prev => prev.map(e => 
                    e.id === emoji.id 
                      ? { ...e, x: Math.max(0, Math.min(window.innerWidth - e.size, info.point.x - e.size/2)) }
                      : e
                  ));
                  setBouncingEmojis(prev => prev.map(e => 
                    e.id === emoji.id 
                      ? { ...e, y: Math.max(0, Math.min(window.innerHeight - e.size, info.point.y - e.size/2)) }
                      : e
                  ));
                }
              }}
              whileHover={{ 
                scale: 1.2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.8 }}
              whileDrag={{ 
                scale: 1.1,
                cursor: 'grabbing'
              }}
            >
              {emoji.emoji}
            </motion.button>
          ))}
          </div>
        )}

        {/* Floating bouncing color dots - DISABLED */}
        {/* {colors.slice(0, 6).map((color, index) => (
          <motion.button
            key={color}
            className={`absolute w-8 h-8 rounded-full ${color} cursor-pointer z-10 border border-red-500 ${
              selectedColor === color ? 'ring-4 ring-white' : ''
            }`}
            onClick={() => setSelectedColor(color)}
            initial={{ 
              x: Math.random() * 400 - 200,
              y: Math.random() * 300 - 150,
              scale: 0,
              rotate: -30
            }}
            animate={{ 
              x: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200
              ],
              y: [
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150
              ],
              scale: [0, 1, 1.2, 1],
              rotate: [0, 20, -20, 10, -10, 0]
            }}
            transition={{
              duration: 10 + index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
            whileHover={{ 
              scale: 1.4,
              rotate: 25,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.7 }}
          />
        ))} */}

        {/* Step 1: Text Input */}
        {currentStep === 'text' && (
          <>
            <motion.input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="what did you do to be playful today?"
              className="w-full text-2xl font-light font-jakarta text-primary bg-transparent outline-none resize-none border border-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            
            {text.trim() && (
              <motion.button
                onClick={handleTextSubmit}
                className={`absolute -bottom-4 -right-4 ${selectedColor} text-primary px-6 py-3 rounded-full font-jakarta font-light text-lg border border-red-500`}
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: [0, 3, -2, 0] }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                next
              </motion.button>
            )}
          </>
        )}

        {/* Step 2: Emoji Selection */}
        {currentStep === 'emoji' && (
          <motion.div
            className="w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-light font-jakarta text-primary mb-6">how did it feel?</h3>
            <p className="text-sm font-light font-jakarta text-gray-600 mb-4">drag an emoji into this box to select</p>
            <div className="w-full h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
              <span className="text-gray-400 text-sm font-jakarta">drop zone</span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Color Selection */}
        {currentStep === 'color' && (
          <motion.div
            className="w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-light font-jakarta text-primary mb-6">pick a color</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className={`w-12 h-12 rounded-full ${color} border border-red-500 ${
                    selectedColor === color ? 'ring-4 ring-white' : ''
                  }`}
                  onClick={() => handleColorSelect(color)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
