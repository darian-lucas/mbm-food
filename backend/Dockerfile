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

# Expose cổng mà server backend chạy
EXPOSE 3001

# Chạy server khi container khởi động
CMD ["node", "app.js"]
