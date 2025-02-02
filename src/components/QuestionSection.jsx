// components/QuestionSection.jsx
import React from 'react';
import signImage from '../assets/avatar/static_point_up.png';

const QuestionSection = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-white text-3xl font-bold text-center mb-8">
        Select the correct meaning
      </h1>
      <div className="flex justify-center mb-12 relative">
        <div className="w-1/2">
          <img src={signImage} alt="Sign" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;