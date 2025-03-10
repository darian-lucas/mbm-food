"use client";

import { useEffect, useState } from "react";
import orderService from "../../services/OrderServices";
import styles from "../../styles/Table.module.css";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getAllOrders()
      .then((data) => {
        setOrders(data || []); // Đảm bảo dữ liệu không bị undefined
      })
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err))
      .finally(() => setLoading(false));
  }, []);

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
                <span
                  className={`badge bg-${order.status === "pending" ? "warning" : "success"
                    }`}
                >
                  {order.status}
                </span>
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
            </tr>
          ))}
        </tbody>
      </table>
      {!showAllOrders && orders.length > 5 && (
        <button
          className="btn btn-primary w-100"
          onClick={() => setShowAllOrders(true)}
        >
          Xem tất cả
        </button>
      )}
    </div>
  );
};

export default OrderManagementPage;
