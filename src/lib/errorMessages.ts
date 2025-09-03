// Firebase 认证错误消息汉化
export const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    // 认证错误
    'auth/invalid-credential': '邮箱或密码不正确，请重新尝试。',
    'auth/user-not-found': '未找到该邮箱对应的账户，请检查邮箱地址。',
    'auth/wrong-password': '密码错误，请重新输入。',
    'auth/invalid-email': '邮箱格式不正确，请输入有效的邮箱地址。',
    'auth/user-disabled': '该账户已被禁用，请联系客服。',
    'auth/too-many-requests': '尝试次数过多，请稍后再试。',
    
    // 注册错误
    'auth/email-already-in-use': '该邮箱已被注册，请使用其他邮箱或直接登录。',
    'auth/weak-password': '密码强度不够，请设置至少6位字符的密码。',
    'auth/operation-not-allowed': '该操作不被允许，请联系管理员。',
    
    // 网络和配置错误
    'auth/network-request-failed': '网络连接失败，请检查网络后重试。',
    'auth/api-key-not-valid': '服务配置错误，请联系技术支持。',
    'auth/app-not-authorized': '应用未授权，请联系管理员。',
    'auth/invalid-api-key': 'API 密钥无效，请联系技术支持。',
    
    // 其他错误
    'auth/requires-recent-login': '为了安全起见，请重新登录。',
    'auth/credential-already-in-use': '该凭据已被其他账户使用。',
    'auth/invalid-verification-code': '验证码无效，请重新获取。',
    'auth/invalid-verification-id': '验证ID无效，请重新获取。',
    'auth/missing-verification-code': '缺少验证码，请重新获取。',
    'auth/missing-verification-id': '缺少验证ID，请重新获取。',
    'auth/quota-exceeded': '请求次数超限，请稍后再试。',
    'auth/timeout': '请求超时，请重试。',
    'auth/unauthorized-domain': '未授权的域名，请联系管理员。',
    'auth/user-token-expired': '登录已过期，请重新登录。',
    'auth/web-storage-unsupported': '浏览器不支持本地存储，请使用其他浏览器。',
    
    // 默认错误
    'default': '操作失败，请稍后重试。'
  };

  return errorMessages[errorCode] || errorMessages['default'];
};

// 从 Firebase 错误对象中提取错误代码
export const extractErrorCode = (error: any): string => {
  if (error?.code) {
    return error.code;
  }
  
  if (error?.message) {
    // 尝试从错误消息中提取错误代码
    const match = error.message.match(/auth\/[a-z-]+/);
    if (match) {
      return match[0];
    }
  }
  
  return 'default';
};

// 获取用户友好的错误消息
export const getFriendlyErrorMessage = (error: any): string => {
  const errorCode = extractErrorCode(error);
  return getAuthErrorMessage(errorCode);
};


