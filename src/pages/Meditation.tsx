
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Sparkles, Palette, Camera, Wand2, Star, ArrowRight, BookOpen, MessageCircle} from 'lucide-react'
import StorybookCreator from '../components/StorybookCreator'
import CozeChatTest from '../components/CozeChatTest'

const MagicMoments: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [showStorybookCreator, setShowStorybookCreator] = useState(false)
  const [showCozeChatTest, setShowCozeChatTest] = useState(false)

  const magicFeatures = [
    {
      id: 1,
      title: 'AI共创绘本工坊',
      subtitle: '与小熊一起创造属于你的睡前故事',
      description: '通过AI技术，和梦境守护者小熊一起创作独一无二的个人绘本故事',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      decorIcon: Sparkles,
      color: 'from-amber-300 via-amber-400 to-orange-400',
      bgPattern: 'bg-gradient-to-br from-amber-50/10 to-orange-100/5',
      status: '立即体验',
      features: [
        '个性化故事生成',
        '互动式情节选择', 
        '专属插画创作',
        '语音朗读功能',
        'Coze AI测试功能'
      ]
    },
    {
      id: 2,
      title: '魔法时光照相馆',
      subtitle: '用奇奇的魔法为照片添加梦幻色彩',
      description: '大象冰箱奇奇将为你的照片施展魔法，创造梦幻般的艺术效果',
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      decorIcon: Camera,
      color: 'from-lavender-300 via-purple-400 to-indigo-400',
      bgPattern: 'bg-gradient-to-br from-lavender-50/10 to-purple-100/5',
      status: '敬请期待',
      features: [
        'AI艺术风格化',
        '梦境滤镜特效',
        '魔法元素添加',
        '一键分享功能'
      ]
    },
    {
      id: 3,
      title: 'AR魔法互动',
      subtitle: '现实世界中的魔法体验',
      description: '通过增强现实技术，在真实世界中与我们的IP角色进行魔法互动',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      decorIcon: Wand2,
      color: 'from-emerald-300 via-teal-400 to-cyan-400',
      bgPattern: 'bg-gradient-to-br from-emerald-50/10 to-teal-100/5',
      status: '研发中',
      features: [
        'AR角色互动',
        '魔法服装试穿',
        '虚拟场景体验',
        '动作识别游戏'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 pb-20 font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 头部 - 魔法时刻 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-lavender-300 rounded-full blur-lg"></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-emerald-300 rounded-full blur-lg"></div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-lavender-400 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border border-white/30">
              <Sparkles className="w-10 h-10 text-amber-200" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-lavender-200 to-emerald-200 mb-3">
            魔法时刻
          </h1>
          <p className="text-lavender-200/80 text-lg leading-relaxed">
            与我们的魔法伙伴一起<br />
            创造属于你的奇妙体验
          </p>
        </div>
      </motion.div>

      {/* 魔法功能卡片 */}
      <div className="px-6 space-y-8">
        {magicFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`${feature.bgPattern} backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl`}
          >
            {/* 功能头部 */}
            <div className={`bg-gradient-to-r ${feature.color} p-8 relative overflow-hidden`}>
              {/* 装饰性背景元素 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-start space-x-6 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30"
                >
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-12 h-12 object-contain drop-shadow-lg"
                  />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white text-xl font-bold">
                      {feature.title}
                    </h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white/90 text-xs font-medium">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 功能特性列表 */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {feature.features.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 border border-white/10"
                  >
                    <Star className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (feature.id === 1) {
                      setShowStorybookCreator(true)
                    } else {
                      setSelectedFeature(feature)
                    }
                  }}
                  className="w-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white border border-white/20 rounded-2xl py-4 px-6 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{feature.id === 1 ? '开始创作' : '了解更多'}</span>
                  {feature.id === 1 ? <BookOpen className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </motion.button>
                
                {feature.id === 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // 滚动到页面底部的绘本故事制作测试区域
                      const element = document.getElementById('storybook-creator-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full bg-gradient-to-r from-lavender-500/20 to-lavender-600/20 hover:from-lavender-500/30 hover:to-lavender-600/30 text-lavender-200 border border-lavender-400/30 rounded-2xl py-3 px-6 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>AI测试功能</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 详情模态框 */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedFeature(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedFeature.color} rounded-full blur-lg opacity-60`}></div>
                <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border border-white/30">
                  <img 
                    src={selectedFeature.icon} 
                    alt={selectedFeature.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-white text-2xl font-bold mb-3">
                {selectedFeature.title}
              </h3>
              <p className="text-lavender-200/80 mb-8 leading-relaxed">
                {selectedFeature.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${selectedFeature.color} text-white px-8 py-3 rounded-2xl font-bold mb-4 shadow-lg`}
              >
                {selectedFeature.status}
              </motion.button>
              
              <button
                onClick={() => setSelectedFeature(null)}
                className="block w-full text-lavender-300/80 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 绘本创作器 */}
      {showStorybookCreator && (
        <div id="storybook-creator-section">
          <StorybookCreator 
            onClose={() => setShowStorybookCreator(false)}
            onStorybookCreated={() => {
              setShowStorybookCreator(false)
            }}
          />
        </div>
      )}

      {/* Coze Chat 测试功能 */}
      {showCozeChatTest && (
        <CozeChatTest 
          onClose={() => setShowCozeChatTest(false)}
        />
      )}
    </div>
  )
}

export default MagicMoments
