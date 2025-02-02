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

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { icon: BookmarkIcon, label: "Saved words", href: "/saved" },
    { icon: UserIcon, label: "Edit Profile", href: "/profile" },
    { icon: InformationCircleIcon, label: "About us", href: "/about" },
    { icon: ChatBubbleLeftRightIcon, label: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Profile Section */}
          <div className="mb-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#365148] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              DO
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">Doha</h2>
              <p className="text-gray-400">Doha.testt@gmail.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-gray-400" />
                  <span className="text-white">{item.label}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
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
