# Stage 1: Build
FROM node:18-alpine AS build

# Cài đặt các package cần thiết nếu dùng native module (tùy vào app)
RUN apk add --no-cache libc6-compat

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies chỉ dành cho production
RUN npm install --production

# Copy toàn bộ mã nguồn ứng dụng
COPY . .

# Stage 2: Production
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy từ build stage, chỉ copy thư mục cần thiết cho production
COPY --from=build /usr/src/app /usr/src/app

# Expose cổng mà server backend chạy (3001)
EXPOSE 3001

# Chạy server khi container khởi động
CMD ["node", "app.js"]
