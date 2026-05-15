import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feeds from './pages/Feeds'
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/feeds' element={<Feeds />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App