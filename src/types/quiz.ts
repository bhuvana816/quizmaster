export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  quizCompleted: boolean;
  timeRemaining: number;
  isAnswerSubmitted: boolean;
}

export interface HighScore {
  score: number;
  date: string;
  totalQuestions: number;
}