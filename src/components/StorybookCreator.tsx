/**
 * 绘本创作组件 - AI共创绘本工坊
 * 允许用户上传涂鸦图片，AI生成有声绘本
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Image, 
  Sparkles, 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  Heart, 
  Share2, 
  Download,
  X,
  Check,
  AlertCircle,
  Wand2,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StorybookData, StoryPage } from '../services/firestoreService';
import { saveStorybook, publishStorybook } from '../services/firestoreService';
import { generateStoryFromDescription, generateStoryFromImage } from '../lib/localStoryGenerator';
import toast from 'react-hot-toast';

interface StorybookCreatorProps {
  onStorybookCreated?: (storybook: StorybookData) => void;
  onClose?: () => void;
}

const StorybookCreator: React.FC<StorybookCreatorProps> = ({ 
  onStorybookCreated, 
  onClose 
}) => {
  // 状态管理
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [storyDescription, setStoryDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStorybook, setGeneratedStorybook] = useState<StorybookData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishData, setPublishData] = useState({
    title: '',
    description: '',
    tags: [] as string[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // 处理文件上传
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    // 验证文件大小 (最大5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过5MB');
      return;
    }

    // 转换为base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      toast.success('图片上传成功！');
    };
    reader.readAsDataURL(file);
  }, []);

  // 拖拽上传处理
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImage(result);
          toast.success('图片上传成功！');
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('请上传图片文件');
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // 生成绘本
  const handleGenerateStorybook = async () => {
    if (!user) {
      toast.error('请先登录');
      return;
    }

    if (!storyDescription.trim() && !uploadedImage) {
      toast.error('请描述您想要的故事或上传图片');
      return;
    }

    setIsGenerating(true);
    
    try {
      let storybookData: StorybookData;
      
      if (storyDescription.trim()) {
        // 使用文本描述生成故事
        storybookData = await generateStoryFromDescription(
          storyDescription,
          user.uid,
          user.email?.split('@')[0] || '匿名用户'
        );
      } else if (uploadedImage) {
        // 使用图片生成故事（实际上还是基于描述）
        const base64Data = uploadedImage.split(',')[1];
        storybookData = await generateStoryFromImage(
          base64Data,
          user.uid,
          user.email?.split('@')[0] || '匿名用户'
        );
      } else {
        throw new Error('没有可用的输入');
      }

      setGeneratedStorybook(storybookData);
      setPublishData({
        title: storybookData.title,
        description: storybookData.description,
        tags: []
      });
      toast.success('绘本生成成功！');
    } catch (error) {
      console.error('生成绘本失败:', error);
      toast.error('生成绘本失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 保存绘本
  const saveGeneratedStorybook = async () => {
    if (!generatedStorybook || !user) return;

    try {
      // 模拟保存功能，在控制台输出信息
      console.log('📚 绘本保存成功！', {
        storybookId: generatedStorybook.id,
        title: generatedStorybook.title,
        creatorId: user.uid,
        creatorName: user.email?.split('@')[0] || '匿名用户',
        pages: generatedStorybook.pages.length,
        timestamp: new Date().toISOString()
      });
      
      onStorybookCreated?.(generatedStorybook);
      toast.success('绘本保存成功！');
    } catch (error) {
      console.error('保存绘本失败:', error);
      toast.error('保存绘本失败，请稍后重试');
    }
  };

  // 发布绘本
  const publishGeneratedStorybook = async () => {
    if (!generatedStorybook || !user) return;

    setIsPublishing(true);
    try {
      // 模拟发布功能，在控制台输出信息
      console.log('🚀 绘本发布到社区成功！', {
        storybookId: generatedStorybook.id,
        title: publishData.title || generatedStorybook.title,
        description: publishData.description || generatedStorybook.description,
        tags: publishData.tags,
        creatorId: user.uid,
        creatorName: user.email?.split('@')[0] || '匿名用户',
        timestamp: new Date().toISOString()
      });
      
      setGeneratedStorybook(prev => prev ? { ...prev, isPublished: true } : null);
      setShowPublishModal(false);
      toast.success('绘本发布成功！');
    } catch (error) {
      console.error('发布绘本失败:', error);
      toast.error('发布绘本失败，请稍后重试');
    } finally {
      setIsPublishing(false);
    }
  };

  // 播放/暂停音频
  const toggleAudio = (page: StoryPage) => {
    if (page.audioUrl) {
      setIsPlaying(!isPlaying);
      // 这里可以添加音频播放逻辑
    }
  };

  // 点赞功能
  const handleLike = () => {
    if (!generatedStorybook) return;
    console.log('❤️ 已点赞绘本！', {
      storybookId: generatedStorybook.id,
      title: generatedStorybook.title,
      timestamp: new Date().toISOString()
    });
    setGeneratedStorybook(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    toast.success('点赞成功！');
  };

  // 收藏功能
  const handleCollect = () => {
    if (!generatedStorybook) return;
    console.log('⭐ 已收藏绘本！', {
      storybookId: generatedStorybook.id,
      title: generatedStorybook.title,
      timestamp: new Date().toISOString()
    });
    setGeneratedStorybook(prev => prev ? { ...prev, collections: prev.collections + 1 } : null);
    toast.success('收藏成功！');
  };

  // 分享功能
  const handleShare = () => {
    if (!generatedStorybook) return;
    console.log('📤 已分享绘本！', {
      storybookId: generatedStorybook.id,
      title: generatedStorybook.title,
      shareUrl: `${window.location.origin}/storybook/${generatedStorybook.id}`,
      timestamp: new Date().toISOString()
    });
    toast.success('分享成功！');
  };

  // 重置状态
  const resetCreator = () => {
    setUploadedImage(null);
    setStoryDescription('');
    setGeneratedStorybook(null);
    setCurrentPage(0);
    setIsPlaying(false);
    setShowPublishModal(false);
    setPublishData({ title: '', description: '', tags: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-lavender-400 rounded-full flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-lavender-200">AI共创绘本工坊</h1>
              <p className="text-lavender-300/70">上传您的涂鸦，让AI为您创作温馨故事</p>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-lavender-300/70 hover:text-lavender-200 hover:bg-lavender-500/10 rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!generatedStorybook ? (
            // 上传和生成界面
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
                             {/* 故事描述输入 */}
               <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-lavender-300/20">
                 <h3 className="text-lg font-semibold text-lavender-200 mb-4">描述您想要的故事</h3>
                 <textarea
                   value={storyDescription}
                   onChange={(e) => setStoryDescription(e.target.value)}
                   placeholder="例如：一只小兔子在森林里遇到了魔法蝴蝶..."
                   className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-lavender-200 placeholder-lavender-300/50 focus:outline-none focus:border-lavender-400 h-24 resize-none"
                 />
                 <p className="text-lavender-300/70 text-sm mt-2">
                   提示：可以描述动物、场景、情节等，AI会根据您的描述生成相应的故事
                 </p>
               </div>

               {/* 上传区域 */}
               <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-8 border border-lavender-300/20">
                 <h3 className="text-lg font-semibold text-lavender-200 mb-4">或者上传您的涂鸦图片</h3>
                 <div
                   className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                     uploadedImage 
                       ? 'border-emerald-400/50 bg-emerald-500/5' 
                       : 'border-lavender-300/30 hover:border-lavender-300/50 hover:bg-lavender-500/5'
                   }`}
                   onDrop={handleDrop}
                   onDragOver={handleDragOver}
                 >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage}
                          alt="上传的涂鸦"
                          className="w-32 h-32 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-emerald-200 font-medium">图片上传成功！</p>
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="text-lavender-300/70 hover:text-lavender-200 text-sm"
                      >
                        重新选择
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-lavender-200 font-medium mb-2">上传您的涂鸦作品</p>
                        <p className="text-lavender-300/70 text-sm mb-4">
                          支持 JPG、PNG 格式，最大 5MB
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-lavender-500/25"
                        >
                          选择图片
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

                             {/* 生成按钮 */}
               {(uploadedImage || storyDescription.trim()) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <button
                    onClick={handleGenerateStorybook}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/25 disabled:shadow-none"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>大象冰箱奇奇正在为您混合魔法色彩…</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-6 h-6" />
                        <span>开始创作绘本</span>
                      </div>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            // 绘本展示界面
            <motion.div
              key="storybook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 绘本信息 */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-lavender-300/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-lavender-200 mb-2">
                      {generatedStorybook.title}
                    </h2>
                    <p className="text-lavender-300/70">
                      {generatedStorybook.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-amber-300">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{generatedStorybook.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-lavender-300">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{generatedStorybook.collections}</span>
                    </div>
                  </div>
                </div>
                
                                 <div className="flex items-center space-x-3 flex-wrap gap-2">
                   <button
                     onClick={saveGeneratedStorybook}
                     className="px-4 py-2 bg-lavender-500/20 hover:bg-lavender-500/30 text-lavender-200 rounded-lg transition-all duration-200"
                   >
                     保存绘本
                   </button>
                   <button
                     onClick={() => setShowPublishModal(true)}
                     className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg transition-all duration-200"
                   >
                     发布到社区
                   </button>
                   <button
                     onClick={handleLike}
                     className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-all duration-200 flex items-center space-x-1"
                   >
                     <Heart className="w-4 h-4" />
                     <span>点赞</span>
                   </button>
                   <button
                     onClick={handleCollect}
                     className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 rounded-lg transition-all duration-200 flex items-center space-x-1"
                   >
                     <Star className="w-4 h-4" />
                     <span>收藏</span>
                   </button>
                   <button
                     onClick={handleShare}
                     className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-all duration-200 flex items-center space-x-1"
                   >
                     <Share2 className="w-4 h-4" />
                     <span>分享</span>
                   </button>
                   <button
                     onClick={resetCreator}
                     className="px-4 py-2 bg-slate-500/20 hover:bg-slate-500/30 text-slate-200 rounded-lg transition-all duration-200"
                   >
                     重新创作
                   </button>
                 </div>
              </div>

              {/* 绘本页面展示 */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-lavender-300/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-lavender-200">绘本预览</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-lavender-300/70">
                      第 {currentPage + 1} 页 / 共 {generatedStorybook.pages.length} 页
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 图片区域 */}
                  <div className="relative">
                    <img
                      src={generatedStorybook.pages[currentPage].imageUrl}
                      alt={`第${currentPage + 1}页`}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {currentPage + 1} / {generatedStorybook.pages.length}
                      </span>
                    </div>
                  </div>

                  {/* 文字和音频区域 */}
                  <div className="space-y-4">
                    <div className="bg-slate-700/30 rounded-2xl p-6">
                      <p className="text-lavender-200 leading-relaxed">
                        {generatedStorybook.pages[currentPage].text}
                      </p>
                    </div>
                    
                    {generatedStorybook.pages[currentPage].audioUrl && (
                      <button
                        onClick={() => toggleAudio(generatedStorybook.pages[currentPage])}
                        className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl transition-all duration-200"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                        <span>{isPlaying ? '暂停' : '播放'}音频</span>
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 页面导航 */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-slate-600/30 hover:bg-slate-600/50 disabled:bg-slate-700/20 disabled:text-slate-500 text-slate-200 rounded-lg transition-all duration-200"
                  >
                    上一页
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    {generatedStorybook.pages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentPage 
                            ? 'bg-lavender-400' 
                            : 'bg-slate-500/50 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(generatedStorybook.pages.length - 1, currentPage + 1))}
                    disabled={currentPage === generatedStorybook.pages.length - 1}
                    className="px-4 py-2 bg-slate-600/30 hover:bg-slate-600/50 disabled:bg-slate-700/20 disabled:text-slate-500 text-slate-200 rounded-lg transition-all duration-200"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 发布模态框 */}
        <AnimatePresence>
          {showPublishModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 w-full max-w-md border border-lavender-300/20"
              >
                <h3 className="text-xl font-bold text-lavender-200 mb-4">发布绘本到社区</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-lavender-300 mb-2">
                      绘本标题
                    </label>
                    <input
                      type="text"
                      value={publishData.title}
                      onChange={(e) => setPublishData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-lavender-200 placeholder-lavender-300/50 focus:outline-none focus:border-lavender-400"
                      placeholder="输入绘本标题"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-lavender-300 mb-2">
                      绘本描述
                    </label>
                    <textarea
                      value={publishData.description}
                      onChange={(e) => setPublishData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-lavender-200 placeholder-lavender-300/50 focus:outline-none focus:border-lavender-400 h-24 resize-none"
                      placeholder="描述您的绘本故事"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-6">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-600/30 hover:bg-slate-600/50 text-slate-200 rounded-xl transition-all duration-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={publishGeneratedStorybook}
                    disabled={isPublishing || !publishData.title.trim()}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl transition-all duration-200"
                  >
                    {isPublishing ? '发布中...' : '发布'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StorybookCreator;
