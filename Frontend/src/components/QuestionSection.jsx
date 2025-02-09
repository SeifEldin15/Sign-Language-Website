// components/QuestionSection.jsx
import React from 'react';

const QuestionSection = ({ question, signUrl }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-12 relative">
        <div className="w-1/2">
          <img src={signUrl} alt="Sign" className="w-full h-auto" />
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold mb-8">
          {question}
      </h2>
    </div>
  );
};

export default QuestionSection;