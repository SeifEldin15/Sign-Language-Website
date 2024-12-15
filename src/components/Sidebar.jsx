import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg", label: "LEARN" },
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg", label: "LEADERBOARDS" },
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/7ef36bae3f9d68fc763d3451b5167836.svg", label: "QUESTS" },
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/0e58a94dda219766d98c7796b910beee.svg", label: "SHOP" },
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/24e0dcdc06870ead47b3600f0d41eb5b.svg", label: "PROFILE" },
    { icon: "https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg", label: "MORE" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 p-6 border-r border-gray-700">
      <div className="mb-8">
        <h1 className="text-[#58cc02] text-2xl font-bold">Logo</h1>
      </div>

      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-4 py-2 px-4 rounded-lg ${
                  item.label === "LEARN" 
                    ? "bg-[#1c4455] hover:bg-[#1c4455] border border-[#0085CC]" 
                    : "hover:bg-gray-800"
                } transition-colors`}
              >
                <img src={item.icon} alt={item.label} className="text-xl w-8 h-8" />
                <span className={`${
                  item.label === "LEARN" 
                    ? "text-[#4ac6ff] " 
                    : "text-white"
                } font-bold text-sm`}>
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
