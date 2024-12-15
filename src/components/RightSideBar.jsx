// RightSideBar.jsx
import React from 'react';
import profilepic from '../assets/profile pic.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import chestpic from '../assets/chest.png'
const RightSideBar = () => {
  return (
    <div className="bg-gray-900 text-white p-6 flex flex-col gap-6 max-w-[30%]">
      {/* Top Stats */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={profilepic} alt="Profile Pic" className="w-9 h-9 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center ">
            <div className="w-6 h-6">
              <FontAwesomeIcon className='text-yellow-500' icon={faFire} />
            </div>
            <span className="text-yellow-500">21</span>
          </div>
          <div className="flex items-center ">
            <div className="w-6 h-6">
              <FontAwesomeIcon className='text-blue-400' icon={faDiamond} />
            </div>
            <span className="text-blue-400">500</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <span className="text-red-400">5</span>
          </div>
        </div>
      </div>

      {/* Leaderboards Section */}
      <div className="border border-gray-700 rounded-2xl p-4">
        <h2 className="font-extrabold mb-6">Unlock Leaderboards!</h2>
        <div className="flex items-center gap-3">
          <div className="bg-gray-700 p-2 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-300">Complete 10 more lessons to start competing</p>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div className="border border-gray-700 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-extrabold mb-4">Daily Quests</h2>
          <button className="text-cyan-400 hover:text-cyan-300 mb-4 font-bold text-sm">VIEW ALL</button>
        </div>
        <div className="flex items-center gap-4">
        <FontAwesomeIcon className='text-yellow-500 text-4xl' icon={faStar} />
          <div className="flex-1">
            <p className="text-white mb-1">Earn 10 XP</p>
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 rounded-full h-6 relative flex-1">
                <div className="bg-gray-600 rounded-full h-full w-0"></div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  0 / 10
                </div>
              </div>
              <img src={chestpic} alt="Chest" className="w-9 h-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Creation Section */}
      <div className="bg-gray-900 rounded p-7 border border-gray-700">
        <h2 className="font-bold text-lg mb-5 text-center text-white">
          Create a profile to save your progress!
        </h2>
        <div className="flex flex-col gap-4">
          <button className="bg-[#FFD700] hover:bg-[#E6C200] py-4 rounded-full font-bold text-black text-sm shadow-[0_8px_0_rgb(204,172,0)]">
            CREATE A PROFILE
          </button>
          <button className="bg-[#69C5FF] hover:bg-[#5bb4ea] py-4 rounded-full font-bold text-black text-sm shadow-[0_8px_0_rgb(75,158,214)]">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-auto text-xs text-gray-500 font-bold">
        <div className="flex gap-4 justify-center mb-2">
          <a href="#" className="hover:text-gray-400">ABOUT</a>
          <a href="#" className="hover:text-gray-400">BLOG</a>
          <a href="#" className="hover:text-gray-400">STORE</a>
          <a href="#" className="hover:text-gray-400">EFFICACY</a>
          <a href="#" className="hover:text-gray-400">CAREERS</a>
        </div>
        <div className="flex gap-4 justify-center">
          <a href="#" className="hover:text-gray-400">INVESTORS</a>
          <a href="#" className="hover:text-gray-400">TERMS</a>
          <a href="#" className="hover:text-gray-400">PRIVACY</a>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;