import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function Dictionary() {
  // Add state for search and words list
  const [searchQuery, setSearchQuery] = useState("");
  const words = ["welcome", "how are you", "thanks", "good", "bad", "bye", "watch", "eat", "drink"];

  // Filter words based on search query
  const filteredWords = words.filter(word =>
    word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for a Word"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Word List */}
          <div className="space-y-3">
            {filteredWords.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <span className="text-white">{word}</span>
                <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
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
      </main>
    </div>
  );
}

export default Dictionary;
    