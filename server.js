const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 禁用CSP以避免开发环境问题（生产环境请重新配置）
app.use((req, res, next) => {
    // 完全禁用CSP
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Security-Policy');
    res.removeHeader('Content-Security-Policy-Report-Only');
    
    // 设置非常宽松的CSP（如果需要的话）
    // res.setHeader('Content-Security-Policy', 
    //     "default-src 'self'; " +
    //     "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    //     "font-src 'self' https://fonts.gstatic.com; " +
    //     "img-src 'self' data:; " +
    //     "connect-src 'self';"
    // );
    
    next();
});

// 托管静态文件
app.use(express.static('public'));

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 股票决策检查清单服务器启动成功！`);
  console.log(`📱 访问地址: http://localhost:${PORT}`);
  console.log(`⏰ 启动时间: ${new Date().toLocaleString('zh-CN')}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('📴 服务器正在关闭...');
  process.exit(0);
});
