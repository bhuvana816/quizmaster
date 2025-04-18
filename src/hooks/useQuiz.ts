import { useState, useEffect, useCallback } from 'react';
import { QuizState, QuizQuestion, HighScore } from '../types/quiz';
import { quizQuestions } from '../data/quizData';

const TIMER_SECONDS = 15;

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({
    questions: quizQuestions,
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    quizCompleted: false,
    timeRemaining: TIMER_SECONDS,
    isAnswerSubmitted: false,
  });

  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Load high scores from local storage
  useEffect(() => {
    const savedScores = localStorage.getItem('quizHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  // Save high scores to local storage
  useEffect(() => {
    if (highScores.length > 0) {
      localStorage.setItem('quizHighScores', JSON.stringify(highScores));
    }
  }, [highScores]);

  // Timer effect
  useEffect(() => {
    if (!state.isAnswerSubmitted && !state.quizCompleted) {
      const newTimer = setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 1) {
            clearInterval(newTimer);
            return {
              ...prev,
              timeRemaining: 0,
              isAnswerSubmitted: true,
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);
      
      setTimer(newTimer);
      
      return () => {
        if (newTimer) clearInterval(newTimer);
      };
    }
  }, [state.currentQuestionIndex, state.isAnswerSubmitted]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
    }));
  }, []);

  const submitAnswer = useCallback(() => {
    if (timer) clearInterval(timer);
    
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;
    
    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      isAnswerSubmitted: true,
    }));
  }, [state.currentQuestionIndex, state.questions, state.selectedAnswer, timer]);

  const nextQuestion = useCallback(() => {
    const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
    
    if (isLastQuestion) {
      // Save score to high scores
      const newHighScore: HighScore = {
        score: state.score,
        date: new Date().toISOString(),
        totalQuestions: state.questions.length,
      };
      
      setHighScores(prev => [...prev, newHighScore].sort((a, b) => b.score - a.score).slice(0, 5));
      
      setState(prev => ({
        ...prev,
        quizCompleted: true,
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        timeRemaining: TIMER_SECONDS,
        isAnswerSubmitted: false,
      }));
    }
  }, [state.currentQuestionIndex, state.questions.length, state.score]);

  const restartQuiz = useCallback(() => {
    setState({
      questions: quizQuestions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      quizCompleted: false,
      timeRemaining: TIMER_SECONDS,
      isAnswerSubmitted: false,
    });
  }, []);

  const currentQuestion: QuizQuestion | undefined = 
    state.questions[state.currentQuestionIndex];

  return {
    state,
    currentQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    highScores,
  };
};