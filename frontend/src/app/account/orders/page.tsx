"use client";
import { useEffect, useState } from "react";
import orderService from "../../admin/services/OrderServices";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
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
            setOrders(data.orders || []);
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId: string) => {
        const result = await Swal.fire({
            title: "Bạn có chắc chắn muốn hủy đơn hàng này?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Có, hủy đơn!",
            cancelButtonText: "Không",
        });
    
        if (!result.isConfirmed) return;
    
        try {
            await orderService.updateOrderStatus(orderId, { status: "canceled" });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: "canceled" } : order
                )
            );
            Swal.fire("Đã hủy!", "Đơn hàng của bạn đã được hủy.", "success");
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
            Swal.fire("Lỗi!", "Có lỗi xảy ra, vui lòng thử lại.", "error");
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (!orders.length) return <p>Không tìm thấy đơn hàng nào!</p>;

    return (
        <div >
            <h5>ĐƠN HÀNG CỦA BẠN</h5>
            <table className="table table-bordered table-danger mt-3 text-center justify-content-center">
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
                        <th>Thao tác</th>
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
                                <span className={`badge ${order.status === "pending" ? "bg-warning" : order.status === "shipped" ? "bg-primary" : order.status === "delivered" ? "bg-success" : "bg-danger"}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.total_amount.toLocaleString("vi-VN")} VND</td>
                            <td>
                                {["pending", "shipped"].includes(order.status) && (
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => cancelOrder(order._id)}
                                    >
                                        Hủy đơn
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
