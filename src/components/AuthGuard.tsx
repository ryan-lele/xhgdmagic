import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Lock, LogIn, Star } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showLoginPrompt?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback,
  showLoginPrompt = true 
}) => {
  const { user, isLoading } = useAuth();

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center space-x-3 text-lavender-300/70">
          <div className="w-6 h-6 border-2 border-lavender-300/30 border-t-lavender-300 rounded-full animate-spin" />
          <span>加载中...</span>
        </div>
      </div>
    );
  }

  // 如果用户已登录（非匿名），显示内容
  if (user && !user.isAnonymous) {
    return <>{children}</>;
  }

  // 如果提供了自定义 fallback，使用它
  if (fallback) {
    return <>{fallback}</>;
  }

  // 默认的访客提示
  if (showLoginPrompt) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[300px] p-8"
      >
        <div className="text-center max-w-md">
          {/* 图标 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400/20 to-lavender-400/20 rounded-full flex items-center justify-center border border-amber-400/30"
          >
            <Lock className="w-10 h-10 text-amber-300" />
          </motion.div>

          {/* 标题 */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-white mb-3"
          >
            需要登录才能访问
          </motion.h3>

          {/* 描述 */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lavender-300/80 text-sm mb-6 leading-relaxed"
          >
            此功能需要登录账户才能使用。登录后可享受个性化体验、数据同步和更多专属功能。
          </motion.p>

          {/* 功能列表 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2 mb-6"
          >
            {[
              '个性化推荐内容',
              '云端数据同步',
              '收藏和偏好设置',
              '使用历史记录'
            ].map((feature, index) => (
              <div key={feature} className="flex items-center space-x-2 text-lavender-300/70 text-sm">
                <Star className="w-4 h-4 text-amber-400" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* 登录按钮 */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl font-medium transition-all duration-200 mx-auto"
          >
            <LogIn className="w-5 h-5" />
            <span>立即登录</span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // 不显示任何内容
  return null;
};

export default AuthGuard;




