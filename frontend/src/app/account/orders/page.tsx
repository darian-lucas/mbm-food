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

            // ✅ Ghép orderDetails vào từng order
            const ordersWithDetails = data.orders.map((order:any) => ({
                ...order,
                details: data.orderDetails.filter((detail:any) => detail.id_order === order._id) || []
            }));

            setOrders(ordersWithDetails);
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
        <div>
            <h5>ĐƠN HÀNG CỦA BẠN</h5>
            <table className="table table-bordered table-danger mt-3 text-center">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ nhận</th>
                        <th>Đơn hàng của người dùng</th>
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
                            <td>
                                {order.details.length > 0 ? (
                                    <ul className="text-left p-0">
                                        {order.details.map((item:any, index:any) => {
                                            const product = item.id_product;
                                            const price = item.price || product?.variants?.[0]?.price || 0; // ✅ Ưu tiên item.price trước
                                            return (
                                                <li key={index}>
                                                    <strong>{product?.name || "Sản phẩm không xác định"}</strong>
                                                    <br />
                                                    Số lượng: {item.quantity}
                                                    <br />
                                                    Giá: {price.toLocaleString("vi-VN")} VND
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : "Không có sản phẩm"}
                            </td>
                            <td>
                                <span className={`badge ${order.status === "pending" ? "bg-warning" : order.status === "shipped" ? "bg-primary" : order.status === "delivered" ? "bg-success" : "bg-danger"}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>{order.total_amount?.toLocaleString("vi-VN") || "0"} VND</td>
                            <td>
                                {["pending"].includes(order.status) && (
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
