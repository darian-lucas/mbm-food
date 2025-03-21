export const checkTokenValidity = async (token: string) => {
    try {
        const response = await fetch("http://localhost:3001/api/auth/check-token", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi kiểm tra token:", error);
        return { valid: false }; // Trả về false nếu token không hợp lệ
    }
};
