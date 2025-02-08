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
    { id: 1, title: "Introduce Your Self", image: placeholder1, path: "/dictionary/intro" },
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
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-2xl text-white mb-8">Select a Category</h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(category.path)}
                className="bg-[#293D46] p-4 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <span className="text-white text-center">{category.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DictionaryCategories;
