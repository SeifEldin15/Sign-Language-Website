import React from 'react';

const ServicesSection = () => {
  return (
    <div className="container mx-auto px-6 py-16 bg-gray-900">
      <h2 className="text-3xl font-bold mb-12 text-white">Services</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Card */}
        <div className="bg-white p-8 rounded-2xl relative h-full">
          <div className="bg-gray-200 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#333">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl text-gray-800 font-medium mb-4">Real Time Communication with Feedback</h3>
          <p className="text-gray-600 mb-6">
            Connect instantly with sign language experts for real-time conversations and receive immediate feedback to improve your signing skills. Perfect for both beginners and advanced learners.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-8 py-3 rounded-lg font-medium mt-4 flex items-center gap-2">
            Start now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Learn Sign Language Card */}
          <div className="bg-yellow-200 p-8 rounded-2xl relative">
            <div className="bg-yellow-300 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#333">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl text-gray-800 font-medium mb-2">Learn Sign Language</h3>
            <div className="absolute bottom-8 right-8">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Dictionary Card */}
          <div className="bg-white p-8 rounded-2xl relative">
            <div className="bg-gray-200 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#333">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl text-gray-800 font-medium mb-2">Sign Language Dictionary</h3>
            <div className="absolute bottom-8 right-8">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 