import React, { useState } from 'react';

const DragDropOptions = ({ options, selectedAnswers, setSelectedAnswers, signText }) => {
  const [draggedItem, setDraggedItem] = useState(null);

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

  const handleDragStart = (e, option) => {
    setDraggedItem(option);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropZone) => {
    e.preventDefault();
    if (draggedItem) {
      const newSelectedAnswers = { ...selectedAnswers };
      
      // Remove the item from any previous position
      Object.keys(newSelectedAnswers).forEach(key => {
        if (newSelectedAnswers[key] === draggedItem._id) {
          delete newSelectedAnswers[key];
        }
      });
      
      // Add to new position
      newSelectedAnswers[dropZone] = draggedItem._id;
      setSelectedAnswers(newSelectedAnswers);
      setDraggedItem(null);
    }
  };

  const removeFromDropZone = (dropZone) => {
    const newSelectedAnswers = { ...selectedAnswers };
    delete newSelectedAnswers[dropZone];
    setSelectedAnswers(newSelectedAnswers);
  };

  // Split the sign text to create drop zones
  const signWords = signText ? signText.split(',').map(word => word.trim()) : ['Word 1', 'Word 2'];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Instructions */}
      <div className="text-white text-center mb-6">
        <p className="text-lg mb-2">Drag the correct words to match the sign meaning</p>
        <p className="text-sm text-gray-300">The sign shows: {signWords.join(' and ')}</p>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {signWords.map((word, index) => {
          const dropZone = `zone_${index}`;
          const droppedOptionId = selectedAnswers[dropZone];
          const droppedOption = options.find(opt => opt._id === droppedOptionId);
          
          return (
            <div
              key={dropZone}
              className={`min-h-[80px] border-2 border-dashed rounded-lg p-4 flex items-center justify-center transition-all duration-200 ${
                droppedOption 
                  ? 'border-[#58cc02] bg-[#365148]' 
                  : 'border-gray-500 bg-[#293D46] hover:border-[#58cc02]'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, dropZone)}
            >
              {droppedOption ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#58cc02] font-medium">{droppedOption.text}</span>
                  <button
                    onClick={() => removeFromDropZone(dropZone)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span className="text-gray-400 text-center">
                  Drop option here<br/>
                  <span className="text-xs">({word})</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Draggable Options */}
      <div className="space-y-3">
        <h3 className="text-white text-lg font-medium text-center mb-4">Available Options</h3>
        {options.map((option, index) => {
          const isUsed = Object.values(selectedAnswers).includes(option._id);
          
          return (
            <div
              key={option._id || index}
              draggable={!isUsed}
              onDragStart={(e) => handleDragStart(e, option)}
              className={`rounded-lg p-3.5 border-2 flex items-center gap-3.5 transition-all duration-200 cursor-move ${
                isUsed
                  ? "bg-gray-600 border-gray-500 opacity-50 cursor-not-allowed"
                  : "bg-[#293D46] hover:bg-[#365148] border-gray-600 hover:border-[#58cc02] hover:shadow-md"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all duration-200 ${
                isUsed
                  ? "bg-gray-600 border-gray-500"
                  : "bg-[#293D46] border-gray-600"
              }`}>
                <span className={`text-base font-semibold ${
                  isUsed ? "text-gray-400" : "text-gray-300"
                }`}>
                  {index + 1}
                </span>
              </div>
              <span className={`text-lg transition-colors duration-200 ${
                isUsed ? "text-gray-400" : "text-white"
              }`}>
                {option.text || `Option ${index + 1}`}
              </span>
              {!isUsed && (
                <span className="ml-auto text-xs text-gray-400">
                  Drag me →
                </span>
              )}
              {/* Show score for debugging purposes only in development */}
              {process.env.NODE_ENV === 'development' && option.score !== undefined && (
                <span className="ml-auto text-xs text-gray-400">
                  Score: {option.score}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragDropOptions; 