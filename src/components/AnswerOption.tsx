import React from 'react';

interface AnswerOptionProps {
  index: number;
  text: string;
  selected: boolean;
  correct: number | null;
  submitted: boolean;
  onSelect: (index: number) => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  text,
  selected,
  correct,
  submitted,
  onSelect,
}) => {
  // Determine the style based on selection state
  const getOptionClass = () => {
    const baseClass = "w-full p-4 mb-3 text-left rounded-lg transition-all duration-300 border-2";
    
    if (!submitted) {
      return selected
        ? "bg-purple-100 border-purple-500 shadow-md"
        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300";
    }
    
    if (index === correct) {
      return "bg-green-100 border-green-500 shadow-md";
    }
    
    if (selected && index !== correct) {
      return "bg-red-100 border-red-500 shadow-md";
    }
    
    return "bg-white border-gray-200 opacity-70";
  };

  // Generate option letter (A, B, C, D)
  const optionLetter = String.fromCharCode(65 + index);
  
  return (
    <button
      className={`${getOptionClass()} flex items-center`}
      onClick={() => !submitted && onSelect(index)}
      disabled={submitted}
    >
      <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm font-semibold rounded-full bg-gray-100 text-gray-700">
        {optionLetter}
      </span>
      <span className="text-md">{text}</span>
    </button>
  );
};

export default AnswerOption;