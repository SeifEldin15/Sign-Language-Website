import { useState } from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'
import Learn from './pages/learn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lesson from './pages/lesson'

import 'font-awesome/css/font-awesome.min.css';

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
        <Route path="/lesson" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
