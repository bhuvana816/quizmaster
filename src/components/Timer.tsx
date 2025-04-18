import React, { useMemo } from 'react';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime }) => {
  const percentage = useMemo(() => (timeRemaining / totalTime) * 100, [timeRemaining, totalTime]);
  
  // Determine the color based on time remaining
  const colorClass = useMemo(() => {
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-amber-500';
    return 'text-red-600';
  }, [percentage]);
  
  // Determine the stroke color for the circle
  const strokeColor = useMemo(() => {
    if (percentage > 50) return '#059669'; // green-600
    if (percentage > 25) return '#F59E0B'; // amber-500
    return '#DC2626'; // red-600
  }, [percentage]);
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Timer circle */}
          <circle
            className="transition-all duration-200 ease-in-out"
            strokeWidth="8"
            stroke={strokeColor}
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className={`absolute top-0 left-0 flex items-center justify-center w-full h-full ${colorClass} font-bold`}>
          {timeRemaining}
        </div>
      </div>
    </div>
  );
};

export default Timer;