// 音乐搜索服务 - 本地模拟数据版本
import { MusicTrack } from '../data/music';

// 外部音乐源接口
export interface ExternalMusicSource {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  source?: 'local' | 'netease' | 'qq' | 'future'; // 添加来源标识
}

// 国内音乐API接口（为未来集成准备）
interface ChineseMusicAPI {
  // 网易云音乐API接口
  netease: {
    search: (query: string) => Promise<ExternalMusicSource[]>;
    getSongUrl: (songId: string) => Promise<string>;
  };
  
  // QQ音乐API接口
  qq: {
    search: (query: string) => Promise<ExternalMusicSource[]>;
    getSongUrl: (songId: string) => Promise<string>;
  };
}

// 音乐搜索服务类
export class MusicSearchService {
  // 已移除所有Pixabay相关配置
  // 未来将在此处添加国内音乐API配置

  // 搜索助眠相关音乐 - 使用本地模拟数据
  static async searchSleepMusic(query: string = 'sleep'): Promise<ExternalMusicSource[]> {
    console.log('搜索音乐:', query);
    
    try {
      // 直接使用本地模拟数据
      const results = this.getLocalMockResults(query);
      console.log('返回搜索结果:', results.length, '首');
      return results;
    } catch (error) {
      console.error('音乐搜索失败:', error);
      return [];
    }
  }

  // 获取推荐音乐（基于分类）
  static async getRecommendedMusic(category: string): Promise<ExternalMusicSource[]> {
    const categoryQueries = {
      sleep: ['sleep', 'lullaby', 'bedtime', 'calm', 'relaxing music'],
      relax: ['relax', 'peaceful', 'serene', 'tranquil', 'calm music'],
      meditation: ['meditation', 'mindfulness', 'zen', 'spiritual', 'meditation music'],
      lofi: ['lofi', 'chill', 'study', 'ambient', 'lo-fi music'],
      ambient: ['ambient', 'atmospheric', 'soundscape', 'ethereal', 'ambient music'],
      nature: ['nature', 'rain', 'ocean', 'forest', 'birds', 'nature sounds']
    };

    const queries = categoryQueries[category as keyof typeof categoryQueries] || ['music'];
    const results: ExternalMusicSource[] = [];

    // 尝试每个查询词
    for (const query of queries) {
      try {
        const searchResults = await this.searchSleepMusic(query);
        results.push(...searchResults);
        
        if (results.length >= 15) {
          break;
        }
      } catch (error) {
        console.error(`搜索 "${query}" 失败:`, error);
        continue;
      }
    }

    // 去重并限制结果数量
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    );

