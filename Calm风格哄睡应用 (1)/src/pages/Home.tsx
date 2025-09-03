
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {Star, Play, Clock, Sparkles} from 'lucide-react'

const Home: React.FC = () => {
  const quickActions = [
    {
      title: '晚安音乐',
      subtitle: '梦境守护者的温柔陪伴',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-indigo-400 via-blue-500 to-cyan-500',
      path: '/sleep',
      bgDecor: 'from-indigo-100/10 to-blue-100/5'
    },
    {
      title: '魔法时刻',
      subtitle: '与奇奇一起创造奇迹',
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      color: 'from-lavender-400 via-purple-500 to-pink-500',
      path: '/meditation',
      bgDecor: 'from-lavender-100/10 to-purple-100/5'
    },
    {
      title: '睡前故事',
      subtitle: '温柔入梦的魔法故事',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-amber-400 via-orange-500 to-red-500',
      path: '/stories',
      bgDecor: 'from-amber-100/10 to-orange-100/5'
    }
  ]

  const recommendations = [
    {
      title: '雨夜安眠曲',
      duration: '45分钟',
      image: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: '自然声音',
      gradient: 'from-blue-400/20 to-cyan-400/10'
    },
    {
      title: 'AI魔法绘本预览',
      duration: '即将开放',
      image: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: '魔法体验',
      gradient: 'from-purple-400/20 to-pink-400/10'
    },
    {
      title: '星空下的故事',
      duration: '15分钟',
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: '睡前故事',
      gradient: 'from-amber-400/20 to-orange-400/10'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 头部欢迎区域 - IP化设计 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-12 pb-8 px-6 relative overflow-hidden"
      >
        {/* 魔法背景装饰 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-lavender-300 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-emerald-300 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-lavender-400 to-emerald-300 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border-2 border-white/30">
              <img 
                src="https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png" 
                alt="梦境守护者"
                className="w-12 h-12 object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-lavender-200 to-emerald-200 mb-3">
            晚安，小小梦想家
          </h1>
          <p className="text-lavender-200/80 text-lg leading-relaxed">
            让我们一起进入宁静的魔法夜晚 ✨
          </p>
        </div>
      </motion.div>

      {/* 快速操作 - IP形象集成 */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Star className="w-6 h-6 mr-3 text-amber-400" />
          魔法快速通道
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Link to={action.path}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-r ${action.color} p-8 rounded-3xl shadow-2xl relative overflow-hidden`}
                >
                  {/* 装饰性背景元素 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {action.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {action.subtitle}
                      </p>
                    </div>
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30 ml-6"
                    >
                      <img 
                        src={action.icon} 
                        alt={action.title}
                        className="w-10 h-10 object-contain drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 今日推荐 - 宁静魔法风格 */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Sparkles className="w-6 h-6 mr-3 text-amber-400" />
          今日魔法推荐
        </h2>
        
        <div className="space-y-5">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-xl relative overflow-hidden`}
            >
              {/* 装饰性背景 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
              
              <div className="flex items-center space-x-5 relative z-10">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-18 h-18 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 rounded-2xl flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                    >
                      <Play className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-lavender-200/80 text-sm mb-2 font-medium">{item.category}</p>
                  <div className="flex items-center text-lavender-200/70 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {item.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
