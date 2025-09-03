
import React from 'react'
import { motion } from 'framer-motion'
import {Crown, Moon, Clock, Star, Settings, Heart, Award, TrendingUp, Sparkles} from 'lucide-react'

const Profile: React.FC = () => {
  const stats = [
    { label: '魔法连击天数', value: '12', icon: TrendingUp, color: 'text-emerald-400', gradient: 'from-emerald-400 to-teal-400' },
    { label: '甜梦时光', value: '48小时', icon: Moon, color: 'text-indigo-400', gradient: 'from-indigo-400 to-blue-400' },
    { label: '魔法体验', value: '23', icon: Sparkles, color: 'text-amber-400', gradient: 'from-amber-400 to-yellow-400' },
    { label: '收藏故事', value: '8', icon: Heart, color: 'text-pink-400', gradient: 'from-pink-400 to-rose-400' }
  ]

  const achievements = [
    { 
      title: '梦境守护者勋章', 
      description: '连续7天使用晚安音乐入睡', 
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      unlocked: true,
      rarity: '稀有'
    },
    { 
      title: '小小创造家奖杯', 
      description: '首次完成AI共创绘本', 
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      unlocked: true,
      rarity: '传说'
    },
    { 
      title: '故事收集大师', 
      description: '收藏10个不同类型的睡前故事', 
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      unlocked: true,
      rarity: '史诗'
    },
    { 
      title: '宁静魔法师', 
      description: '连续30天体验魔法时刻', 
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      unlocked: false,
      rarity: '传奇'
    }
  ]

  const settings = [
    { title: '晚安魔法铃', description: '设置专属的睡前提醒', icon: Clock },
    { title: '音质魔法', description: '选择最适合的音频品质', icon: Settings },
    { title: '夜间守护', description: '自动开启护眼夜间模式', icon: Moon },
    { title: '云端魔法盒', description: '同步保存你的魔法记录', icon: TrendingUp }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case '传奇': return 'from-orange-400 to-red-400'
      case '传说': return 'from-purple-400 to-pink-400'
      case '史诗': return 'from-indigo-400 to-purple-400'
      case '稀有': return 'from-blue-400 to-indigo-400'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 pb-20 font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 头部个人信息 - IP化设计 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 relative overflow-hidden"
      >
        {/* 魔法背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 w-16 h-16 bg-amber-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-16 right-12 w-12 h-12 bg-lavender-300 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-1/4 w-10 h-10 bg-emerald-300 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-24 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-lavender-400 to-emerald-300 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border-2 border-white/30">
              <Crown className="w-12 h-12 text-amber-200" />
            </div>
          </motion.div>
          
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-lavender-200 to-emerald-200 mb-2">
            小小梦想家
          </h1>
          <p className="text-lavender-200/80 leading-relaxed">
            愿每个夜晚都有魔法相伴 ✨
          </p>
        </div>
      </motion.div>

      {/* 魔法统计 */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-amber-400" />
          魔法记录
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 relative overflow-hidden"
              >
                {/* 装饰性背景 */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -translate-y-8 translate-x-8`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-lavender-200/80 text-sm font-medium">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* IP化成就徽章 */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-amber-400" />
          魔法徽章收藏
        </h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 relative overflow-hidden ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}
            >
              {/* 稀有度装饰 */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}></div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`relative p-3 rounded-2xl ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-400/30' 
                      : 'bg-slate-700/30 border border-slate-600/30'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-transparent rounded-2xl blur-sm"></div>
                  )}
                  <img 
                    src={achievement.icon} 
                    alt={achievement.title}
                    className={`w-8 h-8 object-contain relative z-10 ${
                      achievement.unlocked ? 'drop-shadow-lg' : 'grayscale'
                    }`}
                  />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-bold text-sm">
                      {achievement.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-lavender-200/70 text-xs leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
                
                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-amber-400"
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 魔法设置 */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-amber-400" />
          魔法设置
        </h2>
        <div className="space-y-3">
          {settings.map((setting, index) => {
            const Icon = setting.icon
            return (
              <motion.div
                key={setting.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 cursor-pointer hover:from-white/15 hover:to-white/8 transition-all duration-300 relative overflow-hidden"
              >
                {/* 悬浮装饰 */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-lavender-300/10 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
                
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="bg-gradient-to-br from-lavender-400/20 to-indigo-400/10 p-3 rounded-xl border border-lavender-400/20">
                    <Icon className="w-5 h-5 text-lavender-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">
                      {setting.title}
                    </h3>
                    <p className="text-lavender-200/70 text-xs">
                      {setting.description}
                    </p>
                  </div>
                  <div className="text-lavender-300/60">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile
