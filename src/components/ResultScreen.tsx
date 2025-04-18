import React from 'react';
import { HighScore } from '../types/quiz';
import { Trophy, RotateCcw, Award } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  highScores: HighScore[];
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
  highScores,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Function to display result message based on score
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! You're a quiz master!";
    if (percentage >= 70) return "Great job! You know your stuff!";
    if (percentage >= 50) return "Good effort! Room for improvement.";
    return "Keep practicing! You'll improve.";
  };
  
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
          <Trophy className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">{getResultMessage()}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Your Score</p>
            <h3 className="text-3xl font-bold text-gray-800">{score}/{totalQuestions}</h3>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-purple-600 transition-all duration-1000 ease-in-out"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
              <span className="text-xl font-bold text-gray-800">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {highScores.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">High Scores</h3>
          </div>
          <div className="space-y-3">
            {highScores.slice(0, 5).map((highScore, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm text-gray-700 mr-3">
                    {index + 1}
                  </span>
                  <span>
                    {new Date(highScore.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-medium">
                  {highScore.score}/{highScore.totalQuestions}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;