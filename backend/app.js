<<<<<<< Updated upstream
const a = 113;
console.log("🚀 ~ a:", a);
=======
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/users');
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
// Kết nối DB
connectDB();

// Định tuyến
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});
>>>>>>> Stashed changes