    return uniqueResults.slice(0, 20);
  }

  // 本地模拟数据 - 使用本地音频文件
  private static getLocalMockResults(query: string): ExternalMusicSource[] {
    const mockResults: ExternalMusicSource[] = [
      {
        id: 'local-1',
        title: '宁静雨声',
        artist: '自然声音库',
        url: '/audio/rain.mp3',
        duration: 300,
        description: '轻柔的雨声，适合助眠',
        tags: ['雨声', '自然', '放松', '助眠'],
        source: 'local'
      },
      {
        id: 'local-2',
        title: '海浪轻拍',
        artist: '海洋声音',
        url: '/audio/ocean.mp3',
        duration: 420,
        description: '温柔的海浪声，营造宁静氛围',
        tags: ['海浪', '海洋', '冥想', '放松'],
        source: 'local'
      },
      {
        id: 'local-3',
        title: '森林鸟鸣',
        artist: '自然声音',
        url: '/audio/birds.mp3',
        duration: 360,
        description: '清晨森林中的鸟鸣声',
        tags: ['鸟鸣', '森林', '自然', '清新'],
        source: 'local'
      },
      {
        id: 'local-4',
        title: '白噪音',
        artist: '环境音效',
        url: '/audio/whitenoise.mp3',
        duration: 600,
        description: '纯净的白噪音，帮助集中注意力',
        tags: ['白噪音', '专注', '学习', '工作'],
        source: 'local'
      },
      {
        id: 'local-5',
        title: '冥想钟声',
        artist: '冥想音乐',
        url: '/audio/bell.mp3',
        duration: 180,
        description: '悠扬的钟声，适合冥想',
        tags: ['钟声', '冥想', '精神', '平静'],
        source: 'local'
      },
      {
        id: 'local-6',
        title: '古筝曲',
        artist: '中国传统音乐',
        url: '/audio/guzheng.mp3',
        duration: 320,
        description: '传统古筝演奏，宁静致远',
        tags: ['古筝', '传统', '中国风', '宁静'],
        source: 'local'
      },
      {
        id: 'local-7',
        title: '竹笛',
        artist: '中国传统音乐',
        url: '/audio/bamboo.mp3',
        duration: 280,
        description: '竹笛演奏，清新自然',
        tags: ['竹笛', '传统', '清新', '自然'],
        source: 'local'
      },
      {
        id: 'local-8',
        title: '森林环境音',
        artist: '自然声音',
        url: '/audio/forest.mp3',
        duration: 500,
        description: '森林中的环境音，包含风声、树叶声',
        tags: ['森林', '环境音', '自然', '放松'],
        source: 'local'
      },
      {
        id: 'local-9',
        title: '冥想音乐',
        artist: '冥想音乐',
        url: '/audio/meditation.mp3',
        duration: 600,
        description: '舒缓的冥想音乐，帮助放松身心',
        tags: ['冥想', '放松', '精神', '平静'],
        source: 'local'
      },
      {
        id: 'local-10',
        title: '风铃声',
        artist: '环境音效',
        url: '/audio/chimes.mp3',
        duration: 240,
        description: '清脆的风铃声，带来宁静感受',
        tags: ['风铃', '清脆', '宁静', '放松'],
        source: 'local'
      },
      {
        id: 'local-11',
        title: '二胡曲',
        artist: '中国传统音乐',
        url: '/audio/erhu.mp3',
        duration: 350,
        description: '传统二胡演奏，悠扬动听',
        tags: ['二胡', '传统', '中国风', '悠扬'],
        source: 'local'
      },
      {
        id: 'local-12',
        title: '粉红噪音',
        artist: '环境音效',
        url: '/audio/pinknoise.mp3',
        duration: 600,
        description: '粉红噪音，比白噪音更柔和',
        tags: ['粉红噪音', '专注', '学习', '工作'],
        source: 'local'
      }
    ];

    // 根据查询关键词过滤结果
    const lowercaseQuery = query.toLowerCase();
    const filteredResults = mockResults.filter(result => 
      result.title.toLowerCase().includes(lowercaseQuery) ||
      result.artist.toLowerCase().includes(lowercaseQuery) ||
      result.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      result.description?.toLowerCase().includes(lowercaseQuery)
    );

    // 如果没有匹配的结果，返回所有结果
    return filteredResults.length > 0 ? filteredResults : mockResults;
  }

  // 未来国内音乐API集成接口
  // TODO: 在此处集成网易云音乐API
  private static async searchNeteaseMusic(query: string): Promise<ExternalMusicSource[]> {
    // 未来实现：网易云音乐API集成
    // 1. 获取API密钥
    // 2. 实现搜索接口
    // 3. 处理CORS问题
    // 4. 返回标准化的音乐数据
    
    console.log('网易云音乐API集成待实现:', query);
    return [];
  }

  // TODO: 在此处集成QQ音乐API
  private static async searchQQMusic(query: string): Promise<ExternalMusicSource[]> {
    // 未来实现：QQ音乐API集成
    // 1. 获取API密钥
    // 2. 实现搜索接口
    // 3. 处理CORS问题
    // 4. 返回标准化的音乐数据
    
    console.log('QQ音乐API集成待实现:', query);
    return [];
  }

  // 获取音乐播放URL（为未来API集成准备）
  static async getMusicUrl(musicId: string, source: string): Promise<string> {
    // 未来实现：根据来源获取真实的音乐播放URL
    // 1. 网易云音乐：通过歌曲ID获取播放链接
    // 2. QQ音乐：通过歌曲ID获取播放链接
    // 3. 其他平台：相应的API调用
    
    console.log('获取音乐播放URL:', musicId, source);
    return '';
  }

  // 验证音频文件是否存在
  static async validateAudioUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('音频URL验证失败:', url, error);
      return false;
    }
  }
}