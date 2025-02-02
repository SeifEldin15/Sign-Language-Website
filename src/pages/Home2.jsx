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
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PiHandWavingBold } from "react-icons/pi";
import { RiHandHeartLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { IoHandRightOutline } from "react-icons/io5";

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='fixed top-0 left-0'>
    <Sidebar />
</div>
    <div className="min-h-screen bg-[#141F23] text-white p-4 md:p-8 lg:p-12 ml-48 relative overflow-hidden">
      {/* Add gradient beam */}
      
      <Header />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
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
            <div className="bg-yellow-300 rounded-2xl p-6" onClick={() => navigate('/learn')} style={{ cursor: 'pointer' }}>
              <div className="flex flex-col h-full">
                <div className="bg-yellow-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-gray-800 text-lg mb-auto">Learn Sign Language</h3>
                <ChevronRightIcon className="w-6 h-6 text-gray-800 self-end mt-4" />
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6" onClick={() => navigate('/dictionary')} style={{ cursor: 'pointer' }}>
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
            <button className="text-green-400" onClick={() => navigate('/commonwords')}>See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <PiHandWavingBold className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">Hello</span>
            </div>

            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <RiHandHeartLine className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">Thank You</span>
            </div>

            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <BsEmojiSmile className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">How Are You</span>
            </div>

            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <IoHandRightOutline className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">Please</span>
            </div>

            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <HandThumbUpIcon className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">Good</span>
            </div>

            <div className="bg-[#293D46] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <MoonIcon className="w-12 h-12 text-white" />
              </div>
              <span className="text-2xl text-white">Good Night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home2;
