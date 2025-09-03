// 音乐数据类型定义
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number; // 秒
  category: 'sleep' | 'relax' | 'meditation' | 'lofi' | 'ambient' | 'nature';
  tags: string[];
  thumbnail?: string;
  description?: string;
  source: 'pixabay' | 'freesound' | 'local' | 'other';
  addedAt: string; // ISO 日期字符串
}

// 预定义的助眠音乐数据
export const defaultMusicTracks: MusicTrack[] = [
  {
    id: 'default-1',
    title: '宁静雨声',
    artist: '自然声音',
    url: 'https://www.soundjay.com/misc/sounds/rain-01.wav',
    duration: 300,
    category: 'nature',
    tags: ['雨声', '自然', '放松'],
    description: '轻柔的雨声，帮助放松心情',
    source: 'other',
    addedAt: new Date().toISOString()
  },
  {
    id: 'default-2',
    title: '海浪轻拍',
    artist: '海洋声音',
    url: 'https://www.soundjay.com/misc/sounds/ocean-waves.wav',
    duration: 420,
    category: 'nature',
    tags: ['海浪', '海洋', '冥想'],
    description: '温柔的海浪声，营造宁静氛围',
    source: 'other',
    addedAt: new Date().toISOString()
  },
  {
    id: 'default-3',
    title: '森林鸟鸣',
    artist: '自然声音',
    url: 'https://www.soundjay.com/misc/sounds/birds.wav',
    duration: 360,
    category: 'nature',
    tags: ['鸟鸣', '森林', '自然'],
    description: '清晨森林中的鸟鸣声',
    source: 'other',
    addedAt: new Date().toISOString()
  }
];

// 音乐分类配置
export const musicCategories = {
  sleep: {
    name: '助眠音乐',
    description: '帮助入睡的舒缓音乐',
    keywords: ['sleep', 'lullaby', 'bedtime', 'calm']
  },
  relax: {
    name: '放松音乐',
    description: '缓解压力的轻松音乐',
    keywords: ['relax', 'peaceful', 'serene', 'tranquil']
  },
  meditation: {
    name: '冥想音乐',
    description: '适合冥想和正念的音乐',
    keywords: ['meditation', 'mindfulness', 'zen', 'spiritual']
  },
  lofi: {
    name: 'Lo-Fi 音乐',
    description: '低保真度的怀旧音乐',
    keywords: ['lofi', 'chill', 'study', 'ambient']
  },
  ambient: {
    name: '环境音乐',
    description: '营造氛围的环境音效',
    keywords: ['ambient', 'atmospheric', 'soundscape', 'ethereal']
  },
  nature: {
    name: '自然声音',
    description: '来自大自然的原始声音',
    keywords: ['nature', 'rain', 'ocean', 'forest', 'birds']
  }
};

// 音乐管理工具函数
export class MusicManager {
  private static storageKey = 'calm-magic-music-tracks';

  // 获取所有音乐
  static getAllMusic(): MusicTrack[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('获取音乐数据失败:', error);
    }
    return defaultMusicTracks;
  }

  // 添加新音乐
  static addMusic(track: Omit<MusicTrack, 'id' | 'addedAt'>): MusicTrack {
    const newTrack: MusicTrack = {
      ...track,
      id: `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString()
    };

    const allMusic = this.getAllMusic();
    allMusic.push(newTrack);
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(allMusic));
    } catch (error) {
      console.error('保存音乐数据失败:', error);
    }

    return newTrack;
  }

  // 删除音乐
  static removeMusic(trackId: string): boolean {
    const allMusic = this.getAllMusic();
    const filteredMusic = allMusic.filter(track => track.id !== trackId);
    
    if (filteredMusic.length === allMusic.length) {
      return false; // 没有找到要删除的音乐
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(filteredMusic));
      return true;
    } catch (error) {
      console.error('删除音乐数据失败:', error);
      return false;
    }
  }

  // 按分类获取音乐
  static getMusicByCategory(category: MusicTrack['category']): MusicTrack[] {
    return this.getAllMusic().filter(track => track.category === category);
  }

  // 搜索音乐
  static searchMusic(query: string): MusicTrack[] {
    const allMusic = this.getAllMusic();
    const lowercaseQuery = query.toLowerCase();
    
    return allMusic.filter(track => 
      track.title.toLowerCase().includes(lowercaseQuery) ||
      track.artist.toLowerCase().includes(lowercaseQuery) ||
      track.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      track.description?.toLowerCase().includes(lowercaseQuery)
    );
  }

  // 重置为默认音乐
  static resetToDefault(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(defaultMusicTracks));
    } catch (error) {
      console.error('重置音乐数据失败:', error);
    }
  }
}


