'use client';

import { useEffect, useState, useRef } from 'react';
import orderService from '../../services/OrderServices';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

Chart.register(...registerables);

interface Order {
    order_code: string;
    name: string;
    total_amount: number;
    status: string;
    createdAt: string;
    details?: { name: string }[];
}

export default function Dashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [successfulOrders, setSuccessfulOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);

    const salesChartRef = useRef<HTMLCanvasElement>(null);
    const statsChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await orderService.getAllOrders();
                setOrders(data);
                processOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();
    }, []);

    function processOrders(orders: Order[]) {
        let totalSales = 0;
        let successful = 0;
        let cancelled = 0;
        let monthlySales = new Array(12).fill(0);
        let monthlyCancelled = new Array(12).fill(0);

        orders.forEach(order => {
            totalSales += order.total_amount || 0;
            let orderDate = new Date(order.createdAt);
            if (!isNaN(orderDate.getTime())) {
                monthlySales[orderDate.getMonth()] += order.total_amount || 0;
                if (order.status === 'cancelled') {
                    monthlyCancelled[orderDate.getMonth()]++;
                }
            }
            if (order.status === 'paid') {
                successful++;
            } else if (order.status === 'cancelled') {
                cancelled++;
            }
        });

        setTotalSales(totalSales);
        setTotalOrders(orders.length);
        setSuccessfulOrders(successful);
        setCancelledOrders(cancelled);

        renderCharts(monthlySales, monthlyCancelled);
    }

    function renderCharts(monthlySales: number[], monthlyCancelled: number[]) {
        if (salesChartRef.current) {
            new Chart(salesChartRef.current, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Total Sales',
                        data: monthlySales,
                        borderColor: 'blue',
                        fill: false
                    }]
                }
            });
        }

        if (statsChartRef.current) {
            new Chart(statsChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Monthly Sales',
                            data: monthlySales,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Cancelled Orders',
                            data: monthlyCancelled,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                }
            });
        }
    }

    return (
        <div className="container mt-4">
            <div className="row g-4">
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <i className="bi bi-cash-stack text-success fs-1"></i>
                        <h5 className="card-title mt-2">Total Sales</h5>
                        <p className="fs-4 fw-bold">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalSales)}
                        </p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <i className="bi bi-cart-fill text-primary fs-1"></i>
                        <h5 className="card-title mt-2">Total Orders</h5>
                        <p className="fs-4 fw-bold">{totalOrders}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <i className="bi bi-check-circle text-success fs-1"></i>
                        <h5 className="card-title mt-2">Successful Orders</h5>
                        <p className="fs-4 fw-bold">{successfulOrders}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <i className="bi bi-x-circle text-danger fs-1"></i>
                        <h5 className="card-title mt-2">Cancelled Orders</h5>
                        <p className="fs-4 fw-bold">{cancelledOrders}</p>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm">
                        <h5 className="card-title">Total Sales</h5>
                        <canvas ref={salesChartRef}></canvas>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm">
                        <h5 className="card-title">Monthly Statistics</h5>
                        <canvas ref={statsChartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card p-3 shadow-sm">
                        <h5 className="card-title">Recent Orders</h5>
                        <table className="table table-hover">
                            <thead className="table-success">
                                <tr>
                                    <th>Order Code</th>
                                    <th>Customer</th>
                                    <th>Products</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.order_code}>
                                        <td>{order.order_code}</td>
                                        <td>{order.name}</td>
                                        <td>{order.details?.map(d => d.name).join(', ') || 'N/A'}</td>
                                        <td>${order.total_amount.toLocaleString()}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}