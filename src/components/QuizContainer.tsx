import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import Question from './Question';
import ProgressBar from './ProgressBar';
import ResultScreen from './ResultScreen';
import { Brain } from 'lucide-react';

const QuizContainer: React.FC = () => {
  const {
    state,
    currentQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    highScores,
  } = useQuiz();
  
  if (state.quizCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <ResultScreen
          score={state.score}
          totalQuestions={state.questions.length}
          onRestart={restartQuiz}
          highScores={highScores}
        />
      </div>
    );
  }
  
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-center mb-6">
        <Brain className="w-8 h-8 text-purple-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">QuizMaster</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Score</p>
            <p className="text-xl font-bold text-gray-800">{state.score}/{state.questions.length}</p>
          </div>
          
          <ProgressBar
            current={state.currentQuestionIndex + 1}
            total={state.questions.length}
          />
        </div>
        
        <Question
          question={currentQuestion}
          selectedAnswer={state.selectedAnswer}
          timeRemaining={state.timeRemaining}
          isAnswerSubmitted={state.isAnswerSubmitted}
          onSelectAnswer={selectAnswer}
          onSubmitAnswer={submitAnswer}
          onNextQuestion={nextQuestion}
        />
      </div>
    </div>
  );
};

export default QuizContainer;