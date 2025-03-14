"use client";

import { useEffect, useState } from "react";
import orderService from "../../services/OrderServices";
import styles from "../../styles/Table.module.css";

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  _id: string;
  order_code: string;
  id_user: { _id: string };
  createdAt: string;
  status: "pending" | "shipped" | "delivered" | "canceled";
  details: { _id: string; id_product: { name: string }; quantity: number; price: number }[];
  total_amount: number;
}

// Các trạng thái hợp lệ
const STATUS_OPTIONS = ["pending", "shipped", "delivered", "canceled"];

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!orders.length) return <p>Không có đơn hàng nào!</p>;

  return (
    <div className={styles.tableContainer}>
      <h4 className="fw-bold fs-3 mb-3">Danh sách đơn hàng</h4>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, showAllOrders ? orders.length : 5).map((order) => (
            <tr key={order._id}>
              <td>
                <a href={`http://localhost:3002/admin/manage/custumerList/${order.id_user._id}`}>
                  #{order.order_code}
                </a>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <select
                  className={`form-select ${styles.statusDropdown}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {order.details.length > 0
                  ? order.details.map((item, index) => (
                      <div key={item._id || index}>
                        {item.id_product.name} - {item.quantity} x{" "}
                        {item.price.toLocaleString("vi-VN")} VND
                      </div>
                    ))
                  : "N/A"}
              </td>
              <td>{order.total_amount.toLocaleString("vi-VN")} VND</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => console.log("Xóa đơn hàng", order._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showAllOrders && orders.length > 5 && (
        <button className="btn btn-primary w-100" onClick={() => setShowAllOrders(true)}>
          Xem tất cả
        </button>
      )}
    </div>
  );
};

export default OrderManagementPage;
