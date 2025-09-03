/**
 * 本地故事生成器 - 基于文本描述生成绘本故事
 * 使用预设的图片资源和故事模板
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

// 预设的图片资源
const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center', // 森林
  'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=300&fit=crop&crop=center', // 小动物
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center', // 山景
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=center', // 湖泊
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center', // 森林小径
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center', // 花朵
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center', // 星空
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=center', // 彩虹
];

// 故事模板
const STORY_TEMPLATES = {
  '小兔子': {
    title: '小兔子的森林冒险',
    description: '一只勇敢的小兔子在魔法森林中的奇妙冒险',
    pages: [
      {
        text: '在一个阳光明媚的早晨，小兔子蹦蹦跳跳地来到了魔法森林...',
        imageIndex: 0
      },
      {
        text: '森林里住着许多友好的小动物，它们都很欢迎小兔子的到来...',
        imageIndex: 1
      },
      {
        text: '小兔子遇到了一只会说话的蝴蝶，蝴蝶告诉它森林的秘密...',
        imageIndex: 2
      },
      {
        text: '在蝴蝶的指引下，小兔子找到了传说中的彩虹花...',
        imageIndex: 3
      },
      {
        text: '小兔子学会了友谊的珍贵，带着满满的回忆回到了家...',
        imageIndex: 4
      }
    ]
  },
  '小熊': {
    title: '小熊的星空之旅',
    description: '勇敢的小熊踏上寻找星星的冒险旅程',
    pages: [
      {
        text: '小熊望着夜空中的星星，心中充满了好奇和向往...',
        imageIndex: 6
      },
      {
        text: '它决定建造一艘火箭，去探索那些闪闪发光的星星...',
        imageIndex: 2
      },
      {
        text: '火箭升空了！小熊兴奋地看着地球越来越小...',
        imageIndex: 6
      },
      {
        text: '在太空中，小熊遇到了友好的外星朋友...',
        imageIndex: 1
      },
      {
        text: '小熊学会了友谊的珍贵，带着满满的回忆回到了地球...',
        imageIndex: 0
      }
    ]
  },
  '小猫': {
    title: '小猫的魔法画笔',
    description: '一只小猫发现了一支神奇的画笔，开启了创作之旅',
    pages: [
      {
        text: '小猫在阁楼里发现了一支闪闪发光的画笔...',
        imageIndex: 5
      },
      {
        text: '当它用画笔在纸上画画时，画中的东西竟然变成了真的！',
        imageIndex: 3
      },
      {
        text: '小猫画了一只小鸟，小鸟立刻从纸上飞了出来...',
        imageIndex: 1
      },
      {
        text: '它又画了一朵花，花朵在房间里绽放出美丽的花香...',
        imageIndex: 5
      },
      {
        text: '小猫明白了，真正的魔法不是画笔，而是心中的爱和想象力...',
        imageIndex: 7
      }
    ]
  },
  '小鸟': {
    title: '小鸟的飞行梦想',
    description: '一只小鸟学会飞翔的温馨故事',
    pages: [
      {
        text: '小鸟站在树枝上，看着其他鸟儿在天空中自由飞翔...',
        imageIndex: 0
      },
      {
        text: '它鼓起勇气，第一次尝试展开翅膀...',
        imageIndex: 1
      },
      {
        text: '虽然摔了几次，但小鸟没有放弃，继续练习...',
        imageIndex: 2
      },
      {
        text: '终于，小鸟成功飞上了天空，看到了美丽的风景...',
        imageIndex: 3
      },
      {
        text: '小鸟明白了，只要勇敢尝试，梦想就能实现...',
        imageIndex: 4
      }
    ]
  }
};

/**
 * 根据文本描述生成绘本故事
 */
export async function generateStoryFromDescription(
  description: string,
  userId: string,
  userName: string
): Promise<StorybookData> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 分析描述，找到关键词
  const keywords = extractKeywords(description);
  const template = findBestTemplate(keywords);

  // 生成绘本数据
  const storybookData: StorybookData = {
    id: generateStorybookId(),
    title: template.title,
    description: template.description,
    pages: template.pages.map((page, index) => ({
      pageNumber: index + 1,
      imageUrl: PRESET_IMAGES[page.imageIndex],
      text: page.text,
      audioUrl: '' // 暂时为空，可以后续添加TTS
    })),
    creatorId: userId,
    creatorName: userName || '匿名创作者',
    createdAt: new Date().toISOString(),
    isPublished: false,
    likes: 0,
    collections: 0
  };

  return storybookData;
}

/**
 * 从描述中提取关键词
 */
function extractKeywords(description: string): string[] {
  const keywords: string[] = [];
  
  // 检查是否包含特定动物
  if (description.includes('兔子') || description.includes('兔')) {
    keywords.push('小兔子');
  }
  if (description.includes('熊') || description.includes('小熊')) {
    keywords.push('小熊');
  }
  if (description.includes('猫') || description.includes('小猫')) {
    keywords.push('小猫');
  }
  if (description.includes('鸟') || description.includes('小鸟')) {
    keywords.push('小鸟');
  }
  
  // 检查环境关键词
  if (description.includes('森林') || description.includes('树林')) {
    keywords.push('森林');
  }
  if (description.includes('星空') || description.includes('星星')) {
    keywords.push('星空');
  }
  if (description.includes('魔法') || description.includes('神奇')) {
    keywords.push('魔法');
  }
  
  return keywords;
}

/**
 * 根据关键词找到最佳故事模板
 */
function findBestTemplate(keywords: string[]): any {
  // 优先匹配动物关键词
  for (const keyword of keywords) {
    if (STORY_TEMPLATES[keyword as keyof typeof STORY_TEMPLATES]) {
      return STORY_TEMPLATES[keyword as keyof typeof STORY_TEMPLATES];
    }
  }
  
  // 如果没有匹配的动物，返回默认的小兔子故事
  return STORY_TEMPLATES['小兔子'];
}

/**
 * 生成绘本ID
 */
function generateStorybookId(): string {
  return `storybook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 模拟基于图片的生成（实际上使用文本描述）
 */
export async function generateStoryFromImage(
  imageBase64: string,
  userId: string,
  userName: string
): Promise<StorybookData> {
  // 由于无法真正识别图片内容，我们使用一个通用的描述
  const defaultDescription = '一个充满想象力的温馨故事';
  return generateStoryFromDescription(defaultDescription, userId, userName);
}
