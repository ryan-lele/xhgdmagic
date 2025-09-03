/**
 * 绘本生成测试页面
 * 用于测试AI绘本生成功能
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, BookOpen, Check, X } from 'lucide-react';
import { generateStorybook } from '../lib/apiClient';
import { StorybookData } from '../services/firestoreService';
import toast from 'react-hot-toast';

const TestStorybookPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStorybook, setGeneratedStorybook] = useState<StorybookData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      toast.success('图片上传成功！');
    };
    reader.readAsDataURL(file);
  };

  // 生成绘本
  const handleGenerateStorybook = async () => {
    if (!uploadedImage) {
      toast.error('请先上传图片');
      return;
    }

    setIsGenerating(true);
    
    try {
      const base64Data = uploadedImage.split(',')[1];
      const storybookData = await generateStorybook(
        base64Data,
        'test-user-id',
        '测试用户'
      );

      setGeneratedStorybook(storybookData);
      toast.success('绘本生成成功！');
    } catch (error) {
      console.error('生成绘本失败:', error);
      toast.error('生成绘本失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 重置状态
  const resetTest = () => {
    setUploadedImage(null);
    setGeneratedStorybook(null);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lavender-200 mb-2">
            AI绘本生成测试
          </h1>
          <p className="text-lavender-300/70">
            测试Google Gemini API集成和绘本生成功能
          </p>
        </div>

        {!generatedStorybook ? (
          // 上传和生成界面
          <div className="space-y-8">
            {/* 上传区域 */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-3xl p-8 border border-lavender-300/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-lavender-200 mb-4">
                  上传测试图片
                </h2>
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage}
                        alt="上传的图片"
                        className="w-48 h-48 object-cover rounded-2xl shadow-lg"
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-lavender-500/25 cursor-pointer"
                    >
                      选择图片
                    </label>
                    <p className="text-lavender-300/70 text-sm">
                      支持 JPG、PNG 格式，最大 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 生成按钮 */}
            {uploadedImage && (
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
                      <span>正在生成绘本...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-6 h-6" />
                      <span>开始生成绘本</span>
                    </div>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          // 绘本展示界面
          <div className="space-y-6">
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
                <button
                  onClick={resetTest}
                  className="p-2 text-lavender-300/70 hover:text-lavender-200 hover:bg-lavender-500/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
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

                {/* 文字区域 */}
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <p className="text-lavender-200 leading-relaxed">
                      {generatedStorybook.pages[currentPage].text}
                    </p>
                  </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TestStorybookPage;
