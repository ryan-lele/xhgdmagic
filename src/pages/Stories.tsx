
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, Star, Heart, BookOpen } from 'lucide-react'
import { useAuth, StoryData } from '../contexts/AuthContext'
import AuthGuard from '../components/AuthGuard'
import toast from 'react-hot-toast'

const Stories: React.FC = () => {
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [selectedStory, setSelectedStory] = useState<any>(null)

  const storyCategories = [
    {
      id: 1,
      title: '经典童话',
      subtitle: '永恒的美好故事',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-amber-400 to-orange-500',
      bgPattern: 'from-amber-50/10 to-orange-100/5',
      subcategories: [
        {
          id: 'sub-1-1',
          title: '两岁睡前故事',
          subtitle: '适合2岁宝宝的温馨故事',
      stories: [
        { 
              id: 'story-1-1-1',
              name: '过家家', 
              duration: '8分钟', 
              narrator: '温柔女声',
              audioUrl: '/audio/bedtime-stories/过家家.mp3',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
              description: '小动物们一起玩过家家的温馨故事'
            },
            { 
              id: 'story-1-1-2',
              name: '蓝帐子', 
              duration: '10分钟', 
              narrator: '轻柔男声',
              audioUrl: '/audio/bedtime-stories/蓝帐子.mp3',
              image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
              description: '蓝色小帐篷里的奇妙冒险'
            },
            { 
              id: 'story-1-1-3',
              name: '矮婆婆的树皮小屋', 
          duration: '12分钟', 
              narrator: '慈祥女声',
              audioUrl: '/audio/bedtime-stories/矮婆婆的树皮小屋.mp3',
              image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
              description: '住在树皮小屋里的矮婆婆的温暖故事'
            }
          ]
        },
        {
          id: 'sub-1-2',
          title: '爸爸讲睡前故事',
          subtitle: '爸爸的温暖声音陪伴入眠',
          stories: [
            { 
              id: 'story-1-2-1',
              name: '上夜班的动物', 
          duration: '15分钟', 
              narrator: '低沉男声',
              audioUrl: '/audio/bedtime-stories/上夜班的动物.mp3',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center',
              description: '夜晚工作的动物们的奇妙故事'
            },
            { 
              id: 'story-1-2-2',
              name: '侦探和小狗', 
              duration: '18分钟', 
              narrator: '磁性男声',
              audioUrl: '/audio/bedtime-stories/侦探和小狗.mp3',
              image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center',
              description: '聪明的小侦探和他的忠实伙伴'
            },
            { 
              id: 'story-1-2-3',
              name: '雪夜疑案', 
              duration: '20分钟', 
              narrator: '神秘男声',
              audioUrl: '/audio/bedtime-stories/雪夜疑案.mp3',
              image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop&crop=center',
              description: '雪夜中发生的悬疑故事'
            }
          ]
        },
        {
          id: 'sub-1-3',
          title: '妈妈讲睡前故事',
          subtitle: '妈妈的温柔声音带来甜美梦境',
          stories: [
            { 
              id: 'story-1-3-1',
              name: '小老鼠和小小萝卜头', 
              duration: '9分钟', 
              narrator: '温柔女声',
              audioUrl: '/audio/bedtime-stories/小老鼠和小小萝卜头.mp3',
              image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop&crop=center',
              description: '小老鼠和萝卜头的友谊故事'
            },
            { 
              id: 'story-1-3-2',
              name: '太阳鸟', 
              duration: '11分钟', 
              narrator: '甜美女声',
              audioUrl: '/audio/bedtime-stories/太阳鸟.mp3',
              image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop&crop=center',
              description: '会发光的太阳鸟的美丽传说'
            },
            { 
              id: 'story-1-3-3',
              name: '绿色的世界', 
              duration: '13分钟', 
              narrator: '柔和女声',
              audioUrl: '/audio/bedtime-stories/绿色的世界.mp3',
              image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
              description: '充满生机的绿色世界冒险'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: '自然奇遇',
      subtitle: '大自然的神奇故事',
      icon: 'https://static.lumi.new/4a/4aa53732c3717050e92a9c7d480a3d97.png',
      color: 'from-emerald-400 to-teal-500',
      bgPattern: 'from-emerald-50/10 to-teal-100/5',
      stories: [
        { 
          id: 'story-2-1',
          name: '森林里的小秘密', 
          duration: '18分钟', 
          narrator: '自然声效',
          image: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '探索森林深处的神秘与美好'
        },
        { 
          id: 'story-2-2',
          name: '海边的贝壳屋', 
          duration: '14分钟', 
          narrator: '海浪背景',
          image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '住在贝壳里的小螃蟹的冒险故事'
        },
        { 
          id: 'story-2-3',
          name: '山谷回音', 
          duration: '16分钟', 
          narrator: '山谷音效',
          image: 'https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '山谷中传来的神秘回音'
        }
      ]
    },
    {
      id: 3,
      title: '魔法世界',
      subtitle: '充满想象的奇幻之旅',
      icon: 'https://static.lumi.new/1b/1ba058a4264ca2c6a85e9ed940e8ad59.png',
      color: 'from-purple-400 to-pink-500',
      bgPattern: 'from-purple-50/10 to-pink-100/5',
      stories: [
        { 
          id: 'story-3-1',
          name: '彩虹桥的另一端', 
          duration: '20分钟', 
          narrator: '魔法音效',
          image: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '穿越彩虹桥，发现魔法王国'
        },
        { 
          id: 'story-3-2',
          name: '会说话的云朵', 
          duration: '13分钟', 
          narrator: '云朵声音',
          image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '天空中的云朵有话要说'
        },
        { 
          id: 'story-3-3',
          name: '时光沙漏', 
          duration: '17分钟', 
          narrator: '时光音效',
          image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: '神奇沙漏带来的时光旅行'
        }
      ]
    }
  ]

  // 处理收藏功能
  const handleFavorite = async (story: any, category: any) => {
    if (!user || user.isAnonymous) {
      toast.error('请先登录以使用收藏功能');
      return;
    }

    try {
      const storyData: StoryData = {
        id: story.id,
        name: story.name,
        description: story.description,
        duration: story.duration,
        narrator: story.narrator,
        image: story.image,
        category: category.title,
        categoryId: category.id
      };

      if (isFavorite(story.id)) {
        await removeFromFavorites(story.id);
        toast.success('已从收藏中移除');
      } else {
        await addToFavorites(storyData);
        toast.success('已添加到收藏');
      }
    } catch (error) {
      console.error('收藏操作失败:', error);
      toast.error('操作失败，请重试');
    }
  };

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
          <div className="absolute top-8 left-8 w-16 h-16 bg-amber-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-16 right-12 w-12 h-12 bg-pink-300 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-1/4 w-10 h-10 bg-purple-300 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            animate={{ 
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 rounded-full blur-lg opacity-60"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center border-2 border-white/30">
              <BookOpen className="w-10 h-10 text-amber-200" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 mb-3">
            睡前故事
          </h1>
          <p className="text-lavender-200/80 text-lg leading-relaxed">
            温柔入梦的魔法故事
          </p>
        </div>
      </motion.div>

      {/* 故事分类 */}
      <div className="px-6 space-y-8">
        {storyCategories.map((category, index) => {
          // 前两个分类对所有用户可见，第三个开始需要登录
          const needsAuth = index >= 2;
          
          if (needsAuth && user?.isAnonymous) {
            return (
              <AuthGuard key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${category.bgPattern} backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl`}
                >
                  {/* 分类头部 */}
                  <div className={`bg-gradient-to-r ${category.color} p-8 relative overflow-hidden`}>
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

                  {/* 子分类和故事列表 */}
                  <div className="p-6">
                    {category.subcategories ? (
                      <div className="space-y-6">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                              <h4 className="text-lavender-200 text-lg font-semibold">
                                {subcategory.title}
                              </h4>
                              <span className="text-lavender-300/60 text-sm">
                                {subcategory.subtitle}
                              </span>
                            </div>
                            
                            <div className="space-y-3">
                              {subcategory.stories.map((story, storyIndex) => (
                                <motion.div
                                  key={story.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: storyIndex * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedStory(story)}
                                  className="bg-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="relative">
                                      <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-18 h-18 rounded-xl object-cover shadow-lg"
                                      />
                                      <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                                        <motion.div
                                          whileHover={{ scale: 1.2 }}
                                          className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                                        >
                                          <Play className="w-5 h-5 text-white" />
                                        </motion.div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                      <h4 className="text-white font-bold text-base mb-1">
                                        {story.name}
                                      </h4>
                                      <p className="text-lavender-200/70 text-sm mb-2 leading-relaxed">
                                        {story.description}
                                      </p>
                                      <div className="flex items-center space-x-4 text-lavender-200/60 text-xs">
                                        <div className="flex items-center space-x-1">
                                          <Clock className="w-3 h-3" />
                                          <span>{story.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3" />
                                          <span>{story.narrator}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavorite(story, category);
                                      }}
                                      className={`cursor-pointer transition-colors ${
                                        isFavorite(story.id) 
                                          ? 'text-pink-400 hover:text-pink-300' 
                                          : 'text-lavender-300/60 hover:text-pink-300'
                                      }`}
                                    >
                                      <Heart className={`w-5 h-5 ${isFavorite(story.id) ? 'fill-current' : ''}`} />
                                    </motion.div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                    {category.stories.map((story, storyIndex) => (
                      <motion.div
                        key={story.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: storyIndex * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStory(story)}
                        className="bg-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={story.image}
                              alt={story.name}
                              className="w-18 h-18 rounded-xl object-cover shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                              >
                                <Play className="w-5 h-5 text-white" />
                              </motion.div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-base mb-1">
                              {story.name}
                            </h4>
                            <p className="text-lavender-200/70 text-sm mb-2 leading-relaxed">
                              {story.description}
                            </p>
                            <div className="flex items-center space-x-4 text-lavender-200/60 text-xs">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{story.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>{story.narrator}</span>
                              </div>
                            </div>
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavorite(story, category);
                            }}
                            className={`cursor-pointer transition-colors ${
                              isFavorite(story.id) 
                                ? 'text-pink-400 hover:text-pink-300' 
                                : 'text-lavender-300/60 hover:text-pink-300'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${isFavorite(story.id) ? 'fill-current' : ''}`} />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AuthGuard>
            );
          }
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`bg-gradient-to-br ${category.bgPattern} backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl`}
            >
            {/* 分类头部 */}
            <div className={`bg-gradient-to-r ${category.color} p-8 relative overflow-hidden`}>
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

              {/* 子分类和故事列表 */}
              <div className="p-6">
                {category.subcategories ? (
                  <div className="space-y-6">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                          <h4 className="text-lavender-200 text-lg font-semibold">
                            {subcategory.title}
                          </h4>
                          <span className="text-lavender-300/60 text-sm">
                            {subcategory.subtitle}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {subcategory.stories.map((story, storyIndex) => (
                            <motion.div
                              key={story.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: storyIndex * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedStory(story)}
                              className="bg-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-18 h-18 rounded-xl object-cover shadow-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                                    <motion.div
                                      whileHover={{ scale: 1.2 }}
                                      className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                                    >
                                      <Play className="w-5 h-5 text-white" />
                                    </motion.div>
                                  </div>
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="text-white font-bold text-base mb-1">
                                    {story.name}
                                  </h4>
                                  <p className="text-lavender-200/70 text-sm mb-2 leading-relaxed">
                                    {story.description}
                                  </p>
                                  <div className="flex items-center space-x-4 text-lavender-200/60 text-xs">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{story.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3" />
                                      <span>{story.narrator}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavorite(story, category);
                                  }}
                                  className={`cursor-pointer transition-colors ${
                                    isFavorite(story.id) 
                                      ? 'text-pink-400 hover:text-pink-300' 
                                      : 'text-lavender-300/60 hover:text-pink-300'
                                  }`}
                                >
                                  <Heart className={`w-5 h-5 ${isFavorite(story.id) ? 'fill-current' : ''}`} />
                                </motion.div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
              {category.stories.map((story, storyIndex) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: storyIndex * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStory(story)}
                  className="bg-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-18 h-18 rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
                        >
                          <Play className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-base mb-1">
                        {story.name}
                      </h4>
                      <p className="text-lavender-200/70 text-sm mb-2 leading-relaxed">
                        {story.description}
                      </p>
                      <div className="flex items-center space-x-4 text-lavender-200/60 text-xs">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{story.narrator}</span>
                        </div>
                      </div>
                    </div>
                    
                                              <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavorite(story, category);
                            }}
                            className={`cursor-pointer transition-colors ${
                              isFavorite(story.id) 
                                ? 'text-pink-400 hover:text-pink-300' 
                                : 'text-lavender-300/60 hover:text-pink-300'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${isFavorite(story.id) ? 'fill-current' : ''}`} />
                          </motion.div>
                  </div>
                </motion.div>
              ))}
                  </div>
                )}
            </div>
            </motion.div>
          );
        })}
      </div>

      {/* 故事播放器模态框 */}
      {selectedStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.name}
                  className="w-full h-full rounded-2xl object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 rounded-2xl"></div>
              </div>
              
              <h3 className="text-white text-xl font-bold mb-2">
                {selectedStory.name}
              </h3>
              <p className="text-lavender-200/80 mb-4 leading-relaxed">
                {selectedStory.description}
              </p>
              
              {/* 音频播放器 */}
              {selectedStory.audioUrl && (
                <div className="mb-6">
                  <audio 
                    controls 
                    className="w-full rounded-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                      border: '1px solid rgba(168, 132, 255, 0.3)'
                    }}
                  >
                    <source src={selectedStory.audioUrl} type="audio/mpeg" />
                    您的浏览器不支持音频播放。
                  </audio>
              </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-2xl font-bold mb-4 shadow-lg"
                onClick={() => {
                  if (selectedStory.audioUrl) {
                    const audio = document.querySelector('audio');
                    if (audio) {
                      audio.play();
                    }
                  }
                }}
              >
                开始聆听
              </motion.button>
              
              <button
                onClick={() => setSelectedStory(null)}
                className="block w-full text-lavender-300/80 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Stories
