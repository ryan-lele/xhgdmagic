import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Play, 
  Pause, 
  Plus, 
  Music, 
  Clock, 
  User, 
  Tag,
  Volume2,
  VolumeX,
  Download,
  Heart,
  Filter
} from 'lucide-react';
import { MusicSearchService, ExternalMusicSource } from '../services/musicSearchService';
import { MusicManager, MusicTrack, musicCategories } from '../data/music';
import toast from 'react-hot-toast';

interface PixabayMusicSelectorProps {
  onMusicAdded?: (track: MusicTrack) => void;
  onClose?: () => void;
}

const PixabayMusicSelector: React.FC<PixabayMusicSelectorProps> = ({ 
  onMusicAdded, 
  onClose 
}) => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ExternalMusicSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('sleep');
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // 音频引用
  const audioRef = useRef<HTMLAudioElement>(null);

  // 预定义的搜索关键词
  const predefinedQueries = [
    'sleep', 'relax', 'meditation', 'lofi', 'ambient', 
    'nature', 'rain', 'ocean', 'forest', 'birds'
  ];

  // 组件挂载时加载推荐音乐
  useEffect(() => {
    loadRecommendedMusic();
  }, [selectedCategory]);

  // 加载推荐音乐
  const loadRecommendedMusic = async () => {
    setIsLoading(true);
    try {
      const results = await MusicSearchService.getRecommendedMusic(selectedCategory);
      setSearchResults(results);
    } catch (error) {
      console.error('加载推荐音乐失败:', error);
      // 使用模拟数据
      const mockResults = MusicSearchService.getMockMusicResults(selectedCategory);
      setSearchResults(mockResults);
    } finally {
      setIsLoading(false);
    }
  };

  // 搜索音乐
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('请输入搜索关键词');
      return;
    }

    setIsLoading(true);
    try {
      const results = await MusicSearchService.searchSleepMusic(searchQuery);
      setSearchResults(results);
      
      if (results.length === 0) {
        // 如果没有结果，使用模拟数据
        const mockResults = MusicSearchService.getMockMusicResults(searchQuery);
        setSearchResults(mockResults);
        toast.info('使用模拟数据进行演示');
      }
    } catch (error) {
      console.error('搜索失败:', error);
      // 使用模拟数据
      const mockResults = MusicSearchService.getMockMusicResults(searchQuery);
      setSearchResults(mockResults);
      toast.info('使用模拟数据进行演示');
    } finally {
      setIsLoading(false);
    }
  };

  // 播放/暂停音乐
  const togglePlayPause = (track: ExternalMusicSource) => {
    if (currentPlayingId === track.id) {
      // 暂停当前播放
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentPlayingId(null);
    } else {
      // 验证音频URL
      if (!track.url || track.url.trim() === '') {
        toast.error('音频链接无效');
        return;
      }
      
      // 播放新音乐
      if (audioRef.current) {
        // 停止当前播放
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // 设置新的音频源
        audioRef.current.src = track.url;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.preload = 'metadata';
        
        // 设置超时处理
        const playTimeout = setTimeout(() => {
          console.error('音频加载超时');
          toast.error('音频加载超时，请检查音频文件是否存在');
          setCurrentPlayingId(null);
        }, 5000); // 5秒超时
        
        // 尝试播放
        audioRef.current.play().then(() => {
          clearTimeout(playTimeout);
          setCurrentPlayingId(track.id);
          toast.success(`正在播放: ${track.title}`);
        }).catch(error => {
          clearTimeout(playTimeout);
          console.error('播放失败:', error);
          console.error('音频URL:', track.url);
          
          // 根据错误类型提供不同的提示
          if (error.name === 'NotSupportedError') {
            toast.error('音频格式不支持，请检查音频文件格式');
          } else if (error.name === 'NotAllowedError') {
            toast.error('浏览器阻止了音频播放，请点击页面后重试');
          } else if (error.name === 'AbortError') {
            toast.error('音频加载被中断');
          } else {
            toast.error('播放失败，请检查音频文件是否存在');
          }
          setCurrentPlayingId(null);
        });
      } else {
        toast.error('音频播放器未初始化');
      }
    }
  };

  // 添加到项目
  const addToProject = (track: ExternalMusicSource) => {
    try {
      // 确定音乐分类
      const category = determineCategory(track);
      
      const newTrack = MusicManager.addMusic({
        title: track.title,
        artist: track.artist,
        url: track.url,
        duration: track.duration || 0,
        category: category,
        tags: track.tags || [],
        thumbnail: track.thumbnail,
        description: track.description,
        source: 'other'
      });

      toast.success(`"${track.title}" 已添加到项目`);
      onMusicAdded?.(newTrack);
    } catch (error) {
      console.error('添加音乐失败:', error);
      toast.error('添加音乐失败');
    }
  };

  // 确定音乐分类
  const determineCategory = (track: ExternalMusicSource): MusicTrack['category'] => {
    const title = track.title.toLowerCase();
    const tags = track.tags?.join(' ').toLowerCase() || '';
    const description = track.description?.toLowerCase() || '';
    const text = `${title} ${tags} ${description}`;

    if (text.includes('sleep') || text.includes('bedtime') || text.includes('lullaby')) {
      return 'sleep';
    } else if (text.includes('relax') || text.includes('peaceful') || text.includes('serene')) {
      return 'relax';
    } else if (text.includes('meditation') || text.includes('mindfulness') || text.includes('zen')) {
      return 'meditation';
    } else if (text.includes('lofi') || text.includes('chill') || text.includes('study')) {
      return 'lofi';
    } else if (text.includes('ambient') || text.includes('atmospheric') || text.includes('soundscape')) {
      return 'ambient';
    } else if (text.includes('nature') || text.includes('rain') || text.includes('ocean') || text.includes('forest')) {
      return 'nature';
    }

    return 'relax'; // 默认分类
  };

  // 格式化时长
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentPlayingId(null);
    };

    const handleError = () => {
      setCurrentPlayingId(null);
      toast.error('音频播放出错');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-lavender-300/20 overflow-hidden"
      >
        {/* 头部 */}
        <div className="p-6 border-b border-lavender-300/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-lavender-500/20 rounded-xl">
                <Music className="w-6 h-6 text-lavender-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">音乐选择器</h2>
                <p className="text-lavender-300/70 text-sm">搜索并添加助眠音乐到您的项目</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-lavender-300/70 hover:text-lavender-200 hover:bg-lavender-500/10 rounded-lg transition-all duration-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* 搜索区域 */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavender-400/60" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="搜索音乐... (如: sleep, relax, meditation)"
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-lavender-300/20 rounded-xl text-lavender-100 placeholder-lavender-400/60 focus:ring-2 focus:ring-lavender-400/50 focus:border-lavender-400/50 transition-all duration-200"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? '搜索中...' : '搜索'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-lavender-300 rounded-xl transition-all duration-200"
            >
              <Filter size={18} />
            </button>
          </div>

          {/* 快速搜索标签 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {predefinedQueries.map((query) => (
              <button
                key={query}
                onClick={() => {
                  setSearchQuery(query);
                  handleSearch();
                }}
                className="px-3 py-1.5 bg-lavender-500/20 hover:bg-lavender-500/30 text-lavender-300 rounded-lg text-sm transition-all duration-200"
              >
                {query}
              </button>
            ))}
          </div>

          {/* 分类过滤器 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-lavender-300/20"
              >
                <div className="flex flex-wrap gap-2">
                  {Object.entries(musicCategories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        loadRecommendedMusic();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === key
                          ? 'bg-lavender-500 text-white'
                          : 'bg-slate-700/50 text-lavender-300 hover:bg-slate-700/70'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 音频控制器 */}
        <div className="px-6 py-3 bg-slate-700/30 border-b border-lavender-300/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-lavender-300/70 hover:text-lavender-200 transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                setIsMuted(newVolume === 0);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
              className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lavender-300/70 text-sm">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* 搜索结果 */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3 text-lavender-300/70">
                <div className="w-6 h-6 border-2 border-lavender-300/30 border-t-lavender-300 rounded-full animate-spin" />
                <span>搜索中...</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-lavender-300/30 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">没有找到音乐</h3>
              <p className="text-lavender-300/70">尝试使用不同的关键词搜索</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-lavender-300/30 transition-all duration-300"
                >
                  {/* 音乐信息 */}
                  <div className="flex items-start space-x-3 mb-3">
                    {track.thumbnail && (
                      <img
                        src={track.thumbnail}
                        alt={track.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm mb-1 truncate">
                        {track.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-lavender-300/70 text-xs">
                        <User size={12} />
                        <span className="truncate">{track.artist}</span>
                      </div>
                      {track.duration && (
                        <div className="flex items-center space-x-1 text-lavender-300/70 text-xs mt-1">
                          <Clock size={12} />
                          <span>{formatDuration(track.duration)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 描述 */}
                  {track.description && (
                    <p className="text-lavender-300/70 text-xs mb-3 line-clamp-2">
                      {track.description}
                    </p>
                  )}

                  {/* 标签 */}
                  {track.tags && track.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {track.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-lavender-500/20 text-lavender-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePlayPause(track)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                        currentPlayingId === track.id
                          ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                          : 'bg-lavender-500/20 text-lavender-300 hover:bg-lavender-500/30'
                      }`}
                    >
                      {currentPlayingId === track.id ? (
                        <>
                          <Pause size={16} />
                          <span>暂停</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span>试听</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => addToProject(track)}
                      className="flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg font-medium text-sm transition-all duration-200"
                    >
                      <Plus size={16} />
                      <span>添加</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 隐藏的音频元素 */}
        <audio ref={audioRef} preload="none" />
      </motion.div>
    </div>
  );
};

export default PixabayMusicSelector;
