// components/QuestionOptions.jsx
import React from 'react';

const QuestionOptions = ({ options, selectedAnswer, setSelectedAnswer }) => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => setSelectedAnswer(option.id)}
          className={`rounded-lg p-3.5 cursor-pointer border-2 flex items-center gap-3.5 ${
            selectedAnswer === option.id
              ? "bg-[#293D46] border-[#365148]"
              : "bg-[#293D46] hover:bg-gray-700 border-gray-600 hover:border-[#365148]"
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 ${
            selectedAnswer === option.id
              ? "bg-[#293D46] border-[#365148]"
              : "bg-[#293D46] border-gray-600"
          }`}>
            <span className={`text-base font-semibold ${
              selectedAnswer === option.id
                ? "text-[#58cc02]"
                : "text-white"
            }`}>{option.id}</span>
          </div>
          <span className={`text-lg ${
            selectedAnswer === option.id
              ? "text-[#58cc02]"
              : "text-white"
          }`}>
            {option.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuestionOptions;