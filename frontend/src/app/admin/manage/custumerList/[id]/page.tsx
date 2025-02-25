"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import userService from "../../../services/UserService"; // Đảm bảo đúng đường dẫn
import styles from "../../../styles/DetailUser.module.css"; // Import CSS module

const UserDetailPage = () => {
    const { id: paramId } = useParams(); // Lấy id từ params
    const searchParams = useSearchParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = searchParams.get("id") || paramId;
        if (id) {
            userService.getUserById(id)
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Lỗi khi lấy dữ liệu:", err);
                    setLoading(false);
                });
        }
    }, [paramId, searchParams]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Không tìm thấy người dùng!</p>;

    const orders = user.orders || [];
    const totalSpent = user.totalSpent || 0;
    const totalOrders = user.totalOrders || 0;

    return (
        <div className="container mt-4">
            <h4>Users Management</h4>
            <div className={styles.titleTable}>
                <p>Admin /</p>
                <p className={styles.titles}>User Profiles</p>
            </div>

            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className={`card text-center p-3 ${styles.card}`}>
                        <img src={user.avatar || "https://via.placeholder.com/100"} className="rounded-circle mx-auto d-block" alt="Profile" />
                        <h5 className="mt-3">{user.username}</h5>
                        <p className={`text-muted ${styles.textMuted}`}>{user.phone}</p>
                        <a href={`mailto:${user.email}`} className={styles.link}>{user.email}</a>
                        <button className="btn btn-success w-100 mt-3">${user.balance} Balance</button>
                    </div>
                </div>

                {/* Main Content */}
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
                                {orders.length > 0 ? orders.map((order, index) => (
                                    <tr key={index}>
                                        <td><a href="#">#{order.id}</a></td>
                                        <td>{order.date}</td>
                                        <td><span className={`badge bg-${order.status === "Pending" ? "warning" : "success"}`}>{order.status}</span></td>
                                        <td>{order.itemsCount} items</td>
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

                    {/* Account Details */}
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card p-3 bg-light">
                                <h5>Account Details <a href="#" className="float-end"><i className="bi bi-pencil-square"></i></a></h5>
                                <p><strong>First Name:</strong> {user.firstName}</p>
                                <p><strong>Last Name:</strong> {user.lastName}</p>
                                <p><strong>Date of Birth:</strong> {user.dob}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card p-3 bg-light">
                                <h5>Credit Card <a href="#" className="float-end"><i className="bi bi-pencil-square"></i></a></h5>
                                <p><strong>Card Holder:</strong> {user.cardHolder}</p>
                                <p><strong>Card Number:</strong> **** **** **** {user.cardLastDigits}</p>
                                <p><strong>Expiry Date:</strong> {user.cardExpiry}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
