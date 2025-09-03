import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Play, 
  Pause, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Heart,
  Clock,
  User,
  Tag,
  Volume2,
  VolumeX,
  Download,
  Settings
} from 'lucide-react';
import { MusicManager, MusicTrack, musicCategories } from '../data/music';
import PixabayMusicSelector from '../components/PixabayMusicSelector';
import toast from 'react-hot-toast';

const MusicManagerPage: React.FC = () => {
  // 状态管理
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<MusicTrack[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // 加载音乐数据
  useEffect(() => {
    loadMusicTracks();
  }, []);

  // 过滤音乐
  useEffect(() => {
    let filtered = musicTracks;

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(track => track.category === selectedCategory);
    }

    // 按搜索关键词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.tags.some(tag => tag.toLowerCase().includes(query)) ||
        track.description?.toLowerCase().includes(query)
      );
    }

    setFilteredTracks(filtered);
  }, [musicTracks, selectedCategory, searchQuery]);

  // 加载音乐数据
  const loadMusicTracks = () => {
    const tracks = MusicManager.getAllMusic();
    setMusicTracks(tracks);
  };

  // 播放/暂停音乐
  const togglePlayPause = (track: MusicTrack) => {
    if (currentPlayingId === track.id) {
      setCurrentPlayingId(null);
    } else {
      // 验证音频URL
      if (!track.url || track.url.trim() === '') {
        toast.error('音频链接无效');
        return;
      }
      
      // 创建音频元素进行播放
      const audio = new Audio(track.url);
      audio.volume = isMuted ? 0 : volume;
      audio.preload = 'metadata';
      
      // 设置超时处理
      const playTimeout = setTimeout(() => {
        console.error('音频加载超时');
        toast.error('音频加载超时，请检查音频文件是否存在');
        setCurrentPlayingId(null);
      }, 5000); // 5秒超时
      
      audio.play().then(() => {
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
      
      // 监听播放结束
      audio.addEventListener('ended', () => {
        clearTimeout(playTimeout);
        setCurrentPlayingId(null);
      });
      
      // 监听播放错误
      audio.addEventListener('error', (e) => {
        clearTimeout(playTimeout);
        console.error('音频播放出错:', e);
        toast.error('音频播放出错，请检查音频文件');
        setCurrentPlayingId(null);
      });
      
      // 监听加载状态
      audio.addEventListener('loadstart', () => {
        console.log('开始加载音频:', track.title);
      });
      
      audio.addEventListener('canplay', () => {
        console.log('音频可以播放:', track.title);
      });
      
      audio.addEventListener('loaderror', () => {
        console.error('音频加载失败:', track.title);
        toast.error('音频文件加载失败，请检查文件路径');
        setCurrentPlayingId(null);
      });
    }
  };

  // 删除音乐
  const deleteTrack = (trackId: string) => {
    if (window.confirm('确定要删除这首音乐吗？')) {
      const success = MusicManager.removeMusic(trackId);
      if (success) {
        loadMusicTracks();
        toast.success('音乐已删除');
      } else {
        toast.error('删除失败');
      }
    }
  };

  // 音乐添加成功回调
  const handleMusicAdded = (newTrack: MusicTrack) => {
    loadMusicTracks();
    setShowMusicSelector(false);
  };

  // 格式化时长
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 获取分类统计
  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {};
    musicTracks.forEach(track => {
      stats[track.category] = (stats[track.category] || 0) + 1;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 pb-20 font-['Inter',_'Noto_Sans_SC',_sans-serif]">
      {/* 头部 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 pb-8 px-6 relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 w-16 h-16 bg-lavender-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-16 right-12 w-12 h-12 bg-emerald-300 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-1/4 w-10 h-10 bg-amber-300 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lavender-300 via-emerald-400 to-amber-300 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border-2 border-white/30">
              <Music className="w-10 h-10 text-lavender-200" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavender-200 via-emerald-200 to-amber-200 mb-3">
            音乐管理
          </h1>
          <p className="text-lavender-200/80 text-lg leading-relaxed">
            管理您的助眠音乐库
          </p>
        </div>
      </motion.div>

      {/* 统计信息 */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {musicTracks.length}
              </div>
              <div className="text-lavender-300/70 text-sm">总音乐数</div>
            </div>
          </motion.div>
          
          {Object.entries(categoryStats).map(([category, count]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {count}
                </div>
                <div className="text-lavender-300/70 text-sm">
                  {musicCategories[category as keyof typeof musicCategories]?.name || category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavender-400/60" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索音乐..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-lavender-300/20 rounded-xl text-lavender-100 placeholder-lavender-400/60 focus:ring-2 focus:ring-lavender-400/50 focus:border-lavender-400/50 transition-all duration-200"
              />
            </div>

            {/* 分类过滤 */}
            <div className="flex items-center space-x-2">
              <Filter className="text-lavender-300/70" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-lavender-300/20 rounded-xl text-lavender-100 focus:ring-2 focus:ring-lavender-400/50 focus:border-lavender-400/50 transition-all duration-200"
              >
                <option value="all">所有分类</option>
                {Object.entries(musicCategories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 添加音乐按钮 */}
            <button
              onClick={() => setShowMusicSelector(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-200"
            >
              <Plus size={18} />
              <span>添加音乐</span>
            </button>
          </div>
        </div>
      </div>

      {/* 音乐列表 */}
      <div className="px-6">
        {filteredTracks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Music className="w-16 h-16 text-lavender-300/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              {searchQuery || selectedCategory !== 'all' ? '没有找到匹配的音乐' : '还没有音乐'}
            </h3>
            <p className="text-lavender-300/70 mb-6">
              {searchQuery || selectedCategory !== 'all' 
                ? '尝试调整搜索条件或过滤器' 
                : '点击"添加音乐"按钮开始构建您的音乐库'
              }
            </p>
            {(!searchQuery && selectedCategory === 'all') && (
              <button
                onClick={() => setShowMusicSelector(true)}
                className="px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl font-medium transition-all duration-200"
              >
                添加第一首音乐
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-lavender-300/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {/* 播放按钮 */}
                  <button
                    onClick={() => togglePlayPause(track)}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      currentPlayingId === track.id
                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                        : 'bg-lavender-500/20 text-lavender-300 hover:bg-lavender-500/30'
                    }`}
                  >
                    {currentPlayingId === track.id ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                  </button>

                  {/* 音乐信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-white font-bold text-lg truncate">
                        {track.title}
                      </h3>
                      <span className="px-2 py-1 bg-lavender-500/20 text-lavender-300 text-xs rounded-full">
                        {musicCategories[track.category]?.name || track.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-lavender-300/70 text-sm">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{track.artist}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{formatDuration(track.duration)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag size={14} />
                        <span>{track.source}</span>
                      </div>
                    </div>

                    {track.description && (
                      <p className="text-lavender-300/70 text-sm mt-2 line-clamp-2">
                        {track.description}
                      </p>
                    )}

                    {track.tags && track.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {track.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-700/50 text-lavender-300/70 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        // 这里可以添加下载功能
                        toast('下载功能开发中...', { icon: 'ℹ️' });
                      }}
                      className="p-2 text-lavender-300/70 hover:text-lavender-200 hover:bg-lavender-500/10 rounded-lg transition-all duration-200"
                      title="下载"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => deleteTrack(track.id)}
                      className="p-2 text-red-300/70 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      title="删除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 音乐选择器模态框 */}
      {showMusicSelector && (
        <PixabayMusicSelector
          onMusicAdded={handleMusicAdded}
          onClose={() => setShowMusicSelector(false)}
        />
      )}
    </div>
  );
};

export default MusicManagerPage;
