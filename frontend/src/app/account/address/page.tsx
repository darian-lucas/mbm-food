"use client";
import { useState } from "react";
import { addAddress } from "@/services/user";
import styles from "@/styles/Account.module.css";

export default function Address() {
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleAddAddress = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) return;

        const response = await addAddress(userId, address, token);
        if (response.error) {
            setMessage("Lỗi: " + response.message);
        } else {
            setMessage("Thêm địa chỉ thành công!");
        }
    };

    return (
        <div>
            <h5>ĐỊA CHỈ CỦA BẠN</h5>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nhập địa chỉ mới" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button className="btn btn-red mb-3" onClick={handleAddAddress}>Thêm địa chỉ</button>
            {message && <p>{message}</p>}
        </div>
    );
}
