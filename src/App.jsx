import { useState } from 'react'
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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/" element={<Home2 />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
