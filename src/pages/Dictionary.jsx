import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function Dictionary() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modified sample word list with image URLs
  const categoryWords = {
    intro: [
      { word: "hello", image: "/images/1.png" },
      { word: "my name is", image: "/images/2.png" },
      { word: "nice to meet you", image: "/images/3.png" },
      { word: "I am", image: "/images/4.png" },
    ],
    body: [
      { word: "eye", image: "/images/1.png" },
      { word: "nose", image: "/images/2.png" },
      { word: "mouth", image: "/images/3.png" },
      { word: "hand", image: "/images/4.png" },
    ],
    conversations: ["how are you", "good morning", "good evening", "thank you"],
    time: ["today", "tomorrow", "yesterday", "morning", "evening"],
    places: ["hospital", "school", "restaurant", "park", "library"],
    objects: ["book", "phone", "computer", "chair", "table"],
  };

  const words = categoryWords[category] || [];

  // Updated filter to work with new word object structure
  const filteredWords = words.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for a Word"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-[#293D46] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#365148]"
            />
          </div>

          {/* Updated Word List with Images */}
          <div className="space-y-4">
            {filteredWords.map((item, index) => (
              <div
                key={index}
                className="relative p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <BookmarkIcon className="absolute top-4 right-4 w-6 h-6 text-gray-400 hover:text-[#365148] cursor-pointer" />
                <div className="flex items-center justify-between px-12 py-4">
                  <div className="flex-1">
                    <span className="text-white text-2xl">{item.word}</span>
                  </div>
                  <div className="w-32 h-32">
                    <img
                      src={item.image}
                      alt={`Sign for ${item.word}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {filteredWords.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                No words found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dictionary;
    