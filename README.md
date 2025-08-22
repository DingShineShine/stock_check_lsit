# 📈 股票交易决策检查清单

一个基于科学决策流程的股票交易助手网站，帮助投资者进行理性的买入/卖出决策。

## ✨ 功能特性

- 🎯 **渐进式决策流程**：逐步引导用户完成决策检查
- 🧠 **科学决策模型**：基于市场规律和心理学的检查清单
- 📱 **响应式设计**：支持手机和电脑访问
- 💾 **本地存储**：保存决策历史记录
- 🎨 **现代化UI**：简洁美观的用户界面
- 🐳 **容器化部署**：Docker一键部署

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问应用
open http://localhost:3000
```

### Linux服务器部署

#### 方法一：一键部署脚本（推荐）

```bash
# 上传项目文件到服务器
scp -r . user@your-server:/path/to/app

# 登录服务器
ssh user@your-server

# 进入项目目录
cd /path/to/app

# 给脚本执行权限
chmod +x deploy.sh

# 运行一键部署
./deploy.sh
```

#### 方法二：手动部署

```bash
# 1. 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. 构建并启动应用
docker-compose build
docker-compose up -d

# 3. 查看状态
docker-compose ps
```

## 📊 决策流程

1. **操作类型确定**：买入 or 卖出
2. **环境研判检查**：客观分析 vs 主观臆测
3. **操作逻辑验证**：热点/趋势/超跌 买入逻辑
4. **时机检查**：强弱势理论验证
5. **心态风险检查**：理性 vs 恐惧驱动

### 决策结果

- ✅ **买入通过**：🎯 祝你好运，冒险家！
- ✅ **卖出通过**：🛡️ 理性止盈，保护收益！
- ⚠️ **谨慎执行**：决策基本合理，但仍需谨慎
- ❌ **不建议执行**：建议重新评估决策

## 🛠️ 技术栈

- **后端**：Node.js + Express.js
- **前端**：HTML5 + CSS3 + JavaScript (ES6+)
- **容器化**：Docker + Docker Compose
- **部署**：Linux 服务器

## 📁 项目结构

```
stock-checklist/
├── package.json          # Node.js项目配置
├── server.js             # Express服务器
├── healthcheck.js        # 健康检查脚本
├── Dockerfile            # Docker镜像配置
├── docker-compose.yml    # Docker Compose配置
├── deploy.sh             # 一键部署脚本
├── public/               # 静态资源目录
│   ├── index.html        # 主页面
│   ├── style.css         # 样式文件
│   └── script.js         # 前端逻辑
└── README.md             # 项目说明
```

## 🔧 管理命令

```bash
# 查看应用状态
docker-compose ps

# 查看应用日志
docker-compose logs -f

# 重启应用
docker-compose restart

# 停止应用
docker-compose down

# 更新应用
docker-compose down
docker-compose build
docker-compose up -d
```

## 🌐 访问方式

部署成功后，可通过以下方式访问：

- 服务器IP地址：`http://YOUR_SERVER_IP`
- 服务器域名：`http://your-domain.com`（如已绑定域名）

## ⚠️ 免责声明

本工具仅供学习和参考使用，不构成任何投资建议。投资有风险，决策需谨慎。使用者应当根据自身情况做出独立的投资决策，并承担相应的投资风险。

## 📝 许可证

MIT License

---

💡 **提示**：建议在真实交易前充分测试决策流程，确保理解每个检查点的含义。
