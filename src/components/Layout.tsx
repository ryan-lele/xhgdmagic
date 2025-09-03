
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()

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

  return (
    <div className="flex flex-col min-h-screen font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      <main className="flex-1 pb-20">
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
    </div>
  )
}

export default Layout
