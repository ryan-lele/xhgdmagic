// Firebase Analytics 工具函数
import { analytics } from '../firebaseConfig';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';

// 检查 Analytics 是否可用
const isAnalyticsAvailable = () => {
  return analytics !== null && typeof window !== 'undefined';
};

// 记录页面访问
export const logPageView = (pageName: string, pageTitle?: string) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'page_view', {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

// 记录用户登录
export const logLogin = (method: string) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'login', {
    method: method
  });
};

// 记录用户注册
export const logSignUp = (method: string) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'sign_up', {
    method: method
  });
};

// 记录用户登出
export const logLogout = () => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'logout');
};

// 记录自定义事件
export const logCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, eventName, parameters);
};

// 设置用户 ID
export const setAnalyticsUserId = (userId: string) => {
  if (!isAnalyticsAvailable()) return;
  
  setUserId(analytics!, userId);
};

// 设置用户属性
export const setAnalyticsUserProperties = (properties: Record<string, string>) => {
  if (!isAnalyticsAvailable()) return;
  
  setUserProperties(analytics!, properties);
};

// 记录故事收藏事件
export const logStoryFavorite = (storyId: string, action: 'add' | 'remove') => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'story_favorite', {
    story_id: storyId,
    action: action
  });
};

// 记录音频播放事件
export const logAudioPlay = (audioId: string, duration?: number) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'audio_play', {
    audio_id: audioId,
    duration: duration
  });
};

// 记录冥想开始事件
export const logMeditationStart = (meditationId: string, duration: number) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'meditation_start', {
    meditation_id: meditationId,
    duration: duration
  });
};

// 记录冥想完成事件
export const logMeditationComplete = (meditationId: string, duration: number, completed: boolean) => {
  if (!isAnalyticsAvailable()) return;
  
  logEvent(analytics!, 'meditation_complete', {
    meditation_id: meditationId,
    duration: duration,
    completed: completed
  });
};


