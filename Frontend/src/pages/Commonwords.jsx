import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

function Commonwords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState(null);
  
  // Common words with images - using random common sign language words
  const commonWords = [
    { word: "hello", image: "/signs/hello.gif" },
    { word: "thank you", image: "/images/1.png" },
    { word: "please", image: "/images/2.png" },
    { word: "sorry", image: "/images/3.png" },
    { word: "yes", image: "/images/4.png" },
    { word: "no", image: "/images/1.png" },
    { word: "good morning", image: "/images/2.png" },
    { word: "good night", image: "/images/3.png" },
    { word: "how are you", image: "/images/4.png" },
    { word: "I love you", image: "/images/1.png" },
    { word: "family", image: "/images/2.png" },
    { word: "friend", image: "/images/3.png" },
    { word: "help", image: "/images/4.png" },
    { word: "water", image: "/images/1.png" },
    { word: "food", image: "/images/2.png" },
    { word: "home", image: "/images/3.png" },
    { word: "work", image: "/images/4.png" },
    { word: "school", image: "/images/1.png" },
    { word: "money", image: "/images/2.png" },
    { word: "time", image: "/images/3.png" },
    { word: "happy", image: "/images/4.png" },
    { word: "sad", image: "/images/1.png" },
    { word: "tired", image: "/images/2.png" },
    { word: "hungry", image: "/images/3.png" },
    { word: "full", image: "/images/4.png" },
    { word: "hot", image: "/images/1.png" },
    { word: "cold", image: "/images/2.png" },
    { word: "big", image: "/images/3.png" },
    { word: "small", image: "/images/4.png" },
    { word: "beautiful", image: "/images/1.png" },
    { word: "ugly", image: "/images/2.png" },
    { word: "good", image: "/images/3.png" },
    { word: "bad", image: "/images/4.png" },
    { word: "easy", image: "/images/1.png" },
    { word: "difficult", image: "/images/2.png" },
    { word: "fast", image: "/images/3.png" },
    { word: "slow", image: "/images/4.png" },
    { word: "come", image: "/images/1.png" },
    { word: "go", image: "/images/2.png" },
    { word: "stop", image: "/images/3.png" },
    { word: "wait", image: "/images/4.png" },
    { word: "look", image: "/images/1.png" },
    { word: "listen", image: "/images/2.png" },
    { word: "understand", image: "/images/3.png" },
    { word: "learn", image: "/images/4.png" },
    { word: "teach", image: "/images/1.png" },
    { word: "practice", image: "/images/2.png" },
    { word: "remember", image: "/images/3.png" },
    { word: "forget", image: "/images/4.png" }
  ];

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
      const response = await fetch('http://44.246.135.176:3002/api/user/bookmarks', {
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
      const response = await fetch('http://44.246.135.176:3002/api/user/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userid': userId
        },
        body: JSON.stringify({
          word: word,
          image: image,
          category: 'common'
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
      const response = await fetch('http://44.246.135.176:3002/api/user/bookmarks', {
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

  // Filter words based on search query
  const filteredWords = commonWords.filter(item =>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold mb-4">Common Words</h1>
            <p className="text-gray-400">Essential sign language words for everyday communication</p>
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

          {/* Word List with Images */}
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
                <h2 className="text-white text-4xl mb-6">{selectedWord.word}</h2>
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

export default Commonwords;
    