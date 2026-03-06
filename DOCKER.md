# Docker Setup

## 🐳 Quick Start

### Build và chạy
```bash
# Build image
make build

# Start container
make up

# Xem logs
make logs

# Stop container
make down

# Restart
make restart

# Clean up
make clean
```

### Hoặc dùng docker compose trực tiếp
```bash
# Build
docker compose build

# Start
docker compose up -d

# Stop
docker compose down
```

## 📝 Files

- `Dockerfile` - Multi-stage build cho production
- `docker-compose.yml` - Orchestration config
- `.dockerignore` - Exclude files khỏi build context
- `Makefile` - Shortcuts cho Docker commands

## 🚀 Production

App chạy trên port **3000**

Access: http://localhost:3000

## 💡 Notes

- Image size tối ưu với multi-stage build
- Standalone output cho Next.js
- Non-root user (nextjs:nodejs)
- Alpine Linux base image
