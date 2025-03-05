const API_URL = "http://localhost:3001/api/orders/user";

const getOrdersByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) throw new Error("Lỗi khi lấy đơn hàng");
        return await response.json();
    } catch (error) {
        console.error(error);
        return { orders: [], orderDetails: [] };
    }
};

export default { getOrdersByUserId };
