
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Play, Pause, SkipBack, SkipForward, Volume2, Timer, Shuffle, Heart} from 'lucide-react'
import AudioPlayer from '../components/AudioPlayer'

const Sleep: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<any>(null)

  const sleepCategories = [
    {
      id: 1,
      title: '自然之声',
      subtitle: '大自然的温柔拥抱',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-emerald-400 to-teal-500',
      bgPattern: 'from-emerald-50/10 to-teal-100/5',
      tracks: [
        { 
          name: '森林雨声', 
          duration: '60分钟', 
          image: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/ac/ac5a61c15aeaa2da1024466a89c0548c.mp3',
          type: 'forest'
        },
        { 
          name: '海浪轻语', 
          duration: '45分钟', 
          image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/9f/9f6739bf60c69b513baad011d75fdcdd.mp3',
          type: 'peaceful'
        },
        { 
          name: '鸟语花香', 
          duration: '30分钟', 
          image: 'https://images.pexels.com/photos/36729/anemone-blossom-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/9f/9f6739bf60c69b513baad011d75fdcdd.mp3',
          type: 'peaceful'
        }
      ]
    },
    {
      id: 2,
      title: '白噪音',
      subtitle: '纯净的安眠频率',
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      color: 'from-indigo-400 to-blue-500',
      bgPattern: 'from-indigo-50/10 to-blue-100/5',
      tracks: [
        { 
          name: '粉红噪音', 
          duration: '无限循环', 
          image: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/9f/9f6739bf60c69b513baad011d75fdcdd.mp3',
          type: 'peaceful'
        },
        { 
          name: '褐色噪音', 
          duration: '无限循环', 
          image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/9f/9f6739bf60c69b513baad011d75fdcdd.mp3',
          type: 'peaceful'
        },
        { 
          name: '白噪音经典', 
          duration: '无限循环', 
          image: 'https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/9f/9f6739bf60c69b513baad011d75fdcdd.mp3',
          type: 'peaceful'
        }
      ]
    },
    {
      id: 3,
      title: '轻音乐',
      subtitle: '柔美旋律伴你入眠',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-purple-400 to-pink-500',
      bgPattern: 'from-purple-50/10 to-pink-100/5',
      tracks: [
        { 
          name: '月光奏鸣曲', 
          duration: '25分钟', 
          image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/19/19c48614153317db8c5bdaf9aa1d515a.mp3',
          type: 'deepsleep'
        },
        { 
          name: '星空下的钢琴', 
          duration: '35分钟', 
          image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/19/19c48614153317db8c5bdaf9aa1d515a.mp3',
          type: 'deepsleep'
        },
        { 
          name: '温柔小夜曲', 
          duration: '20分钟', 
          image: 'https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg?auto=compress&cs=tinysrgb&w=400',
          audioUrl: 'https://static.lumi.new/19/19c48614153317db8c5bdaf9aa1d515a.mp3',
          type: 'deepsleep'
        }
      ]
    }
  ]

  const handleTrackPlay = (track: any) => {
    if (currentTrack?.audioUrl === track.audioUrl && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
    }
  }

  const handleClosePlayer = () => {
    setCurrentTrack(null)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 pb-20 font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 头部 - 晚安音乐 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 w-16 h-16 bg-blue-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-16 right-12 w-12 h-12 bg-purple-300 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-1/4 w-10 h-10 bg-teal-300 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-400 to-teal-300 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border-2 border-white/30">
              <img 
                src="https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png" 
                alt="梦境守护者"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 mb-3">
            晚安音乐
          </h1>
          <p className="text-lavender-200/80 text-lg leading-relaxed">
            梦境守护者的温柔陪伴
          </p>
        </div>
      </motion.div>

      {/* 音乐分类 */}
      <div className="px-6 space-y-8">
        {sleepCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`bg-gradient-to-br ${category.bgPattern} backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl`}
          >
            {/* 分类头部 */}
            <div className={`bg-gradient-to-r ${category.color} p-8 relative overflow-hidden`}>
              {/* 装饰性背景元素 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-center space-x-6 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30"
                >
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className="w-12 h-12 object-contain drop-shadow-lg"
                  />
                </motion.div>
                
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* 音乐列表 */}
            <div className="p-6 space-y-4">
              {category.tracks.map((track, trackIndex) => (
                <motion.div
                  key={track.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: trackIndex * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTrackPlay(track)}
                  className="bg-white/5 rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={track.image}
                        alt={track.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                        >
                          {currentTrack?.audioUrl === track.audioUrl && isPlaying ? (
                            <Pause className="w-4 h-4 text-white" />
                          ) : (
                            <Play className="w-4 h-4 text-white" />
                          )}
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-base mb-1">
                        {track.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-lavender-200/70 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>{track.duration}</span>
                        {currentTrack?.audioUrl === track.audioUrl && isPlaying && (
                          <span className="text-green-400 flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                            正在播放
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-lavender-300/60 hover:text-pink-300 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 音频播放器 */}
      {currentTrack && (
        <AudioPlayer 
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  )
}

export default Sleep
