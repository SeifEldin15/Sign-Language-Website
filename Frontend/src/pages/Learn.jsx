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
        console.log('Raw Response:', text);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = JSON.parse(text);
          if (data.levels) {
            const formattedLessons = data.levels.map(level => ({
              title: level.name,
              color: 'bg-blue-500',
              avatar: avatar3,
              locked: false,
              id: level.id
            }));
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