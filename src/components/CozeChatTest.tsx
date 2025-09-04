/**
 * Coze Chat 测试组件
 * 集成Coze的chat CDK，用于绘本故事制作测试
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  BookOpen,
  Wand2,
  ArrowRight
} from 'lucide-react';

// 声明全局CozeWebSDK类型
declare global {
  interface Window {
    CozeWebSDK: any;
  }
}

interface CozeChatTestProps {
  onClose?: () => void;
}

const CozeChatTest: React.FC<CozeChatTestProps> = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 检查Coze SDK是否已加载
  useEffect(() => {
    const checkCozeSDK = () => {
      if (window.CozeWebSDK) {
        setIsLoaded(true);
        initializeCozeChat();
      } else {
        // 如果SDK未加载，等待一段时间后重试
        setTimeout(checkCozeSDK, 500);
      }
    };

    checkCozeSDK();
  }, []);

  // 初始化Coze Chat
  const initializeCozeChat = () => {
    try {
      if (!window.CozeWebSDK || !chatContainerRef.current) {
        setError('Coze SDK 未正确加载');
        return;
      }

      // 创建Coze Chat实例
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7546109153132625963',
        },
        componentProps: {
          title: '绘本故事制作助手',
        },
        auth: {
          type: 'token',
          token: 'pat_GdSAphyjW6kOKhPN3WrdwZAUc9Yalr0I2SAvhbp8AChqdgHwPgW5TSgkk8E5e2FD',
          onRefreshToken: function () {
            return 'pat_GdSAphyjW6kOKhPN3WrdwZAUc9Yalr0I2SAvhbp8AChqdgHwPgW5TSgkk8E5e2FD';
          }
        }
      });

      setIsInitialized(true);
    } catch (err) {
      console.error('初始化Coze Chat失败:', err);
      setError('初始化聊天功能失败，请稍后重试');
    }
  };

  // 手动初始化
  const handleInitialize = () => {
    if (isLoaded) {
      initializeCozeChat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-lavender-400 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-lavender-200">绘本故事制作测试</h1>
              <p className="text-lavender-300/70">与AI助手一起创作您的专属绘本故事</p>
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

        {/* 状态显示 */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-lavender-300/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isLoaded ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                <span className="text-lavender-200 font-medium">
                  {isLoaded ? 'Coze SDK 已加载' : '正在加载 Coze SDK...'}
                </span>
              </div>
              
              {isLoaded && !isInitialized && (
                <button
                  onClick={handleInitialize}
                  className="px-4 py-2 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>启动聊天助手</span>
                </button>
              )}
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

                  {/* 聊天容器 */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-6 border border-lavender-300/20">
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-lg font-semibold text-lavender-200">AI绘本创作助手</h3>
            <div className="ml-4 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
              <span className="text-sm text-lavender-300/70">
                {isInitialized ? '在线' : '离线'}
              </span>
            </div>
          </div>

          {/* 聊天界面占位符 */}
          <div 
            ref={chatContainerRef}
            className="min-h-[400px] bg-slate-700/30 rounded-2xl border border-slate-600/30 p-4 flex items-center justify-center"
          >
            {!isInitialized ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lavender-200 font-medium mb-2">
                    {isLoaded ? '点击"启动聊天助手"开始对话' : '正在加载聊天功能...'}
                  </p>
                  <p className="text-lavender-300/70 text-sm">
                    与AI助手一起创作您的专属绘本故事
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-lavender-200 mb-4">功能在完善中，先点击右边的小图标，开始制作属于自己的故事吧。</p>
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-lavender-400/20 rounded-full flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-lavender-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 功能提示 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span className="text-lavender-200 font-medium">故事创作</span>
              </div>
              <p className="text-lavender-300/70 text-sm">
                描述您想要的故事主题，AI将为您创作完整的绘本故事
              </p>
            </div>
            
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3 mb-2">
                <Wand2 className="w-5 h-5 text-lavender-300" />
                <span className="text-lavender-200 font-medium">插画生成</span>
              </div>
              <p className="text-lavender-300/70 text-sm">
                根据故事情节自动生成精美的插画，让故事更加生动
              </p>
            </div>
            
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3 mb-2">
                <ArrowRight className="w-5 h-5 text-emerald-300" />
                <span className="text-lavender-200 font-medium">一键导出</span>
              </div>
              <p className="text-lavender-300/70 text-sm">
                完成创作后可直接导出为完整的绘本文件
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CozeChatTest;
