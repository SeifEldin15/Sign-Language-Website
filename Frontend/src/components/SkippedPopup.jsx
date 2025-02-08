// components/SkippedPopup.jsx
import React from 'react';

const SkippedPopup = ({ onContinue, correctAnswer, isLastQuestion }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#293D46] rounded-lg p-8 shadow-xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#4d4d2c] mb-4">
            <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl leading-6 font-medium text-white mb-2">Question Skipped</h3>
          <p className="text-sm text-gray-300 mb-4">
            The correct answer was: {correctAnswer}
          </p>
          <button
            onClick={onContinue}
            className="w-full inline-flex justify-center rounded-lg px-8 py-3 bg-[#58cc02] text-white hover:bg-[#4caf02] transition-colors"
          >
            {isLastQuestion ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkippedPopup;