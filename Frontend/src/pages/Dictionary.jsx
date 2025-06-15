import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

function Dictionary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState(null);
  
  // All words from all categories combined
  const allWords = [
    // Basic Signs
    { word: "hello", image: "/signs/hello.gif", category: "Basic Signs" },
    { word: "my name is", image: "/images/2.png", category: "Basic Signs" },
    { word: "nice to meet you", image: "/signs/nice_to_meet_you.gif", category: "Basic Signs" },
    { word: "I am", image: "/signs/me.gif", category: "Basic Signs" },
    
    // Numbers
    { word: "one", image: "/images/1.png", category: "Numbers" },
    { word: "two", image: "/images/2.png", category: "Numbers" },
    { word: "three", image: "/images/3.png", category: "Numbers" },
    { word: "four", image: "/images/4.png", category: "Numbers" },
    
    // Colors
    { word: "red", image: "/images/1.png", category: "Colors" },
    { word: "blue", image: "/images/2.png", category: "Colors" },
    { word: "green", image: "/images/3.png", category: "Colors" },
    { word: "yellow", image: "/images/4.png", category: "Colors" },
    
    // Family
    { word: "mother", image: "/images/1.png", category: "Family" },
    { word: "father", image: "/images/2.png", category: "Family" },
    { word: "sister", image: "/images/3.png", category: "Family" },
    { word: "brother", image: "/images/4.png", category: "Family" },
    { word: "grandmother", image: "/images/1.png", category: "Family" },
    
    // Food
    { word: "apple", image: "/images/1.png", category: "Food" },
    { word: "bread", image: "/images/2.png", category: "Food" },
    { word: "water", image: "/images/3.png", category: "Food" },
    { word: "milk", image: "/images/4.png", category: "Food" },
    { word: "rice", image: "/images/1.png", category: "Food" },
  ];

  const words = allWords;

  // Get user ID from localStorage and fetch bookmarks
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchBookmarks(storedUserId);
    }
  }, []);

  // Fetch user bookmarks
  const fetchBookmarks = async (userIdParam) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/bookmarks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'userid': userIdParam
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  // Add bookmark
  const addBookmark = async (word, image) => {
    if (!userId) {
      alert('Please log in to bookmark words');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/user/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userid': userId
        },
        body: JSON.stringify({
          word: word,
          image: image,
          category: "All Categories"
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add bookmark');
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      alert('Failed to add bookmark');
    }
  };

  // Remove bookmark
  const removeBookmark = async (word) => {
    if (!userId) return;

    try {
      const response = await fetch('http://localhost:3000/api/user/bookmarks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'userid': userId
        },
        body: JSON.stringify({
          word: word
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // Check if word is bookmarked
  const isBookmarked = (word) => {
    return bookmarks.some(bookmark => bookmark.word === word);
  };

  // Handle bookmark toggle
  const toggleBookmark = (word, image) => {
    if (isBookmarked(word)) {
      removeBookmark(word);
    } else {
      addBookmark(word, image);
    }
  };

  // Updated filter to work with new word object structure
  const filteredWords = words.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle word click for zoom overlay
  const handleWordClick = (item) => {
    setSelectedWord(item);
  };

  // Close zoom overlay
  const closeOverlay = () => {
    setSelectedWord(null);
  };

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Dictionary</h1>
            <p className="text-gray-400 text-center mb-8">Search through all sign language words</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for a Word"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-[#293D46] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2"
              style={{'--tw-ring-color': 'rgb(74, 222, 128)'}}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgb(74, 222, 128)'}
              onBlur={(e) => e.target.style.boxShadow = ''}
            />
          </div>

          {/* Updated Word List with Images */}
          <div className="space-y-4">
            {filteredWords.map((item, index) => (
              <div
                key={index}
                className="relative p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <button
                  onClick={() => toggleBookmark(item.word, item.image)}
                  className="absolute top-4 right-4 w-6 h-6 text-gray-400 cursor-pointer z-10"
                  style={{
                    color: isBookmarked(item.word) ? 'rgb(74, 222, 128)' : undefined
                  }}
                  onMouseEnter={(e) => {
                    if (!isBookmarked(item.word)) {
                      e.target.style.color = 'rgb(74, 222, 128)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isBookmarked(item.word)) {
                      e.target.style.color = '';
                    }
                  }}
                >
                  {isBookmarked(item.word) ? (
                    <BookmarkSolidIcon className="w-6 h-6" />
                  ) : (
                    <BookmarkIcon className="w-6 h-6" />
                  )}
                </button>
                <div 
                  className="flex items-center justify-between px-12 py-4 cursor-pointer"
                  onClick={() => handleWordClick(item)}
                >
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <span className="text-white text-2xl">{item.word}</span>
                      <span className="text-gray-400 text-sm mt-1">{item.category}</span>
                    </div>
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

        {/* Zoom Overlay */}
        {selectedWord && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60]"
            onClick={closeOverlay}
          >
            <div 
              className="bg-[#293D46] rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-auto m-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeOverlay}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
              
              <div className="text-center">
                <h2 className="text-white text-4xl mb-2">{selectedWord.word}</h2>
                <p className="text-gray-400 text-lg mb-6">{selectedWord.category}</p>
                <div className="mb-6">
                  <img
                    src={selectedWord.image}
                    alt={`Sign for ${selectedWord.word}`}
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                </div>
                <button
                  onClick={() => toggleBookmark(selectedWord.word, selectedWord.image)}
                  className={`flex items-center justify-center mx-auto px-6 py-3 rounded-lg transition-colors ${
                    isBookmarked(selectedWord.word)
                      ? 'text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                  style={{
                    backgroundColor: isBookmarked(selectedWord.word) ? 'rgb(74, 222, 128)' : undefined
                  }}
                >
                  {isBookmarked(selectedWord.word) ? (
                    <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                  ) : (
                    <BookmarkIcon className="w-5 h-5 mr-2" />
                  )}
                  {isBookmarked(selectedWord.word) ? 'Bookmarked' : 'Add Bookmark'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dictionary;
    