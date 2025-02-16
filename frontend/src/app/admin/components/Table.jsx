"use client";
import React from "react";
import styles from "../styles/Table.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const users = [
    { name: "Bethany", email: "mendorcart@gmail.com", orders: 120, country: "Poland", status: "Paid", date: "19/09/2022" },
    { name: "Charlottekha", email: "margaretak@gmail.com", orders: 99, country: "USA", status: "Active", date: "19/09/2022" },
    { name: "Isabella Jhon", email: "margaretak@gmail.com", orders: 99, country: "USA", status: "Active", date: "19/09/2022" },
];

export default function Table() {
    return (
        <div className={styles.tableContainer}>
            <h4>Pages</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Join On</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>
                                <div className={styles.avatarContainer}>
                                    <img className={styles.avatar} src="https://via.placeholder.com/40" alt="Avatar" />
                                    <span className={styles.name}>{user.name}</span>
                                </div>
                            </td>

                            <td>{user.email}</td>
                            <td>{user.orders}</td>
                            <td>{user.country}</td>
                            <td><span className={user.status === "Paid" ? styles.statusPaid : styles.statusActive}>{user.status}</span></td>
                            <td>{user.date}</td>
                            <td>
                                <button className="btn btn-success btn-sm me-2"><FontAwesomeIcon icon={faPen} /></button>
                                <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
