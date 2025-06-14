import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

function Bookmarks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get user ID from localStorage and fetch bookmarks
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchBookmarks(storedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user bookmarks
  const fetchBookmarks = async (userIdParam) => {
    try {
      setLoading(true);
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
      } else {
        console.error('Failed to fetch bookmarks');
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
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

  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle word click for zoom overlay
  const handleWordClick = (bookmark) => {
    setSelectedWord(bookmark);
  };

  // Close zoom overlay
  const closeOverlay = () => {
    setSelectedWord(null);
  };

  if (loading) {
    return (
      <>
        <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center text-white py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#365148] mx-auto"></div>
              <p className="mt-4">Loading bookmarks...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
          <Sidebar />
        </div>
        <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center text-gray-400 py-8">
              <h2 className="text-2xl mb-4">Please Log In</h2>
              <p>You need to be logged in to view your bookmarks.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              placeholder="Search your bookmarks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-[#293D46] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2"
              style={{'--tw-ring-color': 'rgb(74, 222, 128)'}}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgb(74, 222, 128)'}
              onBlur={(e) => e.target.style.boxShadow = ''}
            />
          </div>

          {/* Bookmarks List */}
          <div className="space-y-3">
            {filteredBookmarks.length > 0 ? (
              filteredBookmarks.map((bookmark, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <button
                    onClick={() => removeBookmark(bookmark.word)}
                    className="absolute top-4 right-4 w-6 h-6 cursor-pointer z-10 hover:text-red-400"
                    style={{color: 'rgb(74, 222, 128)'}}
                    title="Remove bookmark"
                  >
                    <BookmarkSolidIcon className="w-6 h-6" />
                  </button>
                  
                  <div 
                    className="flex items-center justify-between pr-12 cursor-pointer"
                    onClick={() => handleWordClick(bookmark)}
                  >
                    <div className="flex-1">
                      <span className="text-white text-xl block">{bookmark.word}</span>
                      <span className="text-gray-400 text-sm">Category: {bookmark.category}</span>
                    </div>
                    <div className="w-24 h-24">
                      <img
                        src={bookmark.image}
                        alt={`Sign for ${bookmark.word}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : bookmarks.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <h3 className="text-xl mb-2">No Bookmarks Yet</h3>
                <p>Start browsing the dictionary and bookmark words you want to remember!</p>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">
                No bookmarks found matching "{searchQuery}"
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
                <p className="text-gray-400 mb-6">Category: {selectedWord.category}</p>
                <div className="mb-6">
                  <img
                    src={selectedWord.image}
                    alt={`Sign for ${selectedWord.word}`}
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                </div>
                <button
                  onClick={() => removeBookmark(selectedWord.word)}
                  className="flex items-center justify-center mx-auto px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                  Remove Bookmark
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Bookmarks;
