/**
 * Firestore服务 - 绘本数据管理
 * 处理绘本的存储、检索、点赞、收藏等操作
 */

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  increment,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// 绘本页面接口
export interface StoryPage {
  pageNumber: number;
  imageUrl: string;
  text: string;
  audioUrl?: string;
}

// 绘本数据接口
export interface StorybookData {
  id: string;
  title: string;
  description: string;
  pages: StoryPage[];
  creatorId: string;
  creatorName: string;
  createdAt: string;
  updatedAt?: string;
  isPublished: boolean;
  likes: number;
  collections: number;
  tags?: string[];
  coverImageUrl?: string;
}

// 用户收藏绘本接口
export interface UserFavoriteStorybook {
  storybookId: string;
  addedAt: string;
}

// 用户点赞绘本接口
export interface UserLikedStorybook {
  storybookId: string;
  likedAt: string;
}

/**
 * 保存绘本到Firestore
 */
export async function saveStorybook(storybookData: Omit<StorybookData, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'storybooks'), {
      ...storybookData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('绘本保存成功，ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('保存绘本失败:', error);
    throw new Error('保存绘本失败，请稍后重试');
  }
}

/**
 * 发布绘本到公共社区
 */
export async function publishStorybook(
  storybookId: string, 
  creatorName: string,
  tags?: string[]
): Promise<void> {
  try {
    const storybookRef = doc(db, 'storybooks', storybookId);
    await updateDoc(storybookRef, {
      isPublished: true,
      creatorName,
      tags: tags || [],
      updatedAt: serverTimestamp()
    });
    
    console.log('绘本发布成功:', storybookId);
  } catch (error) {
    console.error('发布绘本失败:', error);
    throw new Error('发布绘本失败，请稍后重试');
  }
}

/**
 * 获取所有已发布的绘本
 */
export async function getPublishedStorybooks(limitCount: number = 20): Promise<StorybookData[]> {
  try {
    const q = query(
      collection(db, 'storybooks'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const storybooks: StorybookData[] = [];
    
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      storybooks.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as StorybookData);
    });
    
    return storybooks;
  } catch (error) {
    console.error('获取已发布绘本失败:', error);
    throw new Error('获取绘本列表失败，请稍后重试');
  }
}

/**
 * 获取用户创建的绘本
 */
export async function getUserStorybooks(userId: string): Promise<StorybookData[]> {
  try {
    const q = query(
      collection(db, 'storybooks'),
      where('creatorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const storybooks: StorybookData[] = [];
    
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      storybooks.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as StorybookData);
    });
    
    return storybooks;
  } catch (error) {
    console.error('获取用户绘本失败:', error);
    throw new Error('获取您的绘本失败，请稍后重试');
  }
}

/**
 * 获取单个绘本详情
 */
