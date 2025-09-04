# Firebase Firestore 安全规则配置指南

## 🔒 安全规则概述

本文档提供了"宁静魔法"应用所需的 Firebase Firestore 安全规则配置。

## 📋 规则说明

### 1. 用户数据访问规则
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
- **功能**：允许经过身份验证的用户读写自己的用户数据
- **适用场景**：用户个人资料、设置等数据

### 2. 用户收藏数据规则
```javascript
match /users/{userId}/favorites/{favoriteId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
- **功能**：允许用户管理自己的收藏内容
- **适用场景**：收藏的音乐、故事等

### 3. 用户收藏故事规则
```javascript
match /users/{userId}/favoriteStories/{storyId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
- **功能**：允许用户管理自己的收藏故事
- **适用场景**：故事收藏功能

### 4. 全局音乐库规则
```javascript
match /music/{musicId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.uid in ['admin-uid-here'];
}
```
- **功能**：所有用户可读取，仅管理员可写入
- **适用场景**：全局音乐库管理

### 5. 全局故事库规则
```javascript
match /stories/{storyId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.uid in ['admin-uid-here'];
}
```
- **功能**：所有用户可读取，仅管理员可写入
- **适用场景**：全局故事库管理

## 🚀 部署步骤

### 方法1：使用 Firebase CLI

1. **安装 Firebase CLI**（如果尚未安装）：
   ```bash
   npm install -g firebase-tools
   ```

2. **登录 Firebase**：
   ```bash
   firebase login
   ```

3. **初始化项目**（如果尚未初始化）：
   ```bash
   firebase init firestore
   ```

4. **部署规则**：
   ```bash
   firebase deploy --only firestore:rules
   ```

### 方法2：使用 Firebase 控制台

1. **访问 Firebase 控制台**：
   - 打开 [Firebase Console](https://console.firebase.google.com/)
   - 选择您的项目

2. **导航到 Firestore**：
   - 在左侧菜单中点击 "Firestore Database"
   - 点击 "规则" 标签页

3. **更新规则**：
   - 将 `firestore.rules` 文件中的内容复制到规则编辑器中
   - 点击 "发布" 按钮

## ⚠️ 重要注意事项

### 1. 管理员UID配置
在部署前，请将规则中的 `'admin-uid-here'` 替换为实际的管理员用户UID：

```javascript
// 替换这行
allow write: if request.auth != null && request.auth.uid in ['admin-uid-here'];

// 为实际的管理员UID
allow write: if request.auth != null && request.auth.uid in ['your-admin-uid-1', 'your-admin-uid-2'];
```

### 2. 匿名用户支持
当前规则支持匿名用户，确保您的应用能够正确处理匿名用户的身份验证。

### 3. 测试规则
部署后，建议在 Firebase 控制台的 "规则" 标签页中使用 "规则模拟器" 测试规则是否正确工作。

## 🔧 自定义配置

### 添加新的数据集合
如果需要添加新的数据集合，请按照以下模式添加规则：

```javascript
match /your-collection/{documentId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

### 修改权限级别
根据应用需求，您可以调整权限级别：

- **只读权限**：`allow read: if request.auth != null;`
- **读写权限**：`allow read, write: if request.auth != null;`
- **管理员权限**：`allow read, write: if request.auth != null && request.auth.uid in ['admin-uid'];`

## 🐛 故障排除

### 常见问题

1. **权限被拒绝错误**
   - 检查用户是否已正确登录
   - 验证用户UID是否与规则中的条件匹配

2. **匿名用户无法访问**
   - 确保匿名用户已通过 `signInAnonymously` 登录
   - 检查规则是否包含匿名用户的条件

3. **规则部署失败**
   - 检查规则语法是否正确
   - 确保 Firebase CLI 已正确配置

### 调试技巧

1. **使用规则模拟器**：
   - 在 Firebase 控制台中测试规则
   - 模拟不同的用户和操作场景

2. **查看错误日志**：
   - 在 Firebase 控制台的 "使用情况" 标签页中查看错误
   - 检查浏览器控制台的错误信息

## 📞 支持

如果在配置过程中遇到问题，请：

1. 检查 Firebase 官方文档
2. 查看应用的控制台错误信息
3. 使用 Firebase 控制台的规则模拟器进行测试

---

**注意**：这些规则已经过测试，适用于"宁静魔法"应用的基本功能。根据实际需求，您可能需要进一步调整规则。




