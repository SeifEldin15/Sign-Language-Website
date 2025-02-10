import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hands from '../assets/Hands.png';

const HeroSection = () => {
  const [userProgress, setUserProgress] = useState({
    currentLevel: 1,
    questionsCompleted: 0,
    totalQuestions: 0
  });
  const [levelName, setLevelName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
      // Fetch level name based on currentLevel ID
      fetchLevelName(JSON.parse(savedProgress).currentLevel);
    }
  }, []);

  const fetchLevelName = async (levelId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/levels/${levelId}`);
      const data = await response.json();
      // Extract level number from name (assuming format "Welcome1", "Welcome2", etc.)
      const levelNumber = data.name.match(/\d+/)[0];
      setLevelName(`Level ${levelNumber}`);
    } catch (error) {
      console.error('Error fetching level name:', error);
      setLevelName("Level 1"); // Fallback
    }
  };

  const handleResumePractice = () => {
    navigate('/question', { 
      state: { levelId: userProgress.currentLevel } 
    });
  };

  return (
    <div className="container mx-auto py-16">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-6">Welcome Back to Your Practice</h1>
          <div className="space-y-4 mb-8">
            <p className="text-xl text-gray-300">
              Continue your sign language journey from where you left off
            </p>
            <div className="bg-[#293D46] p-4 rounded-lg max-w-lg">
              <h3 className="text-lg font-semibold text-[#4ADE80] mb-2">Your Progress</h3>
              {/* <p className="text-gray-300">Current Level: {levelName}</p> */}
              <p className="text-gray-300">
                Questions Completed: {userProgress.questionsCompleted}/{userProgress.totalQuestions}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Next up in your learning path:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Advanced Greetings & Expressions</li>
                <li>Common Workplace Phrases</li>
                <li>Daily Conversation Practice</li>
              </ul>
            </div>
          </div>
          <div className="space-x-4">
            <button 
              onClick={handleResumePractice}
              className="bg-[#4ADE80] text-black px-8 py-3 rounded-lg hover:bg-[#3FCF76] transition-colors font-medium"
            >
              Resume Practice
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-[#293D46] rounded-lg h-80 relative flex items-center">
          <div className="absolute left-8 z-10 max-w-[45%]">
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Today's Practice?</h2>
            <p className="text-xl text-gray-300">Your daily progress keeps you on track to fluency</p>
            <div className="mt-4 space-y-2 text-gray-300">
             
            </div>
          </div>
          <img 
            src={Hands} 
            alt="Sign language practice illustration"
            className="absolute top-[-20px] right-0 h-[105%] object-cover rounded-r-lg"
          />
          <div className="absolute right-8 top-8">
            <div className="w-3 h-3 bg-[#4ADE80] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 