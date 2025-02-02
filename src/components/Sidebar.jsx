import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: "home", label: "HOME" },
    { icon: "book", label: "DICTIONARY" },
    { icon: "notebook", label: "LEARN" },
    { icon: "grid", label: "SETTINGS" }
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 p-6 border-r border-gray-700">
      <div className="mb-8">
        <h1 className="text-[#58cc02] text-2xl font-bold">Logo</h1>
      </div>

      <nav>
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center space-x-4 px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                <div className={`w-7 h-7 flex items-center justify-center
                  ${item.label === "LEARN" ? "text-[#58cc02]" : "text-gray-400"}`}
                >
                  {item.icon === "home" && <div className="w-6 h-6 border-[1.5px] border-current relative -top-[2px]"><div className="w-3 h-2 border-[1.5px] border-current mx-auto -bottom-[2px]"></div></div>}
                  {item.icon === "book" && <div className="w-6 h-6 border-[1.5px] border-current p-[3px]"><div className="w-3 h-[2px] bg-current mb-[3px]"></div><div className="w-3 h-[2px] bg-current"></div></div>}
                  {item.icon === "notebook" && <div className="w-6 h-6 border-[1.5px] border-current p-[3px]"><div className="w-3 h-[2px] bg-current mb-[3px]"></div><div className="w-2 h-[2px] bg-current"></div></div>}
                  {item.icon === "grid" && <div className="grid grid-cols-2 gap-[3px]"><div className="w-2.5 h-2.5 border-[1.5px] border-current"></div><div className="w-2.5 h-2.5 border-[1.5px] border-current"></div><div className="w-2.5 h-2.5 border-[1.5px] border-current"></div><div className="w-2.5 h-2.5 border-[1.5px] border-current"></div></div>}
                </div>
                <span className={`${
                  item.label === "LEARN" 
                    ? "text-[#58cc02]" 
                    : "text-gray-400"
                } text-sm`}>
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
