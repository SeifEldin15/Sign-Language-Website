// components/QuestionSection.jsx
import React, { useState } from 'react';

const QuestionSection = ({ question, signUrl, signText }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-12 relative">
        <div className="w-1/2 min-h-[200px] flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full h-48 bg-[#293D46] rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">Image not available</div>
                {signText && (
                  <div className="mt-2 text-[#58cc02] font-semibold">
                    {signText}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <img 
              src={signUrl?.startsWith('http') ? signUrl : `/signs/${signUrl}`} 
              alt={signText || "Sign"} 
              className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
        </div>
      </div>
      
      {question && (
        <h2 className="text-white text-2xl font-bold mb-8 text-center">
          {question}
        </h2>
      )}
    </div>
  );
};

export default QuestionSection;