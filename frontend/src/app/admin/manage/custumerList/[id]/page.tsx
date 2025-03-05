"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import userService from "../../../services/UserService";
import orderService from "../../../services/OrderServices"; // Import service mới
import styles from "../../../styles/DetailUser.module.css";

const UserDetailPage = () => {
    const { id: paramId } = useParams();
    const searchParams = useSearchParams();

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = searchParams.get("id") || paramId;
        if (id) {
            userService.getUserById(id)
                .then(data => setUser(data))
                .catch(err => console.error("Lỗi khi lấy user:", err));

            orderService.getOrdersByUserId(id)
                .then(data => setOrders(data.orders))
                .catch(err => console.error("Lỗi khi lấy đơn hàng:", err))
                .finally(() => setLoading(false));
        }
    }, [paramId, searchParams]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Không tìm thấy người dùng!</p>;

    const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = orders.length;

    return (
        <div className="container mt-4">
            <h4>Users Management</h4>
            <div className={styles.titleTable}>
                <p>Admin /</p>
                <p className={styles.titles}>User Profiles</p>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <div className={`card text-center p-3 ${styles.card}`}>
                        <img src={user.avatar || "https://via.placeholder.com/100"} className="rounded-circle mx-auto d-block" alt="Profile" />
                        <h5 className="mt-3">{user.username}</h5>
                        <p className={`text-muted ${styles.textMuted}`}>{user.phone}</p>
                        <a href={`mailto:${user.email}`} className={styles.link}>{user.email}</a>
                        <button className="btn btn-success w-100 mt-3">${user.balance} Balance</button>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Orders</h4>
                    </div>

                    <div className="card p-3">
                        <p>Total spent: <strong>${totalSpent}</strong> on <strong>{totalOrders} orders</strong></p>
                        <table className="table">
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
                                {orders.length > 0 ? orders.map((order) => (
                                    <tr key={order._id}>
                                        <td><a href="#">#{order._id}</a></td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge bg-${order.status === "pending" ? "warning" : "success"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.itemsCount || "N/A"} items</td>
                                        <td>${order.amount}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5}>No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button className="btn btn-success w-100">View All Orders</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
