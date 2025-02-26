const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
        if (!token) return res.status(401).json({ message: "Không có token, vui lòng đăng nhập" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
        req.user = { userId: decoded.userId, role: decoded.role }; // Gán user vào request

        next(); // Cho phép request tiếp tục
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = authMiddleware;
