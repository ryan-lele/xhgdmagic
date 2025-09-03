import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logStoryFavorite } from '../lib/analytics';

// 用户数据类型定义
interface UserData {
  favoriteStories: string[];
}

// 故事类型定义
interface Story {
  id: string;
  title: string;
  content: string;
}

const UserAuthentication: React.FC = () => {
  // 使用认证上下文
  const { user, userData, isLoading, error, signIn, signUp, signOut, clearError, updateUserData } = useAuth();
  
  // 本地状态
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLoginView) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      // 清空表单
      setEmail('');
      setPassword('');
    } catch (error) {
      // 错误已在 AuthContext 中处理
    }
  };

  // 处理登出
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出错误:', error);
    }
  };

  // 添加收藏故事
  const handleAddFavorite = async (storyId: string) => {
    if (!user) return;

    try {
      const updatedFavorites = [...userData.favoriteStories, storyId];
      await updateUserData({ favoriteStories: updatedFavorites });
      
      // 记录收藏事件
      logStoryFavorite(storyId, 'add');
    } catch (error) {
      console.error('添加收藏错误:', error);
    }
  };

  // 移除收藏故事
  const handleRemoveFavorite = async (storyId: string) => {
    if (!user) return;

    try {
      const updatedFavorites = userData.favoriteStories.filter(id => id !== storyId);
      await updateUserData({ favoriteStories: updatedFavorites });
      
      // 记录取消收藏事件
      logStoryFavorite(storyId, 'remove');
    } catch (error) {
      console.error('移除收藏错误:', error);
    }
  };

  // 示例故事数据
  const sampleStories: Story[] = [
    { id: '1', title: '宁静的夜晚', content: '在一个宁静的夜晚，月光洒在窗台上...' },
    { id: '2', title: '森林的呼吸', content: '森林在微风中轻柔地呼吸着...' },
    { id: '3', title: '海浪的摇篮曲', content: '海浪轻柔地拍打着海岸...' }
  ];

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">正在加载...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部欢迎区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-light text-slate-800 mb-2">
            🌙 宁静魔法空间
          </h1>
          <p className="text-slate-600">
            {user?.isAnonymous 
              ? '欢迎，访客朋友！您可以浏览故事，登录后可以收藏您喜欢的内容。'
              : `欢迎回来，${user.email || '朋友'}！`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：认证区域 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            {user?.isAnonymous ? (
              // 访客视图：显示登录/注册表单
              <div>
                <h2 className="text-xl font-light text-slate-800 mb-4">
                  {isLoginView ? '登录账户' : '创建账户'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的邮箱"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      密码
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的密码"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    {isLoginView ? '登录' : '注册'}
                  </button>
                </form>
                
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="text-blue-500 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {isLoginView ? '还没有账户？点击注册' : '已有账户？点击登录'}
                  </button>
                </div>
              </div>
            ) : (
              // 正式用户视图：显示登出按钮
              <div>
                <h2 className="text-xl font-light text-slate-800 mb-4">
                  账户管理
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">邮箱</p>
                    <p className="font-medium text-slate-800">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-slate-500 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    登出账户
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：故事展示区域 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-light text-slate-800 mb-4">
              故事收藏
            </h2>
            
            <div className="space-y-4">
              {sampleStories.map((story) => (
                <div key={story.id} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-800">{story.title}</h3>
                    {userData.favoriteStories.includes(story.id) ? (
                      <button
                        onClick={() => handleRemoveFavorite(story.id)}
                        className="text-red-500 hover:text-red-600 text-sm transition-colors duration-200"
                      >
                        移除收藏
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddFavorite(story.id)}
                        className="text-blue-500 hover:text-blue-600 text-sm transition-colors duration-200"
                      >
                        添加收藏
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{story.content}</p>
                </div>
              ))}
            </div>
            
            {userData.favoriteStories.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-medium text-blue-800 mb-2">我的收藏</h4>
                <div className="flex flex-wrap gap-2">
                  {userData.favoriteStories.map((storyId) => {
                    const story = sampleStories.find(s => s.id === storyId);
                    return story ? (
                      <span key={storyId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {story.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="mt-2 text-red-600 hover:text-red-700 text-sm transition-colors duration-200"
            >
              关闭
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuthentication;
