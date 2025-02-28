const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/users');
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/product');
const postRoutes = require('./src/routes/post')
const favoriteRoutes = require('./src/routes/favorite');


const cors = require("cors");
const compression = require("compression");




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));
app.use(express.json({ type: "application/json", charset: "utf-8" }));
app.use(compression());




// Kết nối DB
connectDB();

// Định tuyến
app.use('/api/user', userRoutes);
app.use('/api', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favorite', favoriteRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);

});




