// components/TotalPoints.jsx
import React from 'react';

const TotalPoints = ({ totalPoints, totalQuestions }) => {
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
      <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
        <p className="text-2xl text-white mb-4">
          Your Score: {totalPoints} / {totalQuestions}
        </p>
        <p className="text-gray-300 mb-6">
          {totalPoints === totalQuestions 
            ? "Perfect score! Amazing job!" 
            : "Great effort! Keep practicing to improve your score."}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-[#1a9de6] text-white px-8 py-3 rounded-lg hover:bg-[#1a8dd0] transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default TotalPoints;