# Firebase 认证系统设置指南

## 概述

本项目已集成完整的 Firebase 认证和数据持久化系统，包括：

- Firebase Authentication（用户认证）
- Cloud Firestore（数据库）
- 自动匿名用户创建
- 用户数据同步
- 收藏功能

## 设置步骤

### 1. 安装依赖

```bash
pnpm install
```

### 2. Firebase 项目配置

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目或选择现有项目
3. 在项目设置中获取配置信息
4. 打开 `src/firebaseConfig.ts` 文件
5. 替换以下占位符为您的实际配置：

```typescript
const firebaseConfig = {
  apiKey: "your-api-key-here",                    // 替换为您的 API Key
  authDomain: "your-project-id.firebaseapp.com",  // 替换为您的项目域名
  projectId: "your-project-id",                   // 替换为您的项目 ID
  storageBucket: "your-project-id.appspot.com",   // 替换为您的存储桶
  messagingSenderId: "your-sender-id",            // 替换为您的发送者 ID
  appId: "your-app-id"                            // 替换为您的应用 ID
};
```

### 3. Firebase 服务启用

#### 启用 Authentication
1. 在 Firebase Console 中，转到 "Authentication" > "Sign-in method"
2. 启用以下登录方式：
   - **Email/Password**（邮箱/密码）
   - **Anonymous**（匿名登录）

#### 启用 Firestore
1. 在 Firebase Console 中，转到 "Firestore Database"
2. 创建数据库（选择测试模式即可）
3. 设置安全规则（可选，用于生产环境）

### 4. 运行项目

```bash
pnpm dev
```

访问 `http://localhost:5173/auth` 查看认证系统。

## 功能特性

### 自动匿名用户
- 用户首次访问时自动创建匿名账户
- 无需手动注册即可使用基本功能

### 用户认证
- 邮箱/密码登录
- 邮箱/密码注册
- 用户登出
- 认证状态持久化

### 数据管理
- 自动同步用户数据到 Firestore
- 实时数据监听
- 收藏故事功能
- 数据持久化

### 用户界面
- 响应式设计
- 宁静魔法主题
- 加载状态处理
- 错误提示

## 数据结构

### Firestore 集合结构

```
users/
  {userId}/
    favoriteStories: string[]  // 收藏的故事 ID 数组
```

### 用户数据类型

```typescript
interface UserData {
  favoriteStories: string[];
}
```

## 使用方法

### 在组件中使用认证状态

```typescript
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <p>欢迎，{user.email || '匿名用户'}！</p>
      ) : (
        <p>正在加载...</p>
      )}
    </div>
  );
};
```

### 访问用户数据

```typescript
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const getUserData = (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  
  return onSnapshot(userDocRef, (doc) => {
    if (doc.exists()) {
      const userData = doc.data() as UserData;
      console.log('用户数据:', userData);
    }
  });
};
```

## 安全注意事项

1. **生产环境配置**：
   - 更新 Firestore 安全规则
   - 配置 Firebase App Check
   - 设置适当的 CORS 策略

2. **API 密钥保护**：
   - 不要在客户端代码中暴露敏感信息
   - 使用环境变量管理配置

3. **用户数据验证**：
   - 在服务器端验证用户输入
   - 实施适当的访问控制

## 故障排除

### 常见问题

1. **认证失败**：
   - 检查 Firebase 配置是否正确
   - 确认 Authentication 服务已启用
   - 验证登录方式是否已启用

2. **数据库连接失败**：
   - 确认 Firestore 已启用
   - 检查安全规则设置
   - 验证项目 ID 是否正确

3. **数据同步问题**：
   - 检查网络连接
   - 查看浏览器控制台错误信息
   - 确认用户权限设置

### 调试技巧

1. 启用 Firebase 调试模式：
   ```typescript
   import { connectFirestoreEmulator } from 'firebase/firestore';
   
   if (process.env.NODE_ENV === 'development') {
     connectFirestoreEmulator(db, 'localhost', 8080);
   }
   ```

2. 查看认证状态：
   ```typescript
   console.log('当前用户:', auth.currentUser);
   ```

3. 监听认证状态变化：
   ```typescript
   onAuthStateChanged(auth, (user) => {
     console.log('认证状态变化:', user);
   });
   ```

## 扩展功能

### 添加更多用户数据字段

```typescript
interface ExtendedUserData {
  favoriteStories: string[];
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
  profile: {
    displayName: string;
    avatar: string;
  };
}
```

### 实现用户资料管理

```typescript
const updateUserProfile = async (userId: string, profileData: any) => {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, { profile: profileData }, { merge: true });
};
```

### 添加社交功能

```typescript
const shareStory = async (storyId: string, userId: string) => {
  const shareDocRef = doc(db, 'shares', `${userId}_${storyId}`);
  await setDoc(shareDocRef, {
    storyId,
    userId,
    timestamp: new Date(),
    likes: 0
  });
};
```

## 支持

如果您在使用过程中遇到问题，请：

1. 检查 Firebase Console 中的错误日志
2. 查看浏览器开发者工具的控制台
3. 确认所有依赖已正确安装
4. 验证 Firebase 配置信息

---

**注意**：请确保在生产环境中正确配置 Firebase 安全规则和 App Check 以保护您的应用和数据。

