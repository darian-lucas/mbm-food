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

        fetchOrders(userId);
    }, []);

    const fetchOrders = async (userId: string) => {
        try {
            const data = await orderService.getOrdersByUserId(userId);
            if (data.orders.length > 0) {
                const updatedOrders = await Promise.all(
                    data.orders.map(async (order) => {
                        if (order.id_payment_method?._id) {
                            const paymentStatus = await fetchPaymentStatus(order.id_payment_method._id);
                            return { ...order, payment_status: paymentStatus };
                        }
                        return { ...order, payment_status: "pending" };
                    })
                );
                setOrders(updatedOrders);
            }
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPaymentStatus = async (paymentId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/payments/${paymentId}`);
            const data = await response.json();
            return data.status || "pending";
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái thanh toán:", error);
            return "pending";
        }
    };

    const handlePayment = async (paymentId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/payments/${paymentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.success) {
                alert("Thanh toán thành công!");
                const userId = localStorage.getItem("userId");
                if (userId) {
                    fetchOrders(userId); // Fetch lại danh sách đơn hàng để cập nhật trạng thái
                }
            } else {
                alert("Thanh toán thất bại: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

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
                        <th>Thanh toán</th>
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
                            <td>
                                {order.payment_status === "completed" ? (
                                    <span className="badge bg-success">Đã thanh toán</span>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handlePayment(order.id_payment_method?._id)}
                                    >
                                        Thanh toán
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
