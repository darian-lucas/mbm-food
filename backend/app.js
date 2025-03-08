const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/users');
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/product');
const postRoutes = require('./src/routes/post')
const favoriteRoutes = require('./src/routes/favorite');
const postCommentRoutes = require('./src/routes/postComment');
const orderRoutes = require('./src/routes/order');
const paymentMethodRoutes = require('./src/routes/paymentMethods');



const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));
app.use(express.json({ type: "application/json", charset: "utf-8" }));




// Kết nối DB
connectDB();

// Định tuyến
app.use('/api/user', userRoutes);
app.use('/api', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/cmt', postCommentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentMethodRoutes);
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);

});




