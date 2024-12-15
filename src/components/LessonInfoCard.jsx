import React from 'react';

const LessonInfoCard = ({ sectionNumber, unitNumber, lessonTitle }) => {
  return (
    <div className="bg-blue-500 text-white py-5 px-2 rounded-lg shadow-md flex justify-between items-start mx-auto mt-4">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium mb-1 ml-2 ">
          <button className="hover:opacity-80">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/e013fd27fc6bd1d2fea85fe707b615cd.svg" alt="Back" className="w-3 h-3" 
            style={{
              marginBottom: '2px'
            }}
            />
          </button>
          SECTION {sectionNumber}, UNIT {unitNumber}
        </div>
        <h1 className="text-xl font-bold ml-7">{lessonTitle}</h1>
      </div>
    </div>
  );
};

export default LessonInfoCard;
