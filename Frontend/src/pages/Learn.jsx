import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import avatar1 from '../assets/avatar/static_thumbs_up.png';
import avatar2 from '../assets/avatar/static_pointing_fingers.png';
import avatar3 from '../assets/avatar/static_point_up.png';
import avatar4 from '../assets/avatar/static_crossing_hands1.png';



const Learn = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/level/');
        const text = await response.text();
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = JSON.parse(text);
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
        } else {
          throw new Error('Received non-JSON response');
        }
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/question');
        const data = await response.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchLevels();
    fetchQuestions();
  }, []);

  const handleLessonClick = (lesson) => {
    if (!lesson.locked) {
      // Only store the current questions and level ID, don't update currentLevel
      localStorage.setItem('userProgress', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userProgress') || '{}'),
        activeLevel: lesson.levelNumber, // Track which level is being attempted
        questionsCompleted: 0,
        totalQuestions: questions.length
      }));
      
      navigate('/question', { state: { questions, levelId: lesson.id } });
    }
  };

  return (
    <>
      <div className='fixed md:top-0 bottom-0 md:left-0 w-full md:w-auto z-50'>
        <Sidebar />
      </div>
      <div className='w-full min-h-screen bg-[#141F23] p-6 overflow-y-auto pb-24 md:pb-6 md:pl-72'>
        <div className='max-w-2xl mx-auto space-y-16 pt-24'>
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