export async function getStorybookById(storybookId: string): Promise<StorybookData | null> {
  try {
    const docRef = doc(db, 'storybooks', storybookId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as StorybookData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('获取绘本详情失败:', error);
    throw new Error('获取绘本详情失败，请稍后重试');
  }
}

/**
 * 点赞绘本
 */
export async function likeStorybook(storybookId: string, userId: string): Promise<void> {
  try {
    // 更新绘本点赞数
    const storybookRef = doc(db, 'storybooks', storybookId);
    await updateDoc(storybookRef, {
      likes: increment(1),
      updatedAt: serverTimestamp()
    });
    
    // 记录用户点赞
    await addDoc(collection(db, 'userLikes'), {
      userId,
      storybookId,
      likedAt: serverTimestamp()
    });
    
    console.log('点赞成功:', storybookId);
  } catch (error) {
    console.error('点赞失败:', error);
    throw new Error('点赞失败，请稍后重试');
  }
}

/**
 * 取消点赞绘本
 */
export async function unlikeStorybook(storybookId: string, userId: string): Promise<void> {
  try {
    // 更新绘本点赞数
    const storybookRef = doc(db, 'storybooks', storybookId);
    await updateDoc(storybookRef, {
      likes: increment(-1),
      updatedAt: serverTimestamp()
    });
    
    // 删除用户点赞记录
    const q = query(
      collection(db, 'userLikes'),
      where('userId', '==', userId),
      where('storybookId', '==', storybookId)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    
    console.log('取消点赞成功:', storybookId);
  } catch (error) {
    console.error('取消点赞失败:', error);
    throw new Error('取消点赞失败，请稍后重试');
  }
}

/**
 * 收藏绘本
 */
export async function collectStorybook(storybookId: string, userId: string): Promise<void> {
  try {
    // 更新绘本收藏数
    const storybookRef = doc(db, 'storybooks', storybookId);
    await updateDoc(storybookRef, {
      collections: increment(1),
      updatedAt: serverTimestamp()
    });
    
    // 记录用户收藏
    await addDoc(collection(db, 'userCollections'), {
      userId,
      storybookId,
      addedAt: serverTimestamp()
    });
    
    console.log('收藏成功:', storybookId);
  } catch (error) {
    console.error('收藏失败:', error);
    throw new Error('收藏失败，请稍后重试');
  }
}

/**
 * 取消收藏绘本
 */
export async function uncollectStorybook(storybookId: string, userId: string): Promise<void> {
  try {
    // 更新绘本收藏数
    const storybookRef = doc(db, 'storybooks', storybookId);
    await updateDoc(storybookRef, {
      collections: increment(-1),
      updatedAt: serverTimestamp()
    });
    
    // 删除用户收藏记录
    const q = query(
      collection(db, 'userCollections'),
      where('userId', '==', userId),
      where('storybookId', '==', storybookId)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    
    console.log('取消收藏成功:', storybookId);
  } catch (error) {
    console.error('取消收藏失败:', error);
    throw new Error('取消收藏失败，请稍后重试');
  }
}

/**
 * 检查用户是否已点赞绘本
 */
export async function checkUserLikedStorybook(storybookId: string, userId: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'userLikes'),
      where('userId', '==', userId),
      where('storybookId', '==', storybookId)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('检查点赞状态失败:', error);
    return false;
  }
}

/**
 * 检查用户是否已收藏绘本
 */
export async function checkUserCollectedStorybook(storybookId: string, userId: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'userCollections'),
      where('userId', '==', userId),
      where('storybookId', '==', storybookId)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('检查收藏状态失败:', error);
    return false;
  }
}

/**
 * 获取用户收藏的绘本列表
 */
export async function getUserCollectedStorybooks(userId: string): Promise<StorybookData[]> {
  try {
    const q = query(
      collection(db, 'userCollections'),
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const storybookIds = querySnapshot.docs.map(doc => doc.data().storybookId);
    
    if (storybookIds.length === 0) {
      return [];
    }
    
    // 获取绘本详情
    const storybooks: StorybookData[] = [];
    for (const storybookId of storybookIds) {
      const storybook = await getStorybookById(storybookId);
      if (storybook) {
        storybooks.push(storybook);
      }
    }
    
    return storybooks;
  } catch (error) {
    console.error('获取用户收藏绘本失败:', error);
    throw new Error('获取收藏绘本失败，请稍后重试');
  }
}

/**
 * 删除绘本
 */
export async function deleteStorybook(storybookId: string, userId: string): Promise<void> {
  try {
    // 验证用户权限
    const storybook = await getStorybookById(storybookId);
    if (!storybook || storybook.creatorId !== userId) {
      throw new Error('您没有权限删除此绘本');
    }
    
    // 删除绘本
    await deleteDoc(doc(db, 'storybooks', storybookId));
    
    console.log('绘本删除成功:', storybookId);
  } catch (error) {
    console.error('删除绘本失败:', error);
    throw new Error('删除绘本失败，请稍后重试');
  }
}

/**
 * 搜索绘本
 */
export async function searchStorybooks(searchTerm: string, limitCount: number = 20): Promise<StorybookData[]> {
  try {
    // 这里可以实现更复杂的搜索逻辑
    // 目前使用简单的标题和描述搜索
    const q = query(
      collection(db, 'storybooks'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const storybooks: StorybookData[] = [];
    
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      const storybook = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as StorybookData;
      
      // 简单的文本匹配搜索
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matches = 
          storybook.title.toLowerCase().includes(searchLower) ||
          storybook.description.toLowerCase().includes(searchLower) ||
          storybook.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (matches) {
          storybooks.push(storybook);
        }
      } else {
        storybooks.push(storybook);
      }
    });
    
    return storybooks;
  } catch (error) {
    console.error('搜索绘本失败:', error);
    throw new Error('搜索绘本失败，请稍后重试');
  }
}
