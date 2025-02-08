import React from 'react';
import Hands from '../assets/Hands.png';
const HeroSection = () => {
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
              <p className="text-gray-300">Current Level: Intermediate Conversation</p>
              <p className="text-gray-300">Completed Lessons: 1/4</p>
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
            <button className="bg-[#4ADE80] text-black px-8 py-3 rounded-lg hover:bg-[#3FCF76] transition-colors font-medium">
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