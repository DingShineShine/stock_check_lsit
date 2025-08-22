#!/bin/bash

# 股票决策检查清单 - 一键部署脚本
# 适用于 Ubuntu/CentOS Linux 服务器

echo "🚀 开始部署股票决策检查清单应用..."

# 检查是否安装了 Docker
if ! command -v docker &> /dev/null; then
    echo "📦 正在安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✅ Docker 安装完成"
fi

# 检查是否安装了 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "📦 正在安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose 安装完成"
fi

# 停止并删除现有容器（如果存在）
echo "🔄 清理现有容器..."
docker-compose down 2>/dev/null || true

# 构建并启动应用
echo "🏗️ 构建应用镜像..."
docker-compose build

echo "🚀 启动应用..."
docker-compose up -d

# 等待应用启动
echo "⏰ 等待应用启动..."
sleep 10

# 检查容器状态
if docker-compose ps | grep -q "Up"; then
    echo "✅ 应用部署成功！"
    echo ""
    echo "🌐 访问地址:"
    echo "   http://$(curl -s ifconfig.me)"
    echo "   或"
    echo "   http://$(hostname -I | awk '{print $1}')"
    echo ""
    echo "📊 容器状态:"
    docker-compose ps
    echo ""
    echo "📝 查看日志: docker-compose logs -f"
    echo "🔄 重启应用: docker-compose restart"
    echo "🛑 停止应用: docker-compose down"
else
    echo "❌ 应用启动失败，请检查日志:"
    docker-compose logs
fi
