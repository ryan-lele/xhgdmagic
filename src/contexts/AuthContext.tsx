import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  Unsubscribe 
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { logLogin, logSignUp, logLogout, setAnalyticsUserId } from '../lib/analytics';

// 故事数据类型定义
export interface StoryData {
  id: string;
  name: string;
  description: string;
  duration: string;
  narrator: string;
  image: string;
  category: string;
  categoryId: number;
}

// 用户数据类型定义
interface UserData {
  favoriteStories: StoryData[];
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
  };
  profile?: {
    displayName?: string;
    avatar?: string;
  };
}

// 认证上下文类型
interface AuthContextType {
  user: User | null;
  userData: UserData;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  addToFavorites: (story: StoryData) => Promise<void>;
  removeFromFavorites: (storyId: string) => Promise<void>;
  isFavorite: (storyId: string) => boolean;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>({ favoriteStories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 认证状态监听
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // 用户已登录，更新用户状态
          setUser(currentUser);
          setIsLoading(false);
          
          // 设置 Analytics 用户 ID
          setAnalyticsUserId(currentUser.uid);
        } else {
          // 用户未登录，自动创建匿名用户
          setIsLoading(true);
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error('认证状态监听错误:', error);
        setError('认证过程中发生错误');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 数据库监听
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    let unsubscribe: Unsubscribe;

    try {
      unsubscribe = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            // 文档存在，更新用户数据
            const data = docSnapshot.data() as UserData;
            setUserData(data);
          } else {
            // 文档不存在，初始化用户数据
            const initialData: UserData = { favoriteStories: [] };
            setDoc(userDocRef, initialData, { merge: true });
            setUserData(initialData);
          }
        },
        (error) => {
          console.error('数据库监听错误:', error);
          // 检查是否是权限错误
          if (error.code === 'permission-denied') {
            setError('没有权限访问用户数据，请检查Firebase安全规则');
          } else if (error.code === 'unavailable') {
            setError('数据库暂时不可用，请稍后重试');
          } else {
            setError('数据同步过程中发生错误');
          }
        }
      );
    } catch (error) {
      console.error('数据库监听设置错误:', error);
      setError('数据库连接失败');
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // 登录函数
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      
      // 记录登录事件
      logLogin('email');
    } catch (error: any) {
      console.error('登录错误:', error);
      setError(error.message || '登录过程中发生错误');
      throw error;
    }
  };

  // 注册函数
  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      
      // 记录注册事件
      logSignUp('email');
    } catch (error: any) {
      console.error('注册错误:', error);
      setError(error.message || '注册过程中发生错误');
      throw error;
    }
  };

  // 登出函数
  const signOutUser = async () => {
    try {
      setError(null);
      await signOut(auth);
      
      // 记录登出事件
      logLogout();
    } catch (error: any) {
      console.error('登出错误:', error);
      setError(error.message || '登出过程中发生错误');
      throw error;
    }
  };

  // 清除错误
  const clearError = () => {
    setError(null);
  };

  // 更新用户数据
  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, data, { merge: true });
    } catch (error: any) {
      console.error('更新用户数据错误:', error);
      if (error.code === 'permission-denied') {
        setError('没有权限更新用户数据，请检查Firebase安全规则');
      } else {
        setError('更新用户数据时发生错误');
      }
      throw error;
    }
  };

  // 添加到收藏
  const addToFavorites = async (story: StoryData) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const currentFavorites = userData.favoriteStories || [];
      
      // 检查是否已经收藏
      const isAlreadyFavorite = currentFavorites.some(fav => fav.id === story.id);
      if (isAlreadyFavorite) {
        return; // 已经收藏，不重复添加
      }

      const updatedFavorites = [...currentFavorites, story];
      await setDoc(userDocRef, { favoriteStories: updatedFavorites }, { merge: true });
    } catch (error: any) {
      console.error('添加收藏错误:', error);
      if (error.code === 'permission-denied') {
        setError('没有权限添加收藏，请检查Firebase安全规则');
      } else {
        setError('添加收藏时发生错误');
      }
      throw error;
    }
  };

  // 从收藏中移除
  const removeFromFavorites = async (storyId: string) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const currentFavorites = userData.favoriteStories || [];
      const updatedFavorites = currentFavorites.filter(fav => fav.id !== storyId);
      
      await setDoc(userDocRef, { favoriteStories: updatedFavorites }, { merge: true });
    } catch (error: any) {
      console.error('移除收藏错误:', error);
      if (error.code === 'permission-denied') {
        setError('没有权限移除收藏，请检查Firebase安全规则');
      } else {
        setError('移除收藏时发生错误');
      }
      throw error;
    }
  };

  // 检查是否已收藏
  const isFavorite = (storyId: string): boolean => {
    if (!userData.favoriteStories) return false;
    return userData.favoriteStories.some(fav => fav.id === storyId);
  };

  const value: AuthContextType = {
    user,
    userData,
    isLoading,
    error,
    signIn,
    signUp,
    signOut: signOutUser,
    clearError,
    updateUserData,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 使用认证上下文的钩子
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
};

export default AuthContext;
