
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import { User, LogOut, LogIn } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { user, signOut, isLoading } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login')

  const navItems = [
    { 
      path: '/', 
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png', 
      label: '首页',
      isImage: true
    },
    { 
      path: '/sleep', 
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png', 
      label: '晚安音乐',
      isImage: true
    },
    { 
      path: '/meditation', 
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png', 
      label: '魔法时刻',
      isImage: true
    },
    { 
      path: '/stories', 
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png', 
      label: '故事',
      isImage: true
    },

    { 
      path: '/profile', 
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png', 
      label: '我的',
      isImage: true
    },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 顶部用户状态栏 */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-slate-900/95 to-transparent backdrop-blur-xl border-b border-lavender-300/10">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">🌙</span>
            </div>
            <span className="text-lavender-200 font-medium text-sm">宁静魔法</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="flex items-center space-x-2 text-lavender-300/70">
                <div className="w-4 h-4 border-2 border-lavender-300/30 border-t-lavender-300 rounded-full animate-spin" />
                <span className="text-xs">加载中...</span>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                {/* 用户头像和状态 */}
                <div className="flex items-center space-x-2 text-lavender-200">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.isAnonymous 
                        ? 'bg-gradient-to-br from-slate-500 to-slate-600' 
                        : 'bg-gradient-to-br from-lavender-400 to-lavender-600'
                    }`}>
                      {user.isAnonymous ? (
                        <User size={16} className="text-slate-200" />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {/* 在线状态指示器 */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.isAnonymous ? '访客用户' : user.email?.split('@')[0]}
                    </span>
                    <span className="text-xs text-lavender-300/70">
                      {user.isAnonymous ? '点击登录解锁更多功能' : '已登录'}
                    </span>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex items-center space-x-2">
                  {user.isAnonymous ? (
                    <>
                      <button
                        onClick={() => {
                          setAuthModalView('login');
                          setIsAuthModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-lavender-500/20 hover:bg-lavender-500/30 text-lavender-200 rounded-lg transition-all duration-200 text-sm"
                      >
                        登录
                      </button>
                      <button
                        onClick={() => {
                          setAuthModalView('register');
                          setIsAuthModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg transition-all duration-200 text-sm"
                      >
                        注册
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-lavender-300/70 hover:text-lavender-200 hover:bg-lavender-500/10 rounded-lg transition-all duration-200"
                      title="登出"
                    >
                      <LogOut size={16} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthModalView('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-lavender-500/20 hover:bg-lavender-500/30 text-lavender-200 rounded-lg transition-all duration-200"
                >
                  <LogIn size={16} />
                  <span className="text-sm">登录</span>
                </button>
                <button
                  onClick={() => {
                    setAuthModalView('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg transition-all duration-200"
                >
                  <User size={16} />
                  <span className="text-sm">注册</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 pb-20 pt-16">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </main>

      {/* 底部导航 - 宁静魔法风格 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-indigo-950/90 to-transparent backdrop-blur-xl border-t border-lavender-300/20">
        <div className="flex justify-around items-center h-18 px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center space-y-1 py-2 px-2 rounded-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-amber-300/30 to-lavender-400/30 shadow-lg shadow-amber-300/20' 
                      : 'hover:bg-lavender-300/10'
                  }`}
                >
                  {item.isImage ? (
                    <img 
                      src={item.icon} 
                      alt={item.label}
                      className={`w-7 h-7 object-contain transition-all duration-300 ${
                        isActive ? 'drop-shadow-lg' : 'opacity-75 hover:opacity-100'
                      }`}
                    />
                  ) : (
                    <div className="w-7 h-7" />
                  )}
                  
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full shadow-lg"
                    />
                  )}
                </motion.div>
                
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-amber-200 font-semibold' 
                    : 'text-lavender-200/80 hover:text-lavender-100'
                }`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* 认证模态框 */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </div>
  )
}

export default Layout
