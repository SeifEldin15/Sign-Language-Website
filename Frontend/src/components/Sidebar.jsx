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
    <div className="md:h-screen md:w-64 w-full bg-[#141F23] md:p-6 p-3 border-t md:border-r border-gray-700">
      <div className="mb-8 hidden md:block">
        <h1 className="logo-glow text-3xl font-extrabold font-['Feather Bold']">Synthima</h1>
      </div>

      <nav>
        <ul className="md:space-y-6 flex md:flex-col justify-around md:justify-start">
          {menuItems.map((item, index) => {
            const isActive = item.href === "/"
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href) || 
                (item.href === "/dictionary" && location.pathname.includes("/introhighlight"));
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex md:flex-row flex-col items-center md:space-x-4 px-3 py-2 rounded-lg hover:bg-gray-800"
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
                  } text-xs md:text-sm`}>
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
