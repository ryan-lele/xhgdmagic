/**
 * 模拟API服务 - 用于本地开发和测试
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

/**
 * 模拟绘本生成（用于开发测试）
 */
export async function mockGenerateStorybook(
  imageBase64: string,
  userId: string,
  userName: string
): Promise<StorybookData> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 根据图片内容生成不同的故事
  const stories = [
    {
      title: '小兔子的花园冒险',
      description: '一只可爱的小兔子在魔法花园中的奇妙冒险',
      pages: [
        {
          pageNumber: 1,
          text: '在一个阳光明媚的早晨，小兔子蹦蹦跳跳地来到了魔法花园...',
          imageDescription: '小兔子在花园入口'
        },
        {
          pageNumber: 2,
          text: '花园里开满了五颜六色的花朵，每一朵都散发着神奇的香味...',
          imageDescription: '美丽的花园景色'
        },
        {
          pageNumber: 3,
          text: '小兔子遇到了一只会说话的蝴蝶，蝴蝶告诉它花园的秘密...',
          imageDescription: '小兔子和蝴蝶对话'
        },
        {
          pageNumber: 4,
          text: '在蝴蝶的指引下，小兔子找到了传说中的彩虹种子...',
          imageDescription: '彩虹种子闪闪发光'
        },
        {
          pageNumber: 5,
          text: '小兔子种下了彩虹种子，整个花园变得更加美丽神奇...',
          imageDescription: '花园变得更加美丽'
        }
      ]
    },
    {
      title: '小熊的星空之旅',
      description: '勇敢的小熊踏上寻找星星的冒险旅程',
      pages: [
        {
          pageNumber: 1,
          text: '小熊望着夜空中的星星，心中充满了好奇和向往...',
          imageDescription: '小熊仰望星空'
        },
        {
          pageNumber: 2,
          text: '它决定建造一艘火箭，去探索那些闪闪发光的星星...',
          imageDescription: '小熊建造火箭'
        },
        {
          pageNumber: 3,
          text: '火箭升空了！小熊兴奋地看着地球越来越小...',
          imageDescription: '火箭升空'
        },
        {
          pageNumber: 4,
          text: '在太空中，小熊遇到了友好的外星朋友...',
          imageDescription: '小熊和外星朋友'
        },
        {
          pageNumber: 5,
          text: '小熊学会了友谊的珍贵，带着满满的回忆回到了地球...',
          imageDescription: '小熊回到地球'
        }
      ]
    },
    {
      title: '小猫的魔法画笔',
      description: '一只小猫发现了一支神奇的画笔，开启了创作之旅',
      pages: [
        {
          pageNumber: 1,
          text: '小猫在阁楼里发现了一支闪闪发光的画笔...',
          imageDescription: '小猫发现魔法画笔'
        },
        {
          pageNumber: 2,
          text: '当它用画笔在纸上画画时，画中的东西竟然变成了真的！',
          imageDescription: '画笔创造奇迹'
        },
        {
          pageNumber: 3,
          text: '小猫画了一只小鸟，小鸟立刻从纸上飞了出来...',
          imageDescription: '小鸟从画中飞出'
        },
        {
          pageNumber: 4,
          text: '它又画了一朵花，花朵在房间里绽放出美丽的花香...',
          imageDescription: '花朵在房间绽放'
        },
        {
          pageNumber: 5,
          text: '小猫明白了，真正的魔法不是画笔，而是心中的爱和想象力...',
          imageDescription: '小猫明白魔法真谛'
        }
      ]
    }
  ];

  // 随机选择一个故事
  const selectedStory = stories[Math.floor(Math.random() * stories.length)];

  return {
    id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: selectedStory.title,
    description: selectedStory.description,
    pages: selectedStory.pages.map((page, index) => ({
      pageNumber: page.pageNumber,
      imageUrl: `https://via.placeholder.com/400x300/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(page.imageDescription)}`,
      text: page.text,
      audioUrl: ''
    })),
    creatorId: userId,
    creatorName: userName || '匿名创作者',
    createdAt: new Date().toISOString(),
    isPublished: false,
    likes: 0,
    collections: 0
  };
}

/**
 * 获取随机颜色
 */
function getRandomColor(): string {
  const colors = ['4F46E5', '8B5CF6', '06B6D4', '10B981', 'F59E0B', 'EF4444', '8B5A2B'];
  return colors[Math.floor(Math.random() * colors.length)];
}
