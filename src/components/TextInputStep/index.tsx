'use client';

import { motion } from 'framer-motion';

interface TextInputStepProps {
  text: string;
  setText: (text: string) => void;
  onNext: () => void;
  selectedColor: string;
}

export default function TextInputStep({ text, setText, onNext, selectedColor }: TextInputStepProps) {
  return (
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
        onKeyPress={(e) => e.key === 'Enter' && onNext()}
      />
      
      {text.trim() && (
        <motion.button
          onClick={onNext}
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
  );
}
