// components/TotalPoints.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TotalPoints = ({ totalPoints, totalQuestions }) => {
  const navigate = useNavigate();
  
  // Calculate percentage
  const percentage = totalQuestions > 0 ? Math.round((totalPoints / totalQuestions) * 100) : 0;
  
  // Determine performance level
  const getPerformanceMessage = () => {
    if (totalPoints >= 10) {
      return "Perfect score! Outstanding work! 🎉";
    } else if (totalPoints >= 8) {
      return "Excellent work! You're doing great! 👏";
    } else if (totalPoints >= 6) {
      return "Good job! Keep practicing to improve! 💪";
    } else if (totalPoints >= 4) {
      return "Not bad! More practice will help you improve! 📚";
    } else {
      return "Keep trying! Practice makes perfect! 🎯";
    }
  };

  const getScoreColor = () => {
    if (totalPoints >= 8) return "text-green-400";
    if (totalPoints >= 6) return "text-yellow-400";
    if (totalPoints >= 4) return "text-orange-400";
    return "text-red-400";
  };

  const handleContinue = () => {
    // Update user progress
    const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    // Save quiz results
    const quizResults = {
      ...savedProgress,
      lastQuizScore: totalPoints,
      lastCompletedAt: new Date().toISOString()
    };
    
    localStorage.setItem('userProgress', JSON.stringify(quizResults));
    
    // Navigate back to learn page
    navigate('/learn');
  };

  const handleRetry = () => {
    // Refresh the page to restart the quiz
    window.location.reload();
  };

  useEffect(() => {
    // Optional: You could send results to backend here
    // Example: saveQuizResults(totalPoints, totalQuestions);
  }, [totalPoints, totalQuestions]);

  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-6xl mb-4">
          {totalPoints >= 10 ? "🏆" : totalPoints >= 8 ? "🌟" : totalPoints >= 6 ? "👍" : "💪"}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
      </div>
      
      <div className="bg-[#293D46] rounded-lg p-8 shadow-lg">
        <div className="mb-6">
          <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
            {totalPoints} Points
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 text-lg">
          {getPerformanceMessage()}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-[#58cc02] text-white px-6 py-3 rounded-lg hover:bg-[#4fb502] transition-colors font-medium text-lg"
          >
            Continue Learning
          </button>
          
          {totalPoints < 8 && (
            <button
              onClick={handleRetry}
              className="w-full bg-[#293D46] text-white px-6 py-3 rounded-lg hover:bg-[#365148] transition-colors border border-gray-600 hover:border-[#58cc02]"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalPoints;