const API_URL = "http://localhost:3001/api/orders";

const getOrdersByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        if (!response.ok) throw new Error("Lỗi khi lấy đơn hàng");
        return await response.json();
    } catch (error) {
        console.error(error);
        return { orders: [], orderDetails: [] };
    }
};

const getAllOrders = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Lỗi khi lấy danh sách đơn hàng: ${response.statusText}`);
        }
        
        const data = await response.json(); // Chỉ gọi json() một lần
        console.log("Fetched Orders:", data); // Kiểm tra dữ liệu nhận được
        return data;
    } catch (error) {
        console.error("Lỗi:", error);
        return [];
    }
};

export default { getOrdersByUserId, getAllOrders };
