"use client";
import Link from "next/link";
import styles from "@/styles/Account.module.css";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`container mt-4 ${styles.accountContainer}`}>
            <nav className={`breadcrumb-container p-2 ${styles.breadcrumbContainer}`}>
                <div className="container">
                    <Link href="/" className="text-decoration-none text-dark">Trang chủ</Link>
                    <span className="text-danger"> &gt; Trang khách hàng</span>
                </div>
            </nav>

            <div className="row bg-white p-3 rounded shadow-sm">
                {/* Sidebar */}
                <div className={`col-md-3 ${styles.sidebar}`}>
                    <h5>TRANG TÀI KHOẢN</h5>
                    <p><strong>Xin chào, <span className="text-danger">son son</span>!</strong></p>
                    <ul>
                        <li><Link href="/account">Thông tin tài khoản</Link></li>
                        <li><Link href="/account/orders">Đơn hàng của bạn</Link></li>
                        <li><Link href="/account/change-password">Đổi mật khẩu</Link></li>
                        <li><Link href="/account/address">Sổ địa chỉ</Link></li>
                    </ul>
                </div>

                {/* Nội dung chính */}
                <div className="col-md-9">{children}</div>
            </div>
        </div>
    );
}
