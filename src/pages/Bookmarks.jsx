import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function Bookmarks() {
  // Add state for search and words list
  const [searchQuery, setSearchQuery] = useState("");
  const words = ["welcome", "how are you", "thanks", "good", "bad", "bye", "watch", "eat", "drink"];

  // Filter words based on search query
  const filteredWords = words.filter(word =>
    word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto relative z-10">
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

          {/* Word List */}
          <div className="space-y-3">
            {filteredWords.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-white">{word}</span>
                <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-[#365148] cursor-pointer" />
              </div>
            ))}
            
            {/* Show message when no results found */}
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

export default Bookmarks;
