import React from 'react';
import { useLocation } from 'react-router-dom';
// Add image imports - adjust paths according to your project structure
import homeIcon from '../assets/TabBar-item.png';
import dictionaryIcon from '../assets/Group 33880.png';
import learnIcon from '../assets/book.png';
import settingsIcon from '../assets/Group 33872.png';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: homeIcon, label: "HOME", href: "/" },
    { icon: dictionaryIcon, label: "DICTIONARY", href: "/dictionary" },
    { icon: learnIcon, label: "LEARN", href: "/learn" },
    { icon: settingsIcon, label: "SETTINGS", href: "/settings" }
  ];

  return (
    <div className="h-screen w-64 bg-[#141F23] p-6 border-r border-gray-700">
      <div className="mb-8">
        <h1 className="text-[#58cc02] text-2xl font-bold">Logo</h1>
      </div>

      <nav>
        <ul className="space-y-6">
          {menuItems.map((item, index) => {
            const isActive = item.href === "/"
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href) || 
                (item.href === "/dictionary" && location.pathname.includes("/introhighlight"));
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center space-x-4 px-3 py-2 rounded-lg hover:bg-gray-800"
                >
                  <div className={`w-7 h-7 flex items-center justify-center
                    ${isActive ? "text-[#58cc02]" : "text-gray-400"}`}
                  >
                    <img 
                      src={item.icon} 
                      alt={item.label}
                      className={`w-6 h-6 ${isActive ? "filter-green" : "filter-gray"}`}
                    />
                  </div>
                  <span className={`${
                    isActive 
                      ? "text-[#58cc02]" 
                      : "text-gray-400"
                  } text-sm`}>
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
