/**
 * API客户端 - 处理绘本生成API调用
 */

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
  isPublished: boolean;
  likes: number;
  collections: number;
}

// API响应接口
interface ApiResponse {
  success: boolean;
  data?: StorybookData;
  error?: string;
}

/**
 * 生成绘本
 */
export async function generateStorybook(
  imageBase64: string,
  userId: string,
  userName: string
): Promise<StorybookData> {
  // 在开发环境中使用模拟API
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    console.log('开发环境：使用模拟API生成绘本');
    const { mockGenerateStorybook } = await import('./mockApi');
    return await mockGenerateStorybook(imageBase64, userId, userName);
  }

  try {
    // 生产环境调用真实API
    const response = await fetch('/api/generate-storybook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        userId,
        userName
      })
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error(result.error || '绘本生成失败');
    }

    return result.data;
  } catch (error) {
    console.error('绘本生成失败:', error);
    
    // 如果API调用失败，返回模拟数据
    return createMockStorybook(userId, userName);
  }
}

/**
 * 创建模拟绘本数据（用于开发测试）
 */
function createMockStorybook(userId: string, userName: string): StorybookData {
  return {
    id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: '魔法涂鸦的冒险',
    description: '一个充满想象力的温馨故事，讲述涂鸦世界的奇妙冒险',
    pages: [
      {
        pageNumber: 1,
        imageUrl: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=故事开始',
        text: '在一个充满魔法的涂鸦世界里，住着许多可爱的小精灵...',
        audioUrl: ''
      },
      {
        pageNumber: 2,
        imageUrl: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=主角登场',
        text: '小精灵们每天都会用彩色的画笔创造新的奇迹...',
        audioUrl: ''
      },
      {
        pageNumber: 3,
        imageUrl: 'https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=冒险开始',
        text: '有一天，他们发现了一个神秘的涂鸦，决定一起去探索...',
        audioUrl: ''
      },
      {
        pageNumber: 4,
        imageUrl: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=友谊的力量',
        text: '在旅途中，他们学会了互相帮助，友谊让他们的魔法更加强大...',
        audioUrl: ''
      },
      {
        pageNumber: 5,
        imageUrl: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=美好结局',
        text: '最终，他们找到了涂鸦的秘密，也找到了属于自己的魔法...',
        audioUrl: ''
      }
    ],
    creatorId: userId,
    creatorName: userName || '匿名创作者',
    createdAt: new Date().toISOString(),
    isPublished: false,
    likes: 0,
    collections: 0
  };
}
