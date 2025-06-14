import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hands from '../assets/Hands.png';
import { api, handleApiError, userSession } from '../utils/api';

const HeroSection = () => {
  const [userProgress, setUserProgress] = useState({
    currentLevel: null,
    questionsCompleted: 0,
    totalQuestions: 0,
    completedLevels: []
  });
  const [levelName, setLevelName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = () => {
    // Get user ID from localStorage
    const userId = userSession.getUserId();
    
    if (userId && userId !== 'null' && userId !== 'undefined') {
      fetchUserProgress(userId);
    } else {
      // Fallback to localStorage if no user ID
      loadFromLocalStorage();
    }
  };

  const fetchUserProgress = async (userId) => {
    try {
      setLoading(true);
      const data = await api.user.getProgress(userId);
      
      if (data.progress) {
        setUserProgress(data.progress);
        console.log('HeroSection - Progress loaded successfully'); // Keep minimal log
        
        // Fetch level name if current level exists
        if (data.progress.currentLevel) {
          fetchLevelName(data.progress.currentLevel._id || data.progress.currentLevel);
        } else {
          setLevelName("Ready to Start");
        }
      } else {
        console.log('HeroSection - No progress data, using localStorage fallback');
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('HeroSection - Error fetching progress:', error);
      setError(handleApiError(error, 'Failed to load progress'));
      // Fallback to localStorage
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const savedProgress = localStorage.getItem('userProgress');
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress({
        currentLevel: progress.currentLevel,
        questionsCompleted: progress.questionsCompleted || 0,
        totalQuestions: progress.totalQuestions || 0,
        completedLevels: []
      });
      
      if (progress.currentLevel) {
        fetchLevelName(progress.currentLevel);
      }
    }
    setLoading(false);
  };

  // Add a refresh function that can be called when returning from practice
  const refreshProgress = () => {
    loadUserProgress();
  };

  // Expose refresh function globally so other components can call it
  useEffect(() => {
    window.refreshHeroProgress = refreshProgress;
    return () => {
      delete window.refreshHeroProgress;
    };
  }, []);

  const fetchLevelName = async (levelId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/levels/${levelId}`);
      const data = await response.json();
      // Extract level number from name (assuming format "Welcome1", "Welcome2", etc.)
      const levelNumber = data.name?.match(/\d+/)?.[0];
      setLevelName(levelNumber ? `Level ${levelNumber}` : data.name || "Level");
    } catch (error) {
      console.error('Error fetching level name:', error);
      setLevelName("Level"); // Fallback
    }
  };

  const handleResumePractice = () => {
    const levelId = userProgress.currentLevel?._id || userProgress.currentLevel;
    if (levelId) {
      navigate('/question', { 
        state: { levelId } 
      });
    } else {
      // Navigate to level selection if no current level
      navigate('/learn');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 sm:py-12 lg:py-16 flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Welcome Back to Your Practice
          </h1>
          <div className="space-y-4 mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl text-gray-300">
              Continue your sign language journey from where you left off
            </p>
            <div className="bg-[#293D46] p-4 rounded-lg w-full lg:max-w-lg">
              <h3 className="text-lg font-semibold text-[#4ADE80] mb-2">Your Progress</h3>
              {userProgress.currentLevel && (
                <p className="text-gray-300">Current Level: {levelName}</p>
              )}
              <p className="text-gray-300">
                Questions Completed: {userProgress.questionsCompleted}/{userProgress.totalQuestions}
              </p>
              {userProgress.completedLevels?.length > 0 && (
                <p className="text-gray-300">
                  Levels Completed: {userProgress.completedLevels.length}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Next up in your learning path:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Advanced Greetings & Expressions</li>
                <li>Common Workplace Phrases</li>
                <li>Daily Conversation Practice</li>
              </ul>
            </div>
          </div>
          <div className="space-x-4">
            <button 
              onClick={handleResumePractice}
              className="bg-[#4ADE80] text-black px-6 sm:px-8 py-3 rounded-lg hover:bg-[#3FCF76] transition-colors font-medium w-full sm:w-auto"
            >
              {userProgress.currentLevel ? 'Resume Practice' : 'Start Learning'}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#293D46] rounded-lg h-64 sm:h-80 lg:h-80 relative flex items-center order-first lg:order-last">
          <div className="absolute left-4 sm:left-8 z-10 max-w-[60%] sm:max-w-[45%]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
              Ready for Today's Practice?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300">
              Your daily progress keeps you on track to fluency
            </p>
            <div className="mt-4 space-y-2 text-gray-300">
             
            </div>
          </div>
          <img 
            src={Hands} 
            alt="Sign language practice illustration"
            className="absolute top-[-15px] sm:top-[-50px] right-0 h-[105%] object-cover rounded-r-lg lg:scale-[1.2] md:scale-[1.1] sm:scale-[1.05] scale-[1.0]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 