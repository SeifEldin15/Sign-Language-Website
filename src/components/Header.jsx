import React from 'react'
import { BellIcon } from "@heroicons/react/24/outline";
import Image2 from '../assets/home2/Ellipse 11.png';
const Header = () => {
  return (
    <div className="max-w-5xl mx-auto mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={Image2} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-lg">Welcome back, Abdelrahman</span>
      </div>
      <BellIcon className="w-8 h-8 text-gray-400" />
    </div>
  </div>
  )
}

export default Header
