# Sử dụng Node.js phiên bản 18
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build Next.js (bắt buộc để chạy production mode)
RUN npm run build

# Expose cổng của Next.js (mặc định 3000)
EXPOSE 3002

# Chạy ứng dụng
CMD ["npm", "start"]
