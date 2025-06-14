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
import { useLocation, useNavigate } from 'react-router-dom';
import { api, handleApiError } from '../utils/api';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { levelId } = location.state || {};
    const userId = localStorage.getItem('userId');

    if (!levelId) {
      setError('No level selected');
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await api.questions.getByLevel(levelId);
        
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          
          // Update user progress when starting a level (if user is logged in)
          if (userId) {
            try {
              const progressData = {
                currentLevel: levelId,
                totalQuestions: data.questions.length
              };
              console.log('QuestionPage - Sending progress data:', progressData); // Debug log
              console.log('QuestionPage - Level ID:', levelId); // Debug log
              console.log('QuestionPage - Total questions:', data.questions.length); // Debug log
              
              const result = await api.user.updateProgress(userId, progressData);
              console.log('QuestionPage - Progress update result:', result); // Debug log
            } catch (progressError) {
              console.warn('Could not update progress:', progressError);
              // Continue with localStorage fallback
              updateLocalStorageProgress(levelId, data.questions.length);
            }
          } else {
            // Fallback to localStorage
            updateLocalStorageProgress(levelId, data.questions.length);
          }
        } else {
          setError('No questions found for this level');
        }
      } catch (error) {
        setError(handleApiError(error, 'Failed to load questions. Please try again.'));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [location.state]);

  const updateLocalStorageProgress = (levelId, totalQuestions) => {
    const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    localStorage.setItem('userProgress', JSON.stringify({
      ...savedProgress,
      currentLevel: levelId,
      questionsCompleted: 0,
      totalQuestions: totalQuestions,
      correctAnswers: 0
    }));
  };

  const handleCompleteLevel = async () => {
    const userId = localStorage.getItem('userId');
    console.log('QuestionPage - Completing level for user:', userId); // Debug log
    
    if (userId && userId !== 'null' && userId !== 'undefined') {
      try {
        console.log('QuestionPage - Calling completeLevel API'); // Debug log
        const result = await api.user.completeLevel(userId);
        console.log('QuestionPage - Level completion result:', result); // Debug log
      } catch (error) {
        console.warn('Could not update level completion:', error);
        // Fallback to localStorage
        handleLocalStorageCompletion();
      }
    } else {
      console.log('QuestionPage - No user ID, using localStorage'); // Debug log
      handleLocalStorageCompletion();
    }
    
    // Refresh hero progress before navigating
    if (window.refreshHeroProgress) {
      console.log('QuestionPage - Refreshing hero progress'); // Debug log
      window.refreshHeroProgress();
    }
    
    navigate('/learn');
  };

  const handleLocalStorageCompletion = () => {
    const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const completedLevelNumber = parseInt(savedProgress.currentLevel) || 1;
    
    localStorage.setItem('userProgress', JSON.stringify({
      ...savedProgress,
      completedLevel: completedLevelNumber,
      questionsCompleted: 0,
      totalQuestions: 0
    }));
  };

  const updateQuestionProgress = async () => {
    const userId = localStorage.getItem('userId');
    console.log('QuestionPage - Updating question progress. User ID:', userId); // Debug log
    
    if (userId && userId !== 'null' && userId !== 'undefined') {
      try {
        console.log('QuestionPage - Calling updateQuestionProgress API'); // Debug log
        const result = await api.user.updateQuestionProgress(userId);
        console.log('QuestionPage - Question progress result:', result); // Debug log
      } catch (error) {
        console.warn('Could not update question progress:', error);
      }
    } else {
      console.log('QuestionPage - No user ID for progress update'); // Debug log
    }
    
    // Always increment local points for display
    setTotalPoints(prevPoints => prevPoints + 1);
  };

  const handleCheck = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Find the correct option (the one with the highest score, typically 10)
    const correctOption = currentQuestion?.options.find(option => option.score === 10);
    
    console.log('QuestionPage - handleCheck Debug:');
    console.log('- Current question:', currentQuestion?.question);
    console.log('- Selected answer ID:', selectedAnswer);
    console.log('- Correct option:', correctOption);
    console.log('- Correct option ID:', correctOption?._id);
    console.log('- All options:', currentQuestion?.options?.map(opt => ({ id: opt._id, text: opt.text, score: opt.score })));
    
    const isCorrect = selectedAnswer === correctOption?._id;
    console.log('- Is answer correct?', isCorrect);
    
    // Update progress in backend
    await updateQuestionProgress();
    
    if (isCorrect) {
      setShowCorrectPopup(true);
      
      // Check if this was the last question
      if (currentQuestionIndex === questions.length - 1) {
        // Level completed - show completion message and update progress
        setTimeout(() => {
          handleCompleteLevel();
        }, 1500); // Wait for correct answer animation
      } else {
        // Move to next question
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowCorrectPopup(false);
          setShowQuestion(true); // Reset to show question description
        }, 1500);
      }
    } else {
      setShowIncorrectPopup(true);
      setLives(prevLives => prevLives - 1);
      
      // Check if lives are exhausted
      if (lives <= 1) {
        setTimeout(() => {
          navigate('/learn'); // Navigate back to learn page when lives run out
        }, 2000);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowCorrectPopup(false);
      setShowQuestion(true); // Reset to show question description
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
      setShowQuestion(true); // Reset to show question description
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleSkip = () => {
    setShowSkippedPopup(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <>
        <div className='fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50'>
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] pt-12 md:ml-64 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading questions...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className='fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50'>
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] pt-12 md:ml-64 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button 
              onClick={() => navigate('/learn')}
              className="bg-[#58cc02] text-white px-6 py-3 rounded-lg hover:bg-[#4fb502] transition-colors"
            >
              Back to Learn
            </button>
          </div>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <div className='fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50'>
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] pt-12 md:ml-64 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-xl mb-4">No questions available for this level</div>
            <button 
              onClick={() => navigate('/learn')}
              className="bg-[#58cc02] text-white px-6 py-3 rounded-lg hover:bg-[#4fb502] transition-colors"
            >
              Back to Learn
            </button>
          </div>
        </div>
      </>
    );
  }

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
          correctAnswer={currentQuestion?.sign_Text}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}

      {showSkippedPopup && !isQuizComplete && (
        <SkippedPopup 
          onContinue={handleContinue}
          correctAnswer={currentQuestion?.sign_Text}
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
            <QuestionSection 
              question={currentQuestion?.question} 
              signUrl={currentQuestion?.sign_Url}
              signText={currentQuestion?.sign_Text}
            />
            
            <div className="mt-4 w-full max-w-2xl mx-auto">
              {showQuestion ? (
                <div className={`transition-opacity duration-300 ${showQuestion ? 'opacity-100' : 'opacity-0'} px-4`}>
                  <p className="text-white mb-7 text-sm sm:text-base">
                    Study this sign carefully. When you're ready, click the button below to answer questions about it.
                  </p>  
                  <p className="text-white mb-14 text-sm sm:text-base">
                    The sign above means: <span className="font-bold text-[#58cc02]">{currentQuestion?.sign_Text}</span>
                  </p>  
                  <button 
                    onClick={handleStartAnswer}
                    className="bg-[#58cc02] text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-[#4fb502] transition-colors">
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