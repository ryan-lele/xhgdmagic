// Firebase 配置与初始化文件
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase 配置对象
const firebaseConfig = {
  apiKey: "AIzaSyD3KcoeiiBFCIbxWO1SGz7sz79jH8bwPIU",
  authDomain: "xhgdmagic-app.firebaseapp.com",
  projectId: "xhgdmagic-app",
  storageBucket: "xhgdmagic-app.firebasestorage.app",
  messagingSenderId: "523295999580",
  appId: "1:523295999580:web:0a47a523b3add7afa5c899",
  measurementId: "G-4RWFL0TGBS"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 初始化 Firebase Authentication
export const auth = getAuth(app);

// 初始化 Cloud Firestore
export const db = getFirestore(app);

// 初始化 Firebase Analytics（仅在浏览器环境中）
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// 导出 Firebase 应用实例
export default app;
