"use client";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/user";
import Link from "next/link";
import styles from "@/styles/Account.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state loading

    useEffect(() => {
        async function fetchUser() {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const response = await getUserById(userId);
                if (!response.error) {
                    setUser(response);
                }
            }
            setLoading(false); // Đánh dấu đã load xong
        }
        fetchUser();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>; // Hiển thị khi đang tải dữ liệu
    }

    return (
        <div>
            <h5>THÔNG TIN TÀI KHOẢN</h5>
            {user ? (
                <>
                    <p><strong>Họ tên:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Địa chỉ:</strong> {user.address || "Chưa có địa chỉ"}</p>
                </>
            ) : (
                <p>Không tìm thấy thông tin tài khoản.</p>
            )}
        </div>
    );
}
