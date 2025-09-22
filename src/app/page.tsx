'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlayButton from '../components/PlayButton';
import BouncingOs from '../components/BouncingOs';

export default function HomePage() {
  const router = useRouter();
  const letters = ['n', 'o', 'o', 'm', 'a', 'l', 'o', 'o', 'm', 'a'];
  const colors = [
    'var(--color-green)',
    'var(--color-purple)',
    'var(--color-pink)',
    'var(--color-orange)',
    'var(--color-lavender)',
    'var(--color-blue)',
    'var(--color-fuschia)',
    'var(--color-tan)',
    'var(--color-green)',
    'var(--color-purple)',
  ];

  const [colorsState, setColorsState] = useState(colors);
  const [playStoryColor, setPlayStoryColor] = useState('bg-tan');

  const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)] ?? colors[0] ?? '';
  };

  const getRandomBgColor = (): string => {
    const bgColors = ['bg-green', 'bg-purple', 'bg-pink', 'bg-orange', 'bg-lavender', 'bg-blue', 'bg-fuschia', 'bg-tan'];
    return bgColors[Math.floor(Math.random() * bgColors.length)] ?? 'bg-tan';
  };

  const handlePlayStoryHover = () => {
    setPlayStoryColor(getRandomBgColor());
  };

  const handleLetterHover = (index: number) => {
    const newColors = [...colorsState];
    newColors[index] = getRandomColor();
    setColorsState(newColors);
  };

  const handlePlayButtonClick = () => {
    router.push('/log');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-8 sm:pt-16 relative overflow-hidden">
      {/* Physics-based bouncing O's */}
      {/* <BouncingOs colors={colors} count={6} size={100} opacity={1} /> */}
      
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 relative z-10">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-jakarta tracking-tight cursor-pointer"
            style={{ color: colorsState[index] }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
              // Default transition for hover exit
              y: { duration: 0.5, ease: "easeOut" }
            }}
            whileHover={{ 
              y: -15,
              // Transition for hover enter
              transition: { duration: 0.2, ease: "easeOut" }
            }}
              onHoverStart={() => handleLetterHover(index)}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
      {/* Play Button Section */}
      <div className="mt-16 sm:mt-20 relative z-10">
        <PlayButton onClick={handlePlayButtonClick} />
      </div>

      {/* Analysis Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-8 relative z-10"
      >
        <motion.a
          href="/analysis"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={handlePlayStoryHover}
          className={`inline-block ${playStoryColor} text-primary px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300`}
        >
          See Your Play Story 
        </motion.a>
      </motion.div>

    </main>
  );
}
