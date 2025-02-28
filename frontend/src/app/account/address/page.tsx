"use client";
import { useState } from "react";
import { addAddress } from "@/services/user";
import styles from "@/styles/Account.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Address() {
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleAddAddress = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
            setMessage("Bạn chưa đăng nhập!");
            return;
        }
    
        try {
            await addAddress(userId, address, token);
            setMessage("Thêm địa chỉ thành công!");
            setAddress(""); // Reset input sau khi thêm
        } catch (error: any) {
            setMessage("Lỗi: " + error.message);
        }
    };
    

    return (
        <div>
            <h5>ĐỊA CHỈ CỦA BẠN</h5>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ mới"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className="btn btn-danger mb-3" onClick={handleAddAddress}>Thêm địa chỉ</button>
            {message && <p>{message}</p>}
        </div>
    );
}
