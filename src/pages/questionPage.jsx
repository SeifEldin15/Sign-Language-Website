// pages/questionPage.jsx
import React, { useState, useEffect } from 'react';
import ProgressHeader from '../components/ProgressHeader';
import QuestionSection from '../components/QuestionSection';
import QuestionOptions from '../components/QuestionOptions';
import ActionButtons from '../components/ActionButtons';
import TotalPoints from '../components/TotalPoints';
import CorrectPopup from '../components/CorrectPopup';
import IncorrectPopup from '../components/IncorrectPopup';
import SkippedPopup from '../components/SkippedPopup';

const QuestionPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lives, setLives] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showIncorrectPopup, setShowIncorrectPopup] = useState(false);
  const [showSkippedPopup, setShowSkippedPopup] = useState(false);

  const mockQuestions = [
    {
      id: 1,
      question: "What does this sign mean?",
      options: [
        { id: 1, text: 'correct' },
        { id: 2, text: 'incorrect' },
        { id: 3, text: 'also incorrect' },
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Translate this sign",
      options: [
        { id: 1, text: 'incorrect' },
        { id: 2, text: 'correct' },
        { id: 3, text: 'also incorrect' },
      ],
      correctAnswer: 2
    },
  ];

  useEffect(() => {
    setQuestions(mockQuestions);
  }, []);

  const handleCheck = () => {
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setShowCorrectPopup(true);
      setTotalPoints(prevPoints => prevPoints + 1);
    } else {
      setShowIncorrectPopup(true);
      setLives(prevLives => prevLives - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowCorrectPopup(false);
      setShowQuestion(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleStartAnswer = () => {
    setShowQuestion(false);
  };

  const handleContinue = () => {
    setShowIncorrectPopup(false);
    setShowSkippedPopup(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowQuestion(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleSkip = () => {
    setShowSkippedPopup(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 pt-12">
      <ProgressHeader 
        lives={lives} 
        currentQuestion={currentQuestionIndex + 1} 
        totalQuestions={questions.length} 
      />
      
      {showCorrectPopup && !isQuizComplete && (
        <CorrectPopup 
          onNext={handleNext}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}

      {showIncorrectPopup && !isQuizComplete && (
        <IncorrectPopup 
          onContinue={handleContinue}
          correctAnswer={currentQuestion?.options.find(option => 
            option.id === currentQuestion.correctAnswer)?.text}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}

      {showSkippedPopup && !isQuizComplete && (
        <SkippedPopup 
          onContinue={handleContinue}
          correctAnswer={currentQuestion?.options.find(option => 
            option.id === currentQuestion.correctAnswer)?.text}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}

      <div className="text-center">
        {isQuizComplete ? (
          <TotalPoints 
            totalPoints={totalPoints}
            totalQuestions={questions.length}
          />
        ) : (
          <>
            <QuestionSection question={currentQuestion?.question} />
            
            <div className="mt-4">
              {showQuestion ? (
                <div className={`transition-opacity duration-300 ${showQuestion ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-white mb-7 max-w-2xl mx-auto">
                    This is a sign that means something, just some placeholder text to fill this area and show this website 
                  </p>  
                  <p className="text-white mb-14 max-w-2xl mx-auto">
                    when you click the button you will be prompted with questions about this sign  
                  </p>  
                  <button 
                    onClick={handleStartAnswer}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                    Start Answer
                  </button>
                </div>
              ) : (
                <div className={`transition-opacity duration-300 ${!showQuestion ? 'opacity-100' : 'opacity-0'}`}>
                  <QuestionOptions 
                    options={currentQuestion?.options || []}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                  />
                  <ActionButtons 
                    selectedAnswer={selectedAnswer}
                    onCheck={handleCheck}
                    onSkip={handleSkip}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;