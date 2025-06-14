// components/QuestionOptions.jsx
import React from 'react';

const QuestionOptions = ({ options, selectedAnswer, setSelectedAnswer }) => {
  // Ensure options is an array and handle empty case
  if (!options || !Array.isArray(options) || options.length === 0) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="text-white text-center py-8">
          No options available for this question
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {options.map((option, index) => (
        <div
          key={option._id || index}
          onClick={() => setSelectedAnswer(option._id)}
          className={`rounded-lg p-3.5 cursor-pointer border-2 flex items-center gap-3.5 transition-all duration-200 ${
            selectedAnswer === option._id
              ? "bg-[#365148] border-[#58cc02] shadow-lg transform scale-[1.02]"
              : "bg-[#293D46] hover:bg-[#365148] border-gray-600 hover:border-[#58cc02] hover:shadow-md"
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all duration-200 ${
            selectedAnswer === option._id
              ? "bg-[#58cc02] border-[#58cc02]"
              : "bg-[#293D46] border-gray-600"
          }`}>
            <span className={`text-base font-semibold ${
              selectedAnswer === option._id
                ? "text-white"
                : "text-gray-300"
            }`}>
              {index + 1}
            </span>
          </div>
          <span className={`text-lg transition-colors duration-200 ${
            selectedAnswer === option._id
              ? "text-[#58cc02] font-medium"
              : "text-white"
          }`}>
            {option.text || `Option ${index + 1}`}
          </span>
          {/* Show score for debugging purposes only in development */}
          {process.env.NODE_ENV === 'development' && option.score !== undefined && (
            <span className="ml-auto text-xs text-gray-400">
              Score: {option.score}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionOptions;