"use client";
import { useState } from "react";
import { updatePassword } from "@/services/user";
import styles from "@/styles/Account.module.css";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp.");
            return;
        }

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) return;

        const response = await updatePassword(userId, newPassword, token);
        if (response.error) {
            setMessage("Lỗi: " + response.message);
        } else {
            setMessage("Đổi mật khẩu thành công!");
        }
    };

    return (
        <div>
            <h5>ĐỔI MẬT KHẨU</h5>
            <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                    <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-red">Đổi mật khẩu</button>
                {message && <p className="mt-2">{message}</p>}
            </form>
        </div>
    );
}
