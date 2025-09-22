'use client';

import { motion, type PanInfo } from 'framer-motion';
import type { BouncingEmoji as BouncingEmojiType } from '../../types/bouncingEmoji';

interface BouncingEmojiProps {
  emoji: BouncingEmojiType;
  selectedEmoji: string;
  selectedColor: string;
  onEmojiSelect: (emoji: string) => void;
  setBouncingEmojis: React.Dispatch<React.SetStateAction<BouncingEmojiType[]>>;
  setIsDragOverDropZone: (isOver: boolean) => void;
}

export default function BouncingEmoji({ 
  emoji, 
  selectedEmoji, 
  selectedColor, 
  onEmojiSelect, 
  setBouncingEmojis,
  setIsDragOverDropZone 
}: BouncingEmojiProps) {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragOverDropZone(false); // Reset drag over state
    
    if (info) {
      // Check if emoji was dragged into the card area
      const cardElement = document.querySelector('#main-card');
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        
        // Check if emoji center is within card bounds (with some padding)
        const padding = 50; // Add padding for easier dropping
        if (info.point.x >= cardRect.left - padding && 
            info.point.x <= cardRect.right + padding && 
            info.point.y >= cardRect.top - padding && 
            info.point.y <= cardRect.bottom + padding) {
          
          // Slot the emoji into the drop zone
          const dropZoneElement = document.querySelector('.border-dashed');
          if (dropZoneElement) {
            const dropZoneRect = dropZoneElement.getBoundingClientRect();
            const centerX = dropZoneRect.left + dropZoneRect.width / 2;
            const centerY = dropZoneRect.top + dropZoneRect.height / 2;
            
            // Animate emoji to center of drop zone
            setBouncingEmojis(prev => prev.map(e => 
              e.id === emoji.id 
                ? { ...e, x: centerX - e.size/2, y: centerY - e.size/2, vx: 0, vy: 0 }
                : e
            ));
            
            // Small delay before selection to show the slot-in effect
            setTimeout(() => {
              onEmojiSelect(emoji.emoji);
            }, 300);
          } else {
            onEmojiSelect(emoji.emoji);
          }
          return; // Exit early if selection was made
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
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Update position during drag - match mouse movement exactly
    if (info) {
      setBouncingEmojis(prev => prev.map(e => 
        e.id === emoji.id 
          ? { 
              ...e, 
              x: Math.max(0, Math.min(window.innerWidth - e.size, info.point.x - e.size/2)),
              y: Math.max(0, Math.min(window.innerHeight - e.size, info.point.y - e.size/2)),
              vx: 0,
              vy: 0
            }
          : e
      ));
      
      // Check if dragging over drop zone
      const cardElement = document.querySelector('#main-card');
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const isOver = info.point.x >= cardRect.left && 
                      info.point.x <= cardRect.right && 
                      info.point.y >= cardRect.top && 
                      info.point.y <= cardRect.bottom;
        setIsDragOverDropZone(isOver);
      }
    }
  };

  return (
    <motion.button
      className={`absolute text-4xl cursor-grab pointer-events-auto z-10 border border-red-500 ${
        selectedEmoji === emoji.emoji ? `${selectedColor} rounded-full p-2` : ''
      }`}
      onDragEnd={handleDragEnd}
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
      onDrag={handleDrag}
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
  );
}
