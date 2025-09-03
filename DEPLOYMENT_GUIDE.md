# AI绘本工坊部署指南

## 🚀 部署步骤

### 1. 环境准备

#### 必需的环境变量
```bash
# Google Gemini API密钥
GEMINI_API_KEY=AIzaSyCizprdmXbLb8USDSM2TvpawYHWTl9GQfs

# Firebase配置
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### 2. Vercel部署

#### 方法一：通过Vercel CLI部署

1. **安装Vercel CLI**
```bash
npm install -g vercel
```

2. **登录Vercel**
```bash
vercel login
```

3. **配置环境变量**
```bash
vercel env add GEMINI_API_KEY
# 输入: AIzaSyCizprdmXbLb8USDSM2TvpawYHWTl9GQfs

vercel env add FIREBASE_API_KEY
# 输入你的Firebase API密钥

# ... 添加其他Firebase环境变量
```

4. **部署项目**
```bash
vercel --prod
```

#### 方法二：通过Vercel Dashboard部署

1. **连接GitHub仓库**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的GitHub仓库

2. **配置环境变量**
   - 在项目设置中添加环境变量
   - 添加所有必需的环境变量

3. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成

### 3. Firebase配置

#### 更新Firestore安全规则

1. **访问Firebase Console**
   - 打开 [Firebase Console](https://console.firebase.google.com/)
   - 选择你的项目

2. **更新安全规则**
   - 进入 Firestore Database > 规则
   - 复制 `firestore.rules` 文件内容
   - 发布规则

#### 启用必要的服务

1. **Authentication**
   - 启用 Email/Password 登录
   - 启用 Anonymous 登录

2. **Firestore Database**
   - 创建数据库
   - 选择生产模式

3. **Analytics**
   - 启用 Google Analytics

### 4. 测试部署

#### 本地测试
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问测试页面
http://localhost:5173/test-storybook
```

#### 生产环境测试

1. **访问绘本工坊**
   - 打开部署的网站
   - 访问 `/storybook` 路径

2. **测试功能**
   - 上传测试图片
   - 生成绘本
   - 验证所有功能正常

### 5. 监控和维护

#### 监控API使用情况

1. **Google Gemini API**
   - 监控API调用次数
   - 检查配额使用情况
   - 设置使用限制

2. **Firebase使用情况**
   - 监控Firestore读写次数
   - 检查存储使用量
   - 监控认证用户数量

#### 性能优化

1. **图片优化**
   - 压缩上传的图片
   - 使用CDN加速图片加载

2. **缓存策略**
   - 实现API响应缓存
   - 优化Firestore查询

### 6. 故障排除

#### 常见问题

1. **API调用失败**
   - 检查API密钥是否正确
   - 验证网络连接
   - 查看Vercel函数日志

2. **Firebase连接失败**
   - 检查Firebase配置
   - 验证安全规则
   - 确认服务已启用

3. **图片上传失败**
   - 检查文件大小限制
   - 验证文件格式
   - 确认网络连接

#### 调试方法

1. **查看日志**
```bash
# Vercel函数日志
vercel logs

# 浏览器控制台
# 打开开发者工具查看错误信息
```

2. **测试API**
```bash
# 测试绘本生成API
curl -X POST https://your-domain.vercel.app/api/generate-storybook \
  -H "Content-Type: application/json" \
  -d '{"imageBase64":"test","userId":"test","userName":"test"}'
```

### 7. 安全注意事项

#### API密钥安全
- 不要在客户端代码中暴露API密钥
- 使用环境变量存储敏感信息
- 定期轮换API密钥

#### 数据安全
- 实施适当的Firestore安全规则
- 验证用户输入
- 防止恶意文件上传

#### 访问控制
- 限制API调用频率
- 实施用户认证
- 监控异常活动

### 8. 扩展功能

#### 计划中的功能
- 真实的TTS音频生成
- 更高质量的AI图片生成
- 多语言支持
- 协作创作功能

#### 性能提升
- 实现图片压缩
- 添加CDN支持
- 优化数据库查询
- 实现离线支持

---

## 📞 技术支持

如果在部署过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查Vercel和Firebase的官方文档
3. 查看项目的GitHub Issues
4. 联系技术支持团队

**祝您部署顺利！** 🎉
