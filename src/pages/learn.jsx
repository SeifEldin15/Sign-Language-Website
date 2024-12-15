import React from 'react';
import Sidebar from '../components/Sidebar';
import LessonCard from '../components/LessonCard';
import RightSideBar from '../components/RightSideBar';
import LessonInfoCard from '../components/LessonInfoCard';

const Learn = () => {
  function LessonList() {
    const lessons = [
      {
        level: "A1",
        title: "Newcomer I (A1.1)",
        units: "14",
        description: "Learn how to introduce yourself and answer simple questions about your basic needs.",
        isActive: false
      },
      {
        level: "A1",  
        title: "Newcomer II (A1.2)",
        units: "11",
        description: "Learn how to engage in short conversations about yourself, your everyday life, and your hobbies.",
        isActive: true
      },
      {
        level: "A2",
        title: "Beginner I (A2.1)",
        units: "12",
        description: "Learn how to express preferences, past experiences and basic explanations in conversation with others.",
        isActive: false,
        isLocked: true
      }
    ];

    return (
      <div className=" mx-auto pt-6  ">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            level={lesson.level}
            title={lesson.title}
            units={lesson.units}
            description={lesson.description}
            isActive={lesson.isActive}
            isLocked={lesson.isLocked}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='flex bg-gray-900 w-full pr-16'>
      <Sidebar />
      <div className="flex-1 max-w-3xl mx-auto pt-6 px-8 ml-2">
        <LessonInfoCard 
          sectionNumber={1}
          unitNumber={1}
          lessonTitle="Order in a cafe"
        />
        <LessonList />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Learn; 