'use client';

interface TextInputStepProps {
  text: string;
  setText: (text: string) => void;
  onNext: () => void;
  selectedColor: string;
  prompt: string; // Still passed for potential future use
}

export default function TextInputStep({ text, setText, onNext, selectedColor, prompt }: TextInputStepProps) {
  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="share your moment..."
        className="w-full text-2xl font-light font-jakarta text-primary bg-transparent outline-none resize-none"
        autoFocus
        onKeyPress={(e) => e.key === 'Enter' && onNext()}
      />
      
      {text.trim() && (
        <button
          onClick={onNext}
          className={`absolute -bottom-4 -right-4 ${selectedColor} text-primary px-6 py-3 rounded-full font-jakarta font-light text-lg hover:scale-105 transition-transform`}
        >
          next
        </button>
      )}
    </>
  );
}
