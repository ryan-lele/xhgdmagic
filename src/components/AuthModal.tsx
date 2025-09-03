import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getFriendlyErrorMessage } from '../lib/errorMessages';
import { X, User, Lock, Mail, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const { signIn, signUp, error, clearError, user } = useAuth();
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [localError, setLocalError] = useState<string>('');

  // 监听用户状态变化，登录成功后自动关闭模态框
  useEffect(() => {
    if (user && !user.isAnonymous && isOpen) {
      setShowSuccess(true);
      // 延迟关闭模态框，让用户看到成功状态
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  }, [user, isOpen]);

  // 响应 initialView 变化
  useEffect(() => {
    setIsLoginView(initialView === 'login');
  }, [initialView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    setLocalError('');

    try {
      if (isLoginView) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      // 成功登录/注册后关闭模态框
      setEmail('');
      setPassword('');
      onClose();
    } catch (error) {
      // 使用友好的错误消息
      const friendlyError = getFriendlyErrorMessage(error);
      setLocalError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    clearError();
    setLocalError('');
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* 模态框内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-lavender-300/20"
          >
            {/* 关闭按钮 */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-lavender-300/70 hover:text-lavender-200 transition-colors duration-200"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {/* 成功状态 */}
              {showSuccess ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h2 className="text-2xl font-light text-emerald-200 mb-2">
                    登录成功！
                  </h2>
                  <p className="text-emerald-300/70 text-sm">
                    欢迎回来，{user?.email?.split('@')[0]}！
                  </p>
                </div>
              ) : (
                <>
                  {/* 标题 */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-lavender-100 mb-2">
                      {isLoginView ? '欢迎回来' : '创建账户'}
                    </h2>
                    <p className="text-lavender-300/70 text-sm">
                      {isLoginView ? '登录您的账户以享受完整功能' : '注册新账户开始您的宁静之旅'}
                    </p>
                  </div>

              {/* 表单 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 邮箱输入 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-lavender-200">
                    邮箱地址
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavender-400/60" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-lavender-300/20 rounded-xl text-lavender-100 placeholder-lavender-400/60 focus:ring-2 focus:ring-lavender-400/50 focus:border-lavender-400/50 transition-all duration-200"
                      placeholder="请输入您的邮箱"
                      required
                    />
                  </div>
                </div>

                {/* 密码输入 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-lavender-200">
                    密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavender-400/60" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-lavender-300/20 rounded-xl text-lavender-100 placeholder-lavender-400/60 focus:ring-2 focus:ring-lavender-400/50 focus:border-lavender-400/50 transition-all duration-200"
                      placeholder="请输入您的密码"
                      required
                    />
                  </div>
                </div>

                {/* 错误提示 */}
                {(error || localError) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
                  >
                    <p className="text-red-300 text-sm">{localError || error}</p>
                  </motion.div>
                )}

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>处理中...</span>
                    </div>
                  ) : (
                    isLoginView ? '登录' : '注册'
                  )}
                </button>
              </form>

              {/* 切换登录/注册 */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    clearError();
                    setLocalError('');
                  }}
                  className="text-lavender-400 hover:text-lavender-300 text-sm transition-colors duration-200"
                >
                  {isLoginView ? '还没有账户？点击注册' : '已有账户？点击登录'}
                </button>
              </div>

                  {/* 当前用户状态 */}
                  {user && (
                    <div className="mt-6 p-4 bg-lavender-500/10 border border-lavender-500/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <User className="text-lavender-400" size={20} />
                        <div>
                          <p className="text-lavender-200 text-sm font-medium">
                            {user.isAnonymous ? '访客用户' : user.email}
                          </p>
                          <p className="text-lavender-400/70 text-xs">
                            {user.isAnonymous ? '登录后可享受完整功能' : '已登录'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
