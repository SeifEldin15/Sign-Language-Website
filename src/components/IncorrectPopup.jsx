// components/IncorrectPopup.jsx
import React from 'react';

const IncorrectPopup = ({ onContinue, correctAnswer, isLastQuestion }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl leading-6 font-medium text-white mb-2">Incorrect</h3>
          <p className="text-sm text-gray-300 mb-4">
            That wasn't the right answer. The correct answer was: {correctAnswer}
          </p>
          <button
            onClick={onContinue}
            className="w-full inline-flex justify-center rounded-lg px-8 py-3 bg-[#1a9de6] text-white hover:bg-[#1a8dd0] transition-colors"
          >
            {isLastQuestion ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncorrectPopup;