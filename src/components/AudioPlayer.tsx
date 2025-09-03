
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Play, Pause, SkipBack, SkipForward, Volume2, Timer, X, Shuffle, Repeat, RotateCcw, Home} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AudioPlayerProps {
  track: {
    name: string
    duration: string
    image: string
    audioUrl: string
    type?: string
  }
  isPlaying: boolean
  onPlayPause: () => void
  onClose: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, isPlaying, onPlayPause, onClose }) => {
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // 播放状态
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [totalDuration, setTotalDuration] = useState('0:00')
  const [volume, setVolume] = useState(80)
  
  // 控制面板显示
  const [showControls, setShowControls] = useState(true)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // 播放模式
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [isLoopMode, setIsLoopMode] = useState(false)
  
  // 定时器
  const [showTimer, setShowTimer] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(10)
  const [timerActive, setTimerActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)

  // 功能提示状态
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  // 根据音乐类型获取背景图片
  const getBackgroundImage = () => {
    switch (track.type) {
      case 'forest':
        return 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
      case 'deepsleep':
        return 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
      case 'peaceful':
        return 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
      default:
        return 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
    }
  }

  // 控制面板自动隐藏
  const resetControlsTimer = () => {
    if (controlsTimeout) clearTimeout(controlsTimeout)
    setShowControls(true)
    const timeout = setTimeout(() => {
      setShowControls(false)
    }, 3000)
    setControlsTimeout(timeout)
  }

  // 音频播放控制
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
        resetControlsTimer()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // 音频时间更新
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      const current = audio.currentTime
      const duration = audio.duration || 0
      
      if (duration > 0) {
        setProgress((current / duration) * 100)
        setCurrentTime(formatTime(current))
        setTotalDuration(formatTime(duration))
      }
    }

    const handleLoadedMetadata = () => {
      setTotalDuration(formatTime(audio.duration || 0))
    }

    const handleEnded = () => {
      // 如果定时器激活或者设置了循环模式，则循环播放
      if (timerActive || isLoopMode) {
        audio.currentTime = 0
        audio.play().catch(console.error)
      } else {
        onPlayPause()
        setProgress(0)
        setCurrentTime('0:00')
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onPlayPause, isLoopMode, timerActive])

  // 音量控制
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // 定时器功能
  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // 定时器结束
            setTimerActive(false)
            onPlayPause() // 停止播放
            
            // 显示通知并返回首页
            setTimeout(() => {
              navigate('/')
            }, 2000)
            
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timerActive, timeRemaining, onPlayPause, navigate])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimerTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickPercent = clickX / rect.width
    const newTime = clickPercent * audio.duration
    
    audio.currentTime = newTime
    resetControlsTimer()
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
    setVolume(newVolume)
    resetControlsTimer()
  }

  const startTimer = () => {
    setTimeRemaining(timerMinutes * 60)
    setTimerActive(true)
    setShowTimer(false)
    
    // 如果没有选择循环或随机，定时器启动时自动开启循环
    if (!isLoopMode && !isShuffleMode) {
      setIsLoopMode(true)
    }
    
    resetControlsTimer()
  }

  const stopTimer = () => {
    setTimerActive(false)
    setTimeRemaining(0)
    resetControlsTimer()
  }

  const handleShuffleClick = () => {
    setIsShuffleMode(!isShuffleMode)
    if (!isShuffleMode) {
      setIsLoopMode(false) // 开启随机时关闭循环
    }
    resetControlsTimer()
  }

  const handleLoopClick = () => {
    setIsLoopMode(!isLoopMode)
    if (!isLoopMode) {
      setIsShuffleMode(false) // 开启循环时关闭随机
    }
    resetControlsTimer()
  }

  const handleTimerClick = () => {
    setShowTimer(!showTimer)
    resetControlsTimer()
  }

  const timerOptions = [5, 10, 15, 30, 45, 60]

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
      />

      {/* 全屏播放器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        onClick={resetControlsTimer}
      >
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src={getBackgroundImage()}
            alt={track.name}
            className="w-full h-full object-cover"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        {/* 装饰性粒子效果 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* 控制面板 */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-between p-8"
            >
              {/* 顶部信息栏 */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="bg-black/30 backdrop-blur-md p-3 rounded-full text-white/90 hover:text-white transition-colors border border-white/20"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                  
                  <div>
                    <h2 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                      {track.name}
                    </h2>
                    <p className="text-white/80 text-sm drop-shadow-md">
                      {track.type === 'forest' && '森林自然音 · 雨声'}
                      {track.type === 'deepsleep' && '深度睡眠 · 钢琴'}
                      {track.type === 'peaceful' && '宁静白噪音'}
                    </p>
                  </div>
                </div>

                {/* 定时器状态 */}
                {timerActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center space-x-2 border border-white/20"
                  >
                    <Timer className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm font-mono">
                      {formatTimerTime(timeRemaining)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={stopTimer}
                      className="text-white/70 hover:text-white ml-2"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* 中央播放控制 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center space-y-8"
              >
                {/* 主播放按钮 */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onPlayPause}
                  className="bg-white/20 backdrop-blur-md p-8 rounded-full text-white shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
                </motion.button>

                {/* 播放模式控制 */}
                <div className="flex items-center space-x-6 relative">
                  {/* 随机播放按钮 */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShuffleClick}
                      onMouseEnter={() => setShowTooltip('shuffle')}
                      onMouseLeave={() => setShowTooltip(null)}
                      className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        isShuffleMode 
                          ? 'bg-white/30 text-white border-white/40' 
                          : 'bg-black/20 text-white/70 border-white/20 hover:text-white'
                      }`}
                    >
                      <Shuffle className="w-5 h-5" />
                    </motion.button>
                    
                    {/* 随机播放提示 */}
                    <AnimatePresence>
                      {showTooltip === 'shuffle' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap"
                        >
                          {isShuffleMode ? '已开启随机播放' : '随机播放'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 循环播放按钮 */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLoopClick}
                      onMouseEnter={() => setShowTooltip('loop')}
                      onMouseLeave={() => setShowTooltip(null)}
                      className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        isLoopMode 
                          ? 'bg-white/30 text-white border-white/40' 
                          : 'bg-black/20 text-white/70 border-white/20 hover:text-white'
                      }`}
                    >
                      <Repeat className="w-5 h-5" />
                    </motion.button>
                    
                    {/* 循环播放提示 */}
                    <AnimatePresence>
                      {showTooltip === 'loop' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap"
                        >
                          {isLoopMode ? '已开启循环播放' : '循环播放'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 定时器按钮 */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleTimerClick}
                      onMouseEnter={() => setShowTooltip('timer')}
                      onMouseLeave={() => setShowTooltip(null)}
                      className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        showTimer || timerActive
                          ? 'bg-white/30 text-white border-white/40' 
                          : 'bg-black/20 text-white/70 border-white/20 hover:text-white'
                      }`}
                    >
                      <Timer className="w-5 h-5" />
                    </motion.button>
                    
                    {/* 定时器提示 */}
                    <AnimatePresence>
                      {showTooltip === 'timer' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap"
                        >
                          {timerActive ? `定时中 ${formatTimerTime(timeRemaining)}` : '睡眠定时器'}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* 底部控制栏 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-6"
              >
                {/* 进度条 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>{currentTime}</span>
                    <span>{totalDuration}</span>
                  </div>
                  <div 
                    className="relative cursor-pointer group"
                    onClick={handleProgressClick}
                  >
                    <div className="h-1 bg-white/20 rounded-full backdrop-blur-sm">
                      <motion.div
                        className="h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <motion.div
                      className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${progress}%` }}
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                </div>

                {/* 音量控制 */}
                <div className="flex items-center justify-center space-x-4">
                  <Volume2 className="w-5 h-5 text-white/70" />
                  <div 
                    className="w-24 h-1 bg-white/20 rounded-full relative cursor-pointer group"
                    onClick={handleVolumeChange}
                  >
                    <div 
                      className="h-full bg-white/60 rounded-full"
                      style={{ width: `${volume}%` }}
                    />
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${volume}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 定时器设置面板 */}
        <AnimatePresence>
          {showTimer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowTimer(false)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-sm w-full mx-4"
              >
                <h3 className="text-white text-xl font-bold mb-2 text-center">睡眠定时器</h3>
                <p className="text-white/70 text-sm text-center mb-6">
                  定时启动后将自动循环播放至时间结束
                </p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {timerOptions.map((minutes) => (
                    <motion.button
                      key={minutes}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTimerMinutes(minutes)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        timerMinutes === minutes
                          ? 'bg-white/30 text-white border border-white/40'
                          : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {minutes}分钟
                    </motion.button>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startTimer}
                    className="flex-1 bg-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    开始定时
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTimer(false)}
                    className="flex-1 bg-black/30 text-white/80 py-3 rounded-xl font-medium hover:text-white transition-all duration-300 border border-white/20"
                  >
                    取消
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 定时结束通知 */}
        {timerActive && timeRemaining <= 10 && timeRemaining > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white px-6 py-3 rounded-full border border-white/30"
          >
            <div className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="text-sm">即将返回首页 {timeRemaining}s</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default AudioPlayer
