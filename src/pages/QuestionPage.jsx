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
import Sidebar from '../components/Sidebar';

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
        { id: 1, text: 'Hello how are you' },
        { id: 2, text: 'Guess the correct answer' },
        { id: 3, text: 'What’s your name' },
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
    <>
    <div className='fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50'>
      <Sidebar />
    </div>

    <div className="min-h-screen bg-[#141F23] pt-12 md:ml-64 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8">
      <ProgressHeader 
        lives={lives} 
        currentQuestion={currentQuestionIndex + 1} 
        totalQuestions={questions.length}
        showQuestion={showQuestion}
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

      <div className="text-center max-w-7xl mx-auto">
        {isQuizComplete ? (
          <TotalPoints 
            totalPoints={totalPoints}
            totalQuestions={questions.length}
          />
        ) : (
          <>
            <QuestionSection question={currentQuestion?.question} />
            
            <div className="mt-4 w-full max-w-2xl mx-auto">
              {showQuestion ? (
                <div className={`transition-opacity duration-300 ${showQuestion ? 'opacity-100' : 'opacity-0'} px-4`}>
                  <p className="text-white mb-7 text-sm sm:text-base">
                    This is a sign that means something, just some placeholder text to fill this area and show this website 
                  </p>  
                  <p className="text-white mb-14 text-sm sm:text-base">
                    when you click the button you will be prompted with questions about this sign  
                  </p>  
                  <button 
                    onClick={handleStartAnswer}
                    className="bg-[#58cc02] text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">
                    Start Answering
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
    </>
  );
};

export default QuestionPage;