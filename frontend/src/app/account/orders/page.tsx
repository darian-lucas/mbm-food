"use client";
import { useEffect, useState } from "react";
import orderService from "../../admin/services/OrderServices";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddressTable() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setLoading(false);
            return;
        }

        orderService.getOrdersByUserId(userId)
            .then(data => {
                if (data.orders.length > 0) {
                    setOrders(data.orders); // Lấy tất cả đơn hàng của người dùng
                }
            })
            .catch(err => console.error("Lỗi khi lấy đơn hàng:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!orders.length) return <p>Không tìm thấy đơn hàng nào!</p>;

    return (
        <div>
            <h5>ĐƠN HÀNG CỦA BẠN</h5>
            <table className="table table-bordered table-danger mt-3">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ nhận</th>
                        <th>Ghi chú</th>
                        <th>Ngày đặt</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.order_code || "N/A"}</td>
                            <td>{order.name || "N/A"}</td>
                            <td>{order.id_user?.email || "N/A"}</td>
                            <td>{order.phone || "N/A"}</td>
                            <td>{order.receive_address || "N/A"}</td>
                            <td>{order.note || "Không có ghi chú"}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <span className={`badge bg-${order.status === "pending" ? "warning" : "success"}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.total_amount.toLocaleString("vi-VN")} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
