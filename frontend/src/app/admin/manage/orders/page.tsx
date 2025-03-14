"use client";

import { useEffect, useState } from "react";
import orderService from "../../services/OrderServices";
import styles from "../../styles/Table.module.css";

interface Order {
  _id: string;
  order_code: string;
  id_user: { _id: string };
  createdAt: string;
  status: "pending" | "shipped" | "delivered" | "canceled";
  details: { _id: string; id_product: { name: string }; quantity: number; price: number }[];
  total_amount: number;
  id_payment_method: { _id: string };
}

const STATUS_OPTIONS = ["pending", "shipped", "delivered", "canceled"];
const ITEMS_PER_PAGE = 5;

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatuses, setPaymentStatuses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      const updatedOrders = await Promise.all(
        data.map(async (order: Order) => {
          const paymentStatus = await fetchPaymentStatus(order.id_payment_method._id);
          return { ...order, paymentStatus };
        })
      );

      const paymentStatusMap: { [key: string]: string } = {};
      updatedOrders.forEach((order) => {
        paymentStatusMap[order._id] = order.paymentStatus;
      });
      setPaymentStatuses(paymentStatusMap);

      setOrders(updatedOrders);
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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
            <th>Payment Status</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => {
            const paymentStatus = paymentStatuses[order._id] || "pending";
            const calculatedStatus =
              paymentStatus === "completed"
                ? "delivered"
                : paymentStatus === "failed" || paymentStatus === "refunded"
                ? "canceled"
                : order.status;

            return (
              <tr key={order._id}>
                <td>
                  <a href={`http://localhost:3002/admin/manage/custumerList/${order.id_user._id}`}>
                    #{order.order_code}
                  </a>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${calculatedStatus === "delivered" ? "bg-success" : calculatedStatus === "canceled" ? "bg-danger" : "bg-warning"}`}>
                    {calculatedStatus.charAt(0).toUpperCase() + calculatedStatus.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`badge ${paymentStatus === "completed" ? "bg-success" : paymentStatus === "failed" || paymentStatus === "refunded" ? "bg-danger" : "bg-warning"}`}>
                    {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                  </span>
                </td>
                <td>
                  {order.details.map((item, index) => (
                    <div key={item._id || index}>
                      {item.id_product.name} - {item.quantity} x {item.price.toLocaleString("vi-VN")} VND
                    </div>
                  ))}
                </td>
                <td>{order.total_amount.toLocaleString("vi-VN")} VND</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(order._id, "canceled")}>
                    Hủy đơn
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-secondary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button className="btn btn-secondary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default OrderManagementPage;
