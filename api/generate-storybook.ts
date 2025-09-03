/**
 * Vercel Serverless Function: AI绘本生成服务
 * 接收用户上传的涂鸦图片，使用Google Gemini API生成有声绘本
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// 绘本页面接口定义
interface StoryPage {
  pageNumber: number;
  imageUrl: string;
  text: string;
  audioUrl?: string;
}

// 绘本数据接口定义
interface StorybookData {
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

// Google Gemini API配置
const GEMINI_API_KEY = 'AIzaSyCizprdmXbLb8USDSM2TvpawYHWTl9GQfs';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' });
  }

  try {
    const { imageBase64, userId, userName } = req.body;

    // 验证必需参数
    if (!imageBase64 || !userId) {
      return res.status(400).json({
        error: '缺少必需参数：图片数据或用户ID'
      });
    }

    // 调用Gemini API生成绘本内容
    const storybookData = await generateStorybookWithGemini(imageBase64, userId, userName);

    return res.status(200).json({
      success: true,
      data: storybookData
    });

  } catch (error) {
    console.error('绘本生成失败:', error);
    return res.status(500).json({
      error: '绘本生成失败，请稍后重试'
    });
  }
}

/**
 * 使用Gemini API生成绘本内容
 */
async function generateStorybookWithGemini(
  imageBase64: string, 
  userId: string, 
  userName: string
): Promise<StorybookData> {
  
  // 构建Gemini API请求
  const requestBody = {
    contents: [{
      parts: [
        {
          text: `请基于这张涂鸦图片创作一个温馨的儿童绘本故事。

要求：
1. 故事应该温暖、积极、富有想象力
2. 适合3-8岁儿童阅读
3. 包含5-8页内容
4. 每页都有简短的文字描述（20-50字）
5. 故事要有教育意义或传递正能量
6. 使用中文创作

请以JSON格式返回，包含以下结构：
{
  "title": "绘本标题",
  "description": "绘本简介",
  "pages": [
    {
      "pageNumber": 1,
      "text": "第一页的文字内容",
      "imageDescription": "第一页的图片描述"
    },
    ...
  ]
}`
        },
        {
          inline_data: {
            mime_type: "image/jpeg",
            data: imageBase64
          }
        }
      ]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API请求失败: ${response.status}`);
    }

    const result = await response.json();
    
    // 解析Gemini返回的内容
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error('Gemini API未返回有效内容');
    }

    // 尝试解析JSON内容
    let parsedContent;
    try {
      // 提取JSON部分（去除可能的markdown标记）
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('无法找到有效的JSON内容');
      }
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      // 如果解析失败，使用默认内容
      parsedContent = createDefaultStorybook();
    }

    // 构建完整的绘本数据
    const storybookData: StorybookData = {
      id: generateStorybookId(),
      title: parsedContent.title || '魔法涂鸦故事',
      description: parsedContent.description || '一个由您的涂鸦创作的温馨故事',
      pages: parsedContent.pages?.map((page: any, index: number) => ({
        pageNumber: page.pageNumber || index + 1,
        imageUrl: generatePlaceholderImageUrl(page.imageDescription || '绘本插图'),
        text: page.text || `第${index + 1}页的内容`,
        audioUrl: generateTTSAudioUrl(page.text || `第${index + 1}页的内容`)
      })) || createDefaultPages(),
      creatorId: userId,
      creatorName: userName || '匿名创作者',
      createdAt: new Date().toISOString(),
      isPublished: false,
      likes: 0,
      collections: 0
    };

    return storybookData;

  } catch (error) {
    console.error('Gemini API调用失败:', error);
    // 返回默认绘本数据
    return createDefaultStorybookData(userId, userName);
  }
}

/**
 * 生成绘本ID
 */
function generateStorybookId(): string {
  return `storybook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 生成占位图片URL（实际项目中应该使用真实的图片生成服务）
 */
function generatePlaceholderImageUrl(description: string): string {
  // 这里可以使用DALL-E、Midjourney或其他图片生成服务
  // 暂时使用占位图片服务
  const encodedDescription = encodeURIComponent(description);
  return `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodedDescription}`;
}

/**
 * 生成TTS音频URL（实际项目中应该使用真实的TTS服务）
 */
function generateTTSAudioUrl(text: string): string {
  // 这里可以使用Google TTS、Azure TTS或其他语音合成服务
  // 暂时返回空字符串，实际实现时需要调用TTS API
  return '';
}

/**
 * 创建默认绘本数据
 */
function createDefaultStorybookData(userId: string, userName: string): StorybookData {
  return {
    id: generateStorybookId(),
    title: '我的魔法涂鸦',
    description: '一个充满想象力的温馨故事',
    pages: createDefaultPages(),
    creatorId: userId,
    creatorName: userName || '匿名创作者',
    createdAt: new Date().toISOString(),
    isPublished: false,
    likes: 0,
    collections: 0
  };
}

/**
 * 创建默认页面内容
 */
function createDefaultPages(): StoryPage[] {
  return [
    {
      pageNumber: 1,
      imageUrl: generatePlaceholderImageUrl('故事开始'),
      text: '从前，有一个神奇的涂鸦世界...',
      audioUrl: generateTTSAudioUrl('从前，有一个神奇的涂鸦世界...')
    },
    {
      pageNumber: 2,
      imageUrl: generatePlaceholderImageUrl('主角登场'),
      text: '在这里，每个涂鸦都有自己的生命...',
      audioUrl: generateTTSAudioUrl('在这里，每个涂鸦都有自己的生命...')
    },
    {
      pageNumber: 3,
      imageUrl: generatePlaceholderImageUrl('冒险开始'),
      text: '它们一起踏上了奇妙的冒险之旅...',
      audioUrl: generateTTSAudioUrl('它们一起踏上了奇妙的冒险之旅...')
    },
    {
      pageNumber: 4,
      imageUrl: generatePlaceholderImageUrl('友谊的力量'),
      text: '在旅途中，它们学会了友谊和勇气...',
      audioUrl: generateTTSAudioUrl('在旅途中，它们学会了友谊和勇气...')
    },
    {
      pageNumber: 5,
      imageUrl: generatePlaceholderImageUrl('美好结局'),
      text: '最终，它们找到了属于自己的魔法...',
      audioUrl: generateTTSAudioUrl('最终，它们找到了属于自己的魔法...')
    }
  ];
}

/**
 * 创建默认故事内容（当Gemini API失败时使用）
 */
function createDefaultStorybook() {
  return {
    title: '我的魔法涂鸦',
    description: '一个充满想象力的温馨故事',
    pages: [
      {
        pageNumber: 1,
        text: '从前，有一个神奇的涂鸦世界...',
        imageDescription: '故事开始'
      },
      {
        pageNumber: 2,
        text: '在这里，每个涂鸦都有自己的生命...',
        imageDescription: '主角登场'
      },
      {
        pageNumber: 3,
        text: '它们一起踏上了奇妙的冒险之旅...',
        imageDescription: '冒险开始'
      },
      {
        pageNumber: 4,
        text: '在旅途中，它们学会了友谊和勇气...',
        imageDescription: '友谊的力量'
      },
      {
        pageNumber: 5,
        text: '最终，它们找到了属于自己的魔法...',
        imageDescription: '美好结局'
      }
    ]
  };
}
