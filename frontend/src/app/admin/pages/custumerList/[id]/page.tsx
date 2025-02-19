"use client"; // Đảm bảo rằng đây là Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Thay vì next/router
import userService from '../../../services/UserService'; // Đảm bảo đường dẫn đúng
import styles from '../../../styles/DetailUser.module.css'; // Import CSS module

const UserDetailPage = () => {
    const { id } = useParams(); // Lấy id từ params
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            userService.getUserById(id).then(data => setUser(data));
        }
    }, [id]);

    if (!user) return <p>Loading...</p>;

    // Kiểm tra nếu orders tồn tại và có giá trị
    const orders = user.orders || []; // Nếu không có orders, gán giá trị mặc định là mảng rỗng
    const totalSpent = orders.length > 0 ? user.totalSpent : 0;
    const totalOrders = orders.length > 0 ? user.totalOrders : 0;

    const ordersContent = orders.length > 0 ? (
        orders.map((order, index) => (
            <tr key={index}>
                <td><a href="#">#{order.id}</a></td>
                <td>{order.date}</td>
                <td><span className={`badge bg-${order.status === 'Pending' ? 'warning' : 'success'}`}>{order.status}</span></td>
                <td>{order.itemsCount} items</td>
                <td>${order.amount}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={5}>No orders found</td>
        </tr>
    );

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className={`card text-center p-3 ${styles.card}`}>
                        <img src="https://via.placeholder.com/100" className="rounded-circle mx-auto d-block" alt="Profile" />
                        <h5 className="mt-3">{user.username}</h5>
                        <p className={`text-muted ${styles.textMuted}`}>{user.phone}</p>
                        <a href={`mailto:${user.email}`} className={styles.link}>{user.email}</a>
                        <button className="btn btn-success w-100 mt-3">${user.balance} Balance</button>

                        <hr />
                        <p><strong>Last Order:</strong> {user.lastOrderDate || 'N/A'} - <a href="#">#{user.lastOrderId || 'N/A'}</a></p>
                        <p><strong>Avg Order Value:</strong> ${user.avgOrderValue || 0}</p>
                        <p><strong>Email Marketing:</strong> {user.emailMarketing ? 'Subscribed' : 'Not Subscribed'}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Orders</h4>
                        <button className="btn btn-success">Add customer</button>
                    </div>

                    <div className="card p-3" style={{ fontSize: '13px' }}>
                        <div className="d-flex justify-content-between">
                            <p>Total spent: <strong>${totalSpent}</strong> on <strong>{totalOrders} orders</strong></p>
                        </div>
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
                                {ordersContent}
                            </tbody>
                        </table>
                        <button className="btn btn-success w-100">View All Orders</button>
                    </div>

                    {/* Account Details */}
                    <div className="row mt-4" style={{ fontSize: '13px' }}>
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
