import { useState, useEffect } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Learn from './pages/Learn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lesson from './pages/Lesson'
import QuestionPage from './pages/QuestionPage'
import Home2 from './pages/Home2'
import Settings from './pages/Settings'
import Dictionary from './pages/Dictionary'
import Bookmarks from './pages/Bookmarks'
import Commonwords from './pages/Commonwords'
import RealtimeTranslation from './pages/RealtimeTranslation'

// Loading Screen Component
function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const signLanguageFacts = [
    "Sign language is a complete, natural language with its own grammar and syntax!",
    "There are over 300 different sign languages used around the world.",
    "American Sign Language (ASL) is the 3rd most used language in the United States.",
    "Sign language predates spoken language - humans have been using gestures to communicate for thousands of years.",
    "Each country typically has its own unique sign language, just like spoken languages.",
    "Sign language uses facial expressions and body language as essential grammatical elements.",
    "The first deaf school in America was founded in 1817 in Hartford, dictionariesicut.",
    "Sign language can express poetry, humor, and complex abstract concepts just like any spoken language.",
    "Babies can learn sign language before they can speak, often around 6-8 months old.",
    "Sign language interpreters must be certified and undergo extensive training.",
    "The speed of signing is comparable to the speed of speaking - about 160-200 words per minute.",
    "Sign language has regional accents and dialects, just like spoken languages."
  ];

  const emojis = [
    "👋", // Waving hand
    "👌", // OK hand sign
    "👐", // Open hands
    "✋", // Raised hand
    "👍", // Thumbs up
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Rotate facts every 2 seconds
    const factInterval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % signLanguageFacts.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#141F23] flex items-center justify-center z-50">
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1.1);
            }
            50% {
              transform: translateY(-10px) scale(1.15);
            }
          }
        `}
      </style>
      <div className="max-w-2xl mx-auto px-8 text-center">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span style={{color: 'rgb(74, 222, 128)'}}>Synthima</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Learn sign language with interactive lessons
          </p>
        </div>

        {/* Fun Fact */}
        <div className="mb-12 min-h-[80px] flex items-center justify-center">
          <div className="bg-[#293D46] rounded-xl p-6 max-w-xl">
            <h3 style={{color: 'rgb(74, 222, 128)'}} className="font-semibold mb-2">Did you know?</h3>
            <p className="text-white text-lg leading-relaxed">
              {signLanguageFacts[currentFactIndex]}
            </p>
          </div>
        </div>

        {/* Changing Emoji Animation */}
        <div className="mb-8">
          <div className="flex justify-center items-center mb-6">
            <div 
              className="text-6xl transition-all duration-500 ease-in-out"
              style={{
                animation: 'float 3s ease-in-out infinite',
                transform: 'scale(1.1)'
              }}
            >
              {emojis[currentFactIndex]}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-[#293D46] rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(to right, rgb(74, 222, 128), rgb(34, 197, 94))'
              }}
            ></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: 'rgb(74, 222, 128)'}}></div>
          <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: 'rgb(74, 222, 128)', animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: 'rgb(74, 222, 128)', animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 6 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:category" element={<Learn />} />
        <Route path="/" element={<Home2 />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/commonwords" element={<Commonwords />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/realtime-translation" element={<RealtimeTranslation />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
