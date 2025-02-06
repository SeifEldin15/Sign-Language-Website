import { useState } from "react";
import Sidebar from '../components/Sidebar';
import { 
  BookmarkIcon, 
  UserIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const menuItems = [
    { icon: BookmarkIcon, label: "Saved words", href: "/bookmarks" },
    { icon: InformationCircleIcon, label: "About us", href: "/about" },
  ];

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#365148] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                SE
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">Edit Profile</h2>
                <p className="text-gray-400">Update your account details</p>
              </div>
            </div>

            {/* Edit Profile Form */}
            <form className="space-y-4 mb-8">
              <div>
                <input
                  type="email"
                  defaultValue="seif@gmail.com"
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="Email"
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Contract Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#365148] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                <ChatBubbleLeftRightIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">Contract</h2>
                <p className="text-gray-400">Get in touch with us</p>
              </div>
            </div>

            <form className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <textarea
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 min-h-[120px] resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-gray-400" />
                  <span className="text-white">{item.label}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <SunIcon className="w-6 h-6 text-gray-400" />
                <span className="text-white">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </button>

            {/* Logout Button */}
            <button className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-400" />
                <span className="text-white">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
