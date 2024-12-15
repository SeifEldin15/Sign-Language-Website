// components/ActionButtons.jsx
import React from 'react';

const ActionButtons = ({ selectedAnswer, onCheck, onSkip }) => {
  return (
    <div className='w-full border-t-2 border-gray-700 mt-12'>     
      <div className="flex justify-between items-center max-w-5xl mx-auto py-4">
        <button 
          className="px-8 py-3 rounded-lg border border-gray-600 text-gray-400 transition-colors"
          onClick={onSkip}
        >
          SKIP
        </button>
        <button 
          className={`px-8 py-3 rounded-lg ${
            selectedAnswer 
              ? 'bg-[#1a9de6] text-white'
              : 'bg-gray-700/30 text-gray-700'
          } transition-colors`}
          disabled={!selectedAnswer}
          onClick={onCheck}
        >
          CHECK
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;