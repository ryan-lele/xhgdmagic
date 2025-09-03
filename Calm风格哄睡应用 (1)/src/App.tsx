
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sleep from './pages/Sleep'
import MagicMoments from './pages/Meditation'
import Stories from './pages/Stories'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sleep" element={<Sleep />} />
            <Route path="/meditation" element={<MagicMoments />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              color: '#e0e7ff',
              border: '1px solid rgba(168, 132, 255, 0.3)',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '500'
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
