'use client';

import { useState, useEffect, useRef } from 'react';
import type { BouncingEmoji } from '../types/bouncingEmoji';

const emojis = ['😊', '🤪', '😌', '✨', '🎉', '🎨', '🎭', '🎪'];

export function useBouncingEmojis() {
  const [bouncingEmojis, setBouncingEmojis] = useState<BouncingEmoji[]>([]);
  const animationRef = useRef<number | undefined>();

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

  return { bouncingEmojis, setBouncingEmojis };
}
