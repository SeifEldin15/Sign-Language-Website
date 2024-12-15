// components/ProgressHeader.jsx
import React from 'react';

const ProgressHeader = ({ lives }) => {
  return (
    <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
      <button className="text-gray-500 hover:text-white mx-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex-1 mx-4">
        <div className="h-5 bg-gray-700/30 rounded-full">
          <div className="h-full w-1/4 bg-[#1a9de6] rounded-full transition-all duration-300 relative">
            <div className="absolute top-1 left-1 right-0 h-[20%] bg-[#4ac6ff]/20 rounded-full w-[95%]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-red-500 text-2xl">❤️</span>
        <span className="text-red-500 ml-2">{lives}</span>
      </div>
    </div>
  );
};

export default ProgressHeader;