'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-main)]">
      <div className="flex flex-wrap items-center justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-8xl font-black font-jakarta tracking-tight cursor-pointer"
            style={{ color: colors[index] }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
            }}
            // transition={{
            //   duration: 0.6,
            //   delay: index * 0.1,
            //   ease: "easeOut",
            //   // Default transition for hover exit
            //   y: { duration: 0.8, ease: "easeOut" }
            // }}
            whileHover={{ 
              y: -30,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </main>
  );
}
