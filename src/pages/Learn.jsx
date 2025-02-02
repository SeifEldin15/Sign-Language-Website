import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import avatar1 from '../assets/avatar/static_thumbs_up.png';
import avatar2 from '../assets/avatar/static_pointing_fingers.png';
import avatar3 from '../assets/avatar/static_point_up.png';
import avatar4 from '../assets/avatar/static_crossing_hands1.png';

const Learn = () => {
  const navigate = useNavigate();
  
  const lessons = [
    { title: 'Welcome1', color: 'bg-green-500', avatar: avatar1 },
    { title: 'Welcome2', color: 'bg-purple-500', avatar: avatar2 },
    { title: 'Basic Greeting', color: 'bg-blue-500', avatar: avatar3 },
    { title: 'Personal Pronouns', color: 'bg-yellow-500', avatar: avatar4 },
  ];

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
              onClick={() => navigate('/question')}
              className={`${lesson.color} rounded-xl p-6 flex items-center relative cursor-pointer overflow-visible h-32 hover:opacity-90 transition-opacity`}
            >
              <span className={`text-white text-3xl font-semibold z-10 ${index % 2 === 1 ? 'ml-auto' : ''}`}>
                {lesson.title}
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