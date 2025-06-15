import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { api, getCategoryIdBySlug } from '../utils/api';
import avatar1 from '../assets/avatar/static_thumbs_up.png';
import avatar2 from '../assets/avatar/static_pointing_fingers.png';
import avatar3 from '../assets/avatar/static_point_up.png';
import avatar4 from '../assets/avatar/static_crossing_hands1.png';
import placeholder1 from "../assets/Group 36852.png";
import placeholder2 from "../assets/Group 36856.png";
import placeholder3 from "../assets/Group.png";
import placeholder4 from "../assets/favourites.png";
import placeholder5 from "../assets/Group 36857.png";
import placeholder6 from "../assets/Group 36858.png";

const Learn = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [lessons, setLessons] = useState([]);

  // Categories for the learn section - matching database categories
  const categories = [
    { id: 1, title: "Basic Signs", image: placeholder1, path: "/learn/basic", number: "01" },
    { id: 2, title: "Numbers", image: placeholder2, path: "/learn/numbers" },
    { id: 3, title: "Colors", image: placeholder3, path: "/learn/colors" },
    { id: 4, title: "Family", image: placeholder4, path: "/learn/family" },
    { id: 5, title: "Food", image: placeholder5, path: "/learn/food" },
  ];

  useEffect(() => {
    // Only fetch levels if we're viewing a specific category
    if (category) {
      const fetchLevels = async () => {
        try {
          // Get the category ID from the mapping
          const categoryId = getCategoryIdBySlug(category);
          if (!categoryId) {
            console.error('Category not found:', category);
            return;
          }

          // Fetch levels filtered by category
          const data = await api.levels.getByCategory(categoryId);
          
          if (data.levels) {
            // Get user progress from localStorage
            const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
            // Use completedLevel instead of currentLevel for unlocking
            const completedLevel = parseInt(savedProgress.completedLevel) || 0;
            
            const formattedLessons = data.levels.map((level, index) => {
              // Extract level number from name
              let levelNumber;
              const matches = level.name.match(/\d+/);
              if (matches && matches[0]) {
                levelNumber = parseInt(matches[0]);
              } else {
                levelNumber = index + 1;
              }
              
              // Level is unlocked if its number is less than or equal to completed level + 1
              const isUnlocked = levelNumber <= (completedLevel + 1);

              // Assign different avatars and colors based on level number
              const avatars = [avatar1, avatar2, avatar3, avatar4];
              const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'];
              
              // Use modulo to cycle through avatars and colors if there are more than 4 levels
              const avatarIndex = (levelNumber - 1) % 4;
              const colorIndex = (levelNumber - 1) % 4;

              return {
                title: `Level ${levelNumber}`,
                color: colors[colorIndex],
                avatar: avatars[avatarIndex],
                locked: !isUnlocked,
                id: level._id,
                levelNumber: levelNumber
              };
            });
            
            // Sort levels by number
            formattedLessons.sort((a, b) => a.levelNumber - b.levelNumber);
            
            setLessons(formattedLessons);
          }
        } catch (error) {
          console.error('Error fetching levels:', error);
        }
      };

      fetchLevels();
    }
  }, [category]);

  const handleLessonClick = (lesson) => {
    if (!lesson.locked) {
      // Only store the level info, questions will be fetched by QuestionPage
      localStorage.setItem('userProgress', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userProgress') || '{}'),
        activeLevel: lesson.levelNumber, // Track which level is being attempted
        questionsCompleted: 0,
        totalQuestions: 0 // Will be updated when questions are fetched
      }));
      
      navigate('/question', { state: { levelId: lesson.id } });
    }
  };

  // If no category is selected, show categories
  if (!category) {
    return (
      <>
        <div className='fixed md:top-0 bottom-0 md:left-0 w-full md:w-auto z-50'>
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-2xl text-white mb-12 text-center">Learning Categories</h1>
            
            <div className="relative">
              {categories.map((category, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div key={category.id} className="relative mb-24 last:mb-0">
                    {/* Dotted connecting line */}
                    {index < categories.length - 1 && (
                      <div className={`absolute top-16 w-96 h-72 pointer-events-none ${
                        isEven ? 'left-1/2 -translate-x-48' : 'left-1/2 -translate-x-48'
                      }`}>
                        <svg className="w-full h-full" viewBox="0 0 384 288">
                          <path
                            d={isEven ? "M 288 0 Q 0 200 96 288" : "M 96 0 Q 384 200 288 288"}
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="8,8"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex justify-center">
                      <div
                        onClick={() => navigate(category.path)}
                        className={`bg-[#293D46] rounded-2xl p-6 cursor-pointer hover:bg-[#3a4a54] transition-colors relative w-96 ${
                          isEven ? 'translate-x-48' : '-translate-x-48'
                        }`}
                      >
                        <div className="flex items-center space-x-6">
                          {/* Number or Icon */}
                          <div className="flex-shrink-0 relative">
                            {category.number ? (
                              <div className="relative">
                                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center">
                                  <span className="text-white text-2xl font-bold">{category.number}</span>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-600 flex items-center justify-center">
                                <img 
                                  src={category.image} 
                                  alt={category.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          
                          {/* Title */}
                          <div className="flex-1">
                            <h3 className="text-white text-xl font-medium">{category.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // If category is selected, show levels for that category
  return (
    <>
      <div className='fixed md:top-0 bottom-0 md:left-0 w-full md:w-auto z-50'>
        <Sidebar />
      </div>
      <div className='w-full min-h-screen bg-[#141F23] p-6 overflow-y-auto pb-24 md:pb-6 md:pl-72'>
        <div className="mb-6">
          <button
            onClick={() => navigate('/learn')}
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Categories
          </button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl text-white text-center">
            {categories.find(cat => cat.path === `/learn/${category}`)?.title || 'Learning Levels'}
          </h1>
        </div>

        <div className='max-w-2xl mx-auto space-y-16 pt-8'>
          {lessons.map((lesson, index) => (
            <div 
              key={index} 
              onClick={() => handleLessonClick(lesson)}
              className={`${lesson.color} rounded-xl p-6 flex items-center relative 
                ${!lesson.locked ? 'cursor-pointer hover:opacity-90' : 'cursor-not-allowed opacity-50'} 
                overflow-visible h-32 transition-opacity`}
            >
              <span className={`text-white text-3xl font-semibold z-10 ${index % 2 === 1 ? 'ml-auto' : ''}`}>
                {lesson.title}
                {lesson.locked && ' 🔒'}
              </span>
              <img 
                src={lesson.avatar} 
                alt="Avatar" 
                className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} -top-20 w-40 h-52 object-cover`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Learn; 