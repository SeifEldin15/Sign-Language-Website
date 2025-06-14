import { useState, useCallback } from 'react';

const useQuizState = (initialQuestions = []) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lives, setLives] = useState(5);
  const [mistakes, setMistakes] = useState([]);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Check if quiz is complete
  const isQuizComplete = currentQuestionIndex >= questions.length;
  
  // Check if current question is the last one
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Get correct answer for current question
  const getCorrectOption = useCallback(() => {
    if (!currentQuestion?.options) return null;
    return currentQuestion.options.find(option => option.score === 10);
  }, [currentQuestion]);

  // Check if selected answer is correct
  const isAnswerCorrect = useCallback(() => {
    const correctOption = getCorrectOption();
    return selectedAnswer === correctOption?._id;
  }, [selectedAnswer, getCorrectOption]);

  // Handle answer submission
  const submitAnswer = useCallback(() => {
    if (!selectedAnswer || !currentQuestion) return null;

    const correct = isAnswerCorrect();
    
    if (correct) {
      setTotalPoints(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      // Track the mistake
      setMistakes(prev => [...prev, {
        questionId: currentQuestion._id,
        questionText: currentQuestion.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: getCorrectOption()?._id,
        timestamp: new Date().toISOString()
      }]);
    }

    return {
      correct,
      correctOption: getCorrectOption(),
      isLastQuestion,
      livesRemaining: correct ? lives : lives - 1
    };
  }, [selectedAnswer, currentQuestion, isAnswerCorrect, getCorrectOption, lives, isLastQuestion]);

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  }, [currentQuestionIndex, questions.length]);

  // Reset quiz state
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setTotalPoints(0);
    setLives(5);
    setMistakes([]);
  }, []);

  // Skip current question
  const skipQuestion = useCallback(() => {
    setMistakes(prev => [...prev, {
      questionId: currentQuestion?._id,
      questionText: currentQuestion?.question,
      selectedAnswer: null,
      correctAnswer: getCorrectOption()?._id,
      skipped: true,
      timestamp: new Date().toISOString()
    }]);
    
    nextQuestion();
  }, [currentQuestion, getCorrectOption, nextQuestion]);

  // Calculate quiz statistics
  const getQuizStats = useCallback(() => {
    const percentage = questions.length > 0 ? Math.round((totalPoints / questions.length) * 100) : 0;
    const correctAnswers = totalPoints;
    const incorrectAnswers = mistakes.filter(m => !m.skipped).length;
    const skippedQuestions = mistakes.filter(m => m.skipped).length;
    
    return {
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      skippedQuestions,
      percentage,
      livesLost: 5 - lives,
      mistakes
    };
  }, [questions.length, totalPoints, mistakes, lives]);

  return {
    // State
    questions,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    totalPoints,
    lives,
    mistakes,
    
    // Computed values
    isQuizComplete,
    isLastQuestion,
    
    // Actions
    setQuestions,
    setSelectedAnswer,
    submitAnswer,
    nextQuestion,
    skipQuestion,
    resetQuiz,
    
    // Utilities
    getCorrectOption,
    isAnswerCorrect,
    getQuizStats
  };
};

export default useQuizState; 