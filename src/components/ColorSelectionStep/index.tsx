'use client';

interface ColorSelectionStepProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  prompt: string;
}

export default function ColorSelectionStep({ colors, selectedColor, onColorSelect, prompt }: ColorSelectionStepProps) {
  return (
    <div className="w-full text-center">
      <h3 className="text-xl font-light font-schoolbell text-primary mb-6">{prompt}</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 rounded-full ${color} hover:scale-110 transition-transform ${
              selectedColor === color ? 'ring-4 ring-white' : ''
            }`}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}
