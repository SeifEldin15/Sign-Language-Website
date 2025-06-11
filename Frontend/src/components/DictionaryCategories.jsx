import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import placeholder1 from "../assets/Group 36852.png";
import placeholder2 from "../assets/Group 36856.png";
import placeholder3 from "../assets/Group.png";
import placeholder4 from "../assets/favourites.png";
import placeholder5 from "../assets/Group 36857.png";
import placeholder6 from "../assets/Group 36858.png";

function DictionaryCategories() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Introduce Your Self", image: placeholder1, path: "/dictionary/intro", number: "01" },
    { id: 2, title: "Body parts", image: placeholder2, path: "/dictionary/body" },
    { id: 3, title: "Everyday Conversations", image: placeholder3, path: "/dictionary/conversations" },
    { id: 4, title: "Time and day", image: placeholder4, path: "/dictionary/time" },
    { id: 5, title: "Places And Directions", image: placeholder5, path: "/dictionary/places" },
    { id: 6, title: "objects and places", image: placeholder6, path: "/dictionary/objects" },
  ];

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-2xl text-white mb-12 text-center">Sections</h1>
          
          <div className="relative">
            {categories.map((category, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={category.id} className="relative mb-24 last:mb-0">
                  {/* Dotted connecting line */}
                  {index < categories.length - 1 && (
                    <div className={`absolute top-16 w-96 h-72 pointer-events-none ${
                      isEven ? 'left-1/2 -translate-x-48' : 'left-1/2 -translate-x-48'
                    }`}>
                      <svg className="w-full h-full" viewBox="0 0 384 288">
                        <path
                          d={isEven ? "M 288 0 Q 32 144 96 288" : "M 96 0 Q 352 144 288 288"}
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="8,8"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex justify-center">
                    <div
                      onClick={() => navigate(category.path)}
                      className={`bg-[#293D46] rounded-2xl p-6 cursor-pointer hover:bg-gray-700/50 transition-colors relative w-96 ${
                        isEven ? 'translate-x-48' : '-translate-x-48'
                      }`}
                    >
                      <div className="flex items-center space-x-6">
                        {/* Number or Icon */}
                        <div className="flex-shrink-0 relative">
                          {category.number ? (
                            <div className="relative">
                              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{category.number}</span>
                              </div>
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-600 flex items-center justify-center">
                              <img 
                                src={category.image} 
                                alt={category.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Title */}
                        <div className="flex-1">
                          <h3 className="text-white text-xl font-medium">{category.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DictionaryCategories;
