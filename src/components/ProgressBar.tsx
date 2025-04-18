import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-gray-600 mt-1 text-right">
        Question {current} of {total}
      </p>
    </div>
  );
};

export default ProgressBar;