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
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { MdOutlineNightlight  } from "react-icons/md";
import { FaRegHandPaper  } from "react-icons/fa";
import Rocket from '../assets/home2/Isometric Stickers Rocket.png';
import Paperplane from '../assets/home2/Isometric Stickers Paper Airplane.png';
import Header from '../components/Header';
import Heroimg from '../assets/home2/heroimg.png';

const Home2 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 lg:p-12">
    <Header />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-blue-600 rounded-2xl p-12 mb-8 relative overflow-hidden flex gap-4 justify-around items-center">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-7xl font-bold mb-2">Speak with <br /> your hands</h1>
            <p className="text-blue-100 text-xl">Start communicating effectively today</p>
          </div>
          <img src={Heroimg} alt="" className='max-w-[400px] max-h-[400px]' />
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="flex flex-col h-full">
                <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-gray-800 text-lg mb-auto">real time Communication with feedback</h3>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Start now</button>
              </div>
            </div>
            <div className="bg-yellow-300 rounded-2xl p-6">
              <div className="flex flex-col h-full">
                <div className="bg-yellow-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-gray-800 text-lg mb-auto">Learn Sign Language</h3>
                <ChevronRightIcon className="w-6 h-6 text-gray-800 self-end mt-4" />
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="flex flex-col h-full">
                <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpenIcon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-gray-800 text-lg mb-auto">Sign Language Dictionary</h3>
                <ChevronRightIcon className="w-6 h-6 text-gray-800 self-end mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Common Words */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Common words</h2>
            <button className="text-green-400">See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-[24px] px-4 py-8 relative">
              {/* Main border with gradient fade */}
              <div className="absolute inset-0 rounded-[14px] border-2 border-white/70" style={{
                maskImage: 'linear-gradient(to top right, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top right, black 80%, transparent 100%)'
              }}></div>
              
              <div className="relative">
                <div className="flex justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                      <FaRegHandPaper className="w-6 h-6 text-gray-100 " />
                    </div>
                    <span className="text-2xl font-medium text-gray-100 ml-2">How Are You</span>
                  </div>
                  <img src={Rocket} alt="Rocket" className="w-24 h-24 mt-4" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[24px] px-4 py-8 relative">
              {/* Main border with gradient fade */}
              <div className="absolute inset-0 rounded-[14px] border-2 border-white/70" style={{
                maskImage: 'linear-gradient(to top right, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top right, black 80%, transparent 100%)'
              }}></div>
              
              <div className="relative">
                <div className="flex justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                      <MdOutlineNightlight className="w-7 h-7 text-gray-100" />
                    </div>
                    <span className="text-2xl font-medium text-white ml-2">Good night</span>
                  </div>
                  <img src={Paperplane} alt="Paper Airplane" className="w-24 h-24 mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;
