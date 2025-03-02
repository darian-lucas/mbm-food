"use client";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/user";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AccountPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const response = await getUserById(userId);
                if (!response.error) {
                    setUser(response);
                }
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    if (loading) {
        return <p className="text-center text-muted mt-3">Đang tải dữ liệu...</p>;
    }

    return (
        <div className="container">
            <h5 className=" fw-bold text-uppercase mb-3">Thông tin tài khoản</h5>
            {user ? (
                <>
                    <div className="card border-0 shadow-sm p-3 mb-4">
                        <p className="mb-1">
                            <span className="fw-semibold">Họ tên:</span> {user.username}
                        </p>
                        <p className="mb-1">
                            <span className="fw-semibold">Email:</span> {user.email}
                        </p>
                    </div>

                    <h6 className="text-secondary fw-bold text-uppercase mt-3 mb-2">📍 Danh sách địa chỉ</h6>
                    {Array.isArray(user.address) && user.address.length > 0 ? (
                        <div className="row">
                            {user.address.map((addr: any, index: number) => (
                                <div key={addr._id || index} className="col-md-6">
                                    <div className="card border-light shadow-sm mb-3">
                                        <div className="card-body">
                                            <h6 className="card-title fw-semibold text-dark">
                                                {addr.name}
                                            </h6>
                                            <p className="small text-muted mb-1">
                                                📞 {addr.phone}
                                            </p>
                                            <p className="small text-muted mb-1">
                                                🏢 {addr.company || "Không có"}
                                            </p>
                                            <p className="small text-muted mb-1">
                                                📍 {addr.address}, {addr.ward}, {addr.district}, {addr.city}
                                            </p>
                                            <p className="small text-muted mb-1">
                                                📮 ZIP: {addr.zip}
                                            </p>
                                            {addr.default && (
                                                <span className="badge bg-danger">Mặc định</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Chưa có địa chỉ nào.</p>
                    )}
                </>
            ) : (
                <p className="text-danger">Không tìm thấy thông tin tài khoản.</p>
            )}
        </div>
    );
}
