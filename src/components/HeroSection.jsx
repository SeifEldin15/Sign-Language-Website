import React from 'react';
import Hands from '../assets/Hands.png';
const HeroSection = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-6">Welcome Back to Your Practice</h1>
          <div className="space-y-4 mb-8">
            <p className="text-xl text-gray-300">
              Continue your sign language journey from where you left off
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg max-w-2xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Your Progress</h3>
              <p className="text-gray-300">Current Level: Intermediate Conversation</p>
              <p className="text-gray-300">Completed Lessons: 24/36</p>
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
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Resume Practice
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600/10 transition-colors">
              View Progress Report
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-blue-600 rounded-lg h-96 relative flex items-center">
          <div className="absolute left-8 z-10">
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Today's Practice?</h2>
            <p className="text-xl text-white/80">Your daily progress keeps you on track to fluency</p>
            <div className="mt-4 space-y-2 text-white/90">
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Practice streak: 7 days
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Today's goal: 30 minutes
              </p>
            </div>
          </div>
          <img 
            src={Hands} 
            alt="Sign language practice illustration"
            className="absolute -top-8 right-0 h-[calc(100%+2rem)] object-cover rounded-r-lg"
          />
          <div className="absolute right-8 top-8">
            <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 