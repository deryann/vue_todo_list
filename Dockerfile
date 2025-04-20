# 建構階段
FROM node:18-alpine AS build-stage

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到工作目錄
COPY package*.json ./

# 安裝專案相依套件
RUN npm install

# 複製所有專案檔案到工作目錄
COPY . .

# 建構 Vue 應用程式 (使用 Vite 建構)
RUN npm run build

# 執行階段
FROM nginx:alpine AS production-stage

# 從建構階段複製靜態檔案到 Nginx 的服務目錄
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 設定容器暴露的埠號
EXPOSE 80

# 執行 Nginx
CMD ["nginx", "-g", "daemon off;"]
