// components/QuestionSection.jsx
import React from 'react';
import signImage from '../assets/avatar/gifmaker_me (1).gif';

const QuestionSection = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-12 relative">
        <div className="w-1/2">
          <img src={signImage} alt="Sign" className="w-full h-auto" />
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold mb-8">
        What is the meaning of this sign?
      </h2>
    </div>
  );
};

export default QuestionSection;