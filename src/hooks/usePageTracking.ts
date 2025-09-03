// 页面访问跟踪钩子
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../lib/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // 获取页面名称
    const getPageName = (pathname: string) => {
      switch (pathname) {
        case '/':
          return '首页';
        case '/sleep':
          return '晚安音乐';
        case '/meditation':
          return '魔法时刻';
        case '/stories':
          return '故事';
                 case '/profile':
           return '我的';
         case '/auth':
           return '认证';
                       case '/music':
        return '音乐管理';
      default:
        return pathname;
      }
    };

    const pageName = getPageName(location.pathname);
    
    // 记录页面访问
    logPageView(pageName);
  }, [location]);
};
