
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { usePageTracking } from './hooks/usePageTracking'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sleep from './pages/Sleep'
import MagicMoments from './pages/Meditation'
import Stories from './pages/Stories'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import MusicManager from './pages/MusicManager'


// 内部应用组件，用于页面跟踪
const AppContent: React.FC = () => {
  // 启用页面访问跟踪
  usePageTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
      <Layout>
                       <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/sleep" element={<Sleep />} />
                 <Route path="/meditation" element={<MagicMoments />} />
                 <Route path="/stories" element={<Stories />} />
                 <Route path="/profile" element={<Profile />} />
                 <Route path="/auth" element={<Auth />} />
                 <Route path="/music" element={<MusicManager />} />
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
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
