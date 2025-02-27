const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("⚠️ Không tìm thấy header Authorization");
            return res.status(401).json({ message: "Không có token, vui lòng đăng nhập" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            console.log("⚠️ Không tìm thấy token");
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
        console.log("✅ Token hợp lệ:", decoded);
        
        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    } catch (error) {
        console.error("⛔ Lỗi xác thực token:", error.message);
        return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = authMiddleware;
