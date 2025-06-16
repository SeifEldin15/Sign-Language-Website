import React from 'react';
import {
  UserCircleIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChevronRightIcon,
  HandRaisedIcon,
  MoonIcon,
  PaperAirplaneIcon,
  RocketLaunchIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { MdOutlineNightlight  } from "react-icons/md";
import { FaRegHandPaper  } from "react-icons/fa";
import Rocket from '../assets/home2/Isometric Stickers Rocket.png';
import Paperplane from '../assets/home2/Isometric Stickers Paper Airplane.png';
import Header from '../components/Header';
import Heroimg from '../assets/home2/Heroimg.png';
import Hands from '../assets/Hands.png'; // Import the hands image
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PiHandWavingBold } from "react-icons/pi";
import { RiHandHeartLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { IoHandRightOutline } from "react-icons/io5";
import HeroSection from '../components/HeroSection';

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50'>
      <Sidebar />
    </div>
    <div className="min-h-screen bg-[#141F23] text-white p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden">
      {/* Add gradient beam */}
      
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Real Time Communication Card */}
            <div className="rounded-xl h-64 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #1E3A8A 100%)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'}} onClick={() => navigate('/realtime-translation')}>
              <div className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#1E3A8A'}}>
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-12 left-4 right-32">
                <h2 className="text-sm font-semibold text-white mb-2 leading-tight">
                  Real time translation
                </h2>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  Instantly translate sign language gestures to text and speech in real-time using advanced AI technology.
                </p>
                <button className="text-white py-2 px-4 rounded-lg text-sm" style={{backgroundColor: '#1E3A8A', boxShadow: '0 4px 16px rgba(30, 58, 138, 0.4)'}}>Start now</button>
              </div>
              
              <img 
                src="/images/1.png"
                alt="Real time communication illustration"
                className="absolute bottom-0 right-[-10px] h-[95%] w-auto object-contain"
              />
            </div>

            {/* Learn Sign Language Card */}
            <div className="rounded-xl h-64 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'}} onClick={() => navigate('/learn')}>
              <div className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#047857'}}>
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-12 left-4 right-32">
                <h2 className="text-sm font-semibold text-white mb-2 leading-tight">
                  Learn Sign Language
                </h2>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  Master sign language with interactive lessons, practice exercises, and step-by-step tutorials for all skill levels.
                </p>
                <button className="text-white py-2 px-4 rounded-lg text-sm" style={{backgroundColor: '#047857', boxShadow: '0 4px 16px rgba(4, 120, 87, 0.4)'}}>Get Started</button>
              </div>
              
              <img 
                src="/images/translate.png"
                alt="Learn sign language illustration"
                className="absolute bottom-0 right-[-10px] h-[95%] w-auto object-contain"
              />
            </div>

            {/* Sign Language Dictionary Card */}
            <div className="rounded-xl h-64 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)', boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'}} onClick={() => navigate('/dictionary')}>
              <div className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#6D28D9'}}>
                  <BookOpenIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-12 left-4 right-32">
                <h2 className="text-sm font-semibold text-white mb-2 leading-tight">
                  Sign Language Dictionary
                </h2>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                  Browse our comprehensive dictionary of sign language words with visual demonstrations and detailed instructions.
                </p>
                <button className="text-white py-2 px-4 rounded-lg text-sm" style={{backgroundColor: '#6D28D9', boxShadow: '0 4px 16px rgba(109, 40, 217, 0.4)'}}>Explore Words</button>
              </div>
              
              <img 
                src="/images/dictionary.png" 
                alt="Sign language dictionary illustration"
                className="absolute bottom-0 right-[-10px] h-[95%] w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Common Words */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Common words</h2>
            <button className="text-green-400" onClick={() => navigate('/commonwords')}>See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <PiHandWavingBold className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">Hello</span>
            </div>

            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <RiHandHeartLine className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">Thank You</span>
            </div>

            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <BsEmojiSmile className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">How Are You</span>
            </div>

            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <IoHandRightOutline className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">Please</span>
            </div>

            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <HandThumbUpIcon className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">Good</span>
            </div>

            <div className="rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] transform border border-gray-600/30" style={{background: 'linear-gradient(135deg, #374151 0%, #293D46 70%, #1F2937 100%)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'}}>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-700/50 backdrop-blur-sm">
                <MoonIcon className="w-10 h-10 text-gray-200" />
              </div>
              <span className="text-lg text-gray-200 font-medium">Good Night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home2;