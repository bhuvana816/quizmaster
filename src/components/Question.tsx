import React from 'react';
import { QuizQuestion } from '../types/quiz';
import AnswerOption from './AnswerOption';
import Timer from './Timer';

interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  timeRemaining: number;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (index: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  timeRemaining,
  isAnswerSubmitted,
  onSelectAnswer,
  onSubmitAnswer,
  onNextQuestion,
}) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
        <Timer timeRemaining={timeRemaining} totalTime={15} />
      </div>
      
      <div className="my-6">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            index={index}
            text={option}
            selected={selectedAnswer === index}
            correct={isAnswerSubmitted ? question.correctAnswer : null}
            submitted={isAnswerSubmitted}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        {isAnswerSubmitted ? (
          <button
            onClick={onNextQuestion}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={onSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-2 font-medium rounded-lg shadow transition-colors duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;