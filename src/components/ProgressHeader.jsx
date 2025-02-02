// components/ProgressHeader.jsx
import React from 'react';

const ProgressHeader = ({ currentQuestion, totalQuestions, showQuestion }) => {
  // Calculate progress percentage
  // If showing the question (Start Answer page), progress is 0
  // Otherwise, calculate based on current question
  const progressPercentage = showQuestion 
    ? 0 
    : (currentQuestion / totalQuestions) * 100;

  return (
    <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
      <div className="flex-1 mx-4">
        <div className="h-5 bg-[#293D46] rounded-full">
          <div 
            className="h-full bg-[#58cc02] rounded-full transition-all duration-300 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute top-1 left-1 right-0 h-[20%] bg-[#76e002]/20 rounded-full w-[95%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;