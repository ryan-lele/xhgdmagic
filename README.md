# 🌙 宁静魔法 - AI共创绘本工坊

一个基于React + TypeScript的温馨儿童绘本创作应用，集成了AI故事生成、音乐播放、冥想功能等。

## ✨ 主要功能

### 🎨 AI绘本工坊
- **智能故事生成**: 基于文本描述或图片上传生成温馨绘本
- **本地化处理**: 使用预设的高质量图片和故事模板
- **互动功能**: 点赞、收藏、分享（控制台输出）
- **多模板支持**: 小兔子、小熊、小猫、小鸟等故事模板

### 🎵 音乐系统
- **晚安音乐**: 多种环境音效（森林、海洋、雨声等）
- **音乐管理**: 支持Pixabay音乐搜索和播放
- **音频播放**: 完整的播放控制功能

### 🧘 魔法时刻
- **冥想功能**: 宁静的冥想体验
- **绘本创作**: 集成AI绘本工坊功能
- **AR互动**: 计划中的增强现实功能

### 🔐 用户系统
- **Firebase认证**: 支持邮箱登录和匿名访问
- **用户管理**: 个人资料和偏好设置
- **数据同步**: 云端数据存储

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS + Framer Motion
- **状态管理**: React Context + Hooks
- **后端**: Firebase (Authentication + Firestore)
- **部署**: Vercel (可选)
- **包管理**: pnpm

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 访问应用
打开浏览器访问: http://localhost:5173

## 📱 功能演示

### 绘本创作流程
1. 进入"魔法时刻"页面
2. 点击"AI共创绘本工坊"
3. 描述您想要的故事（如："一只小兔子在森林里遇到了魔法蝴蝶"）
4. 点击"开始创作绘本"
5. 浏览生成的绘本，进行互动操作

### 音乐播放
1. 进入"晚安音乐"页面
2. 选择喜欢的音乐类型
3. 享受宁静的音乐体验

## 🔧 配置说明

### Firebase配置
项目使用Firebase进行用户认证和数据存储。配置文件位于 `src/firebaseConfig.ts`。

### 环境变量
```bash
# Firebase配置
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📚 文档

- [快速开始指南](QUICK_START.md)
- [AI绘本工坊使用指南](STORYBOOK_WORKSHOP_GUIDE.md)
- [Firebase设置指南](FIREBASE_SETUP.md)
- [部署指南](DEPLOYMENT_GUIDE.md)

## 🎯 开发说明

### 项目结构
```
src/
├── components/     # React组件
├── pages/         # 页面组件
├── contexts/      # React Context
├── hooks/         # 自定义Hooks
├── lib/           # 工具库
├── services/      # 服务层
└── data/          # 静态数据
```

### 本地开发
- 所有功能都可以在本地运行
- AI绘本生成使用本地故事模板
- 互动功能输出到浏览器控制台

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🌟 特色

- **宁静魔法风格**: 深蓝渐变背景，温馨的配色方案
- **流畅动画**: 使用Framer Motion实现丝滑过渡
- **响应式设计**: 完美适配移动端和桌面端
- **本地化优先**: 无需复杂配置即可运行

---

**享受创作，分享快乐！** 🌟

在AI共创绘本工坊中，每个涂鸦都可能成为一段美好的故事。让我们一起用想象力创造更多温馨的回忆！