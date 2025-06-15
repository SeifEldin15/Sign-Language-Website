import React from 'react';

const ServicesSection = () => {
  return (
    <div className="container mx-auto px-6 py-16 bg-gray-900">
      <h2 className="text-3xl font-bold mb-12 text-white">Services</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Card */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl relative h-full overflow-hidden">
          <div className="absolute left-8 z-10 max-w-[60%]">
            <div className="bg-white bg-opacity-20 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl text-white font-medium mb-4">Real Time Communication with Feedback</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Connect instantly with sign language experts for real-time conversations and receive immediate feedback to improve your signing skills. Perfect for both beginners and advanced learners.
            </p>
            <div className="mt-4 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>💬</span>
                <span>Live video chat sessions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>🎯</span>
                <span>Instant feedback & corrections</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>👥</span>
                <span>Connect with native signers</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm">
              Start now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-[-15px] right-0 h-[115%] w-[45%] bg-gradient-to-l from-slate-600 to-transparent rounded-r-2xl">
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
              <div className="w-24 h-32 bg-gradient-to-b from-green-400 to-green-500 rounded-full relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-200 rounded-full"></div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-800 rounded-full ml-1"></div>
                </div>
                <div className="absolute top-8 right-2 w-3 h-8 bg-amber-200 rounded-full transform rotate-12"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-white rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Learn Sign Language Card */}
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-8 rounded-2xl relative overflow-hidden h-48">
            <div className="absolute left-4 z-10 max-w-[60%]">
              <div className="bg-yellow-400 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-800 font-medium mb-2">Learn Sign Language</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Master the fundamentals with interactive lessons designed for all skill levels.
              </p>
            </div>
            <div className="absolute top-[-10px] right-0 h-[110%] w-[45%] bg-gradient-to-l from-yellow-400 to-transparent rounded-r-2xl">
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                <div className="w-20 h-24 bg-gradient-to-b from-green-400 to-green-500 rounded-full relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-200 rounded-full"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-800 rounded-full ml-1"></div>
                  </div>
                  <div className="absolute top-8 right-2 w-3 h-8 bg-amber-200 rounded-full transform rotate-12"></div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-white rounded-t-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-4">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Dictionary Card */}
          <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl relative overflow-hidden h-48">
            <div className="absolute left-4 z-10 max-w-[60%]">
              <div className="bg-gray-200 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-800 font-medium mb-2">Sign Language Dictionary</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore thousands of signs with video demonstrations and detailed explanations.
              </p>
            </div>
            <div className="absolute top-[-10px] right-0 h-[110%] w-[45%] bg-gradient-to-l from-gray-200 to-transparent rounded-r-2xl">
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                <div className="w-20 h-24 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-200 rounded-full"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-800 rounded-full ml-1"></div>
                  </div>
                  <div className="absolute top-8 left-2 w-3 h-8 bg-amber-200 rounded-full transform -rotate-12"></div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-white rounded-t-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-4">
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