'use client';

import { motion } from 'framer-motion';

interface ColorSelectionStepProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  prompt: string;
}

export default function ColorSelectionStep({ colors, selectedColor, onColorSelect, prompt }: ColorSelectionStepProps) {
  return (
    <motion.div
      className="w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-light font-schoolbell text-primary mb-6">{prompt}</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {colors.map((color) => (
          <motion.button
            key={color}
            className={`w-12 h-12 rounded-full ${color} ${
              selectedColor === color ? 'ring-4 ring-white' : ''
            }`}
            onClick={() => onColorSelect(color)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
