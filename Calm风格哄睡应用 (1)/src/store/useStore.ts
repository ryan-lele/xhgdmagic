
import { create } from 'zustand'

interface AudioTrack {
  name: string
  duration: string
  image: string
  audioUrl: string
  type?: string
}

interface AppState {
  // 用户偏好设置
  isDarkMode: boolean
  volume: number
  sleepTimer: number
  
  // 播放状态
  currentTrack: AudioTrack | null
  isPlaying: boolean
  
  // 用户统计
  stats: {
    consecutiveDays: number
    totalSleepTime: string
    meditationCount: number
    favoriteStories: number
  }
  
  // Actions
  setDarkMode: (isDark: boolean) => void
  setVolume: (volume: number) => void
  setSleepTimer: (timer: number) => void
  setCurrentTrack: (track: AudioTrack | null) => void
  setIsPlaying: (playing: boolean) => void
  updateStats: (stats: Partial<AppState['stats']>) => void
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  isDarkMode: true,
  volume: 80,
  sleepTimer: 30,
  currentTrack: null,
  isPlaying: false,
  stats: {
    consecutiveDays: 12,
    totalSleepTime: '48小时',
    meditationCount: 23,
    favoriteStories: 8
  },
  
  // Actions
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setVolume: (volume) => set({ volume }),
  setSleepTimer: (timer) => set({ sleepTimer: timer }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats }
  }))
}))
