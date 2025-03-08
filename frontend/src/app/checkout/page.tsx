"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/CheckoutPage.module.css";

interface User {
  email: string;
  username: string;
  phone: string;
  address: string;
}

interface Coupon {
  code: string;
  discount: number;
}

const CheckoutPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUser();
  }, []);

  const applyCoupon = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/coupon?code=${couponCode}`);
      const data = await res.json();
      if (data) {
        setCoupon(data);
        setDiscount(data.discount);
      } else {
        setCoupon(null);
        setDiscount(0);
        alert("Mã giảm giá không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thanh toán</h1>
      <div className={styles.checkoutForm}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" value={user?.email || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Họ tên:</label>
          <input type="text" value={user?.username || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Số điện thoại:</label>
          <input type="text" value={user?.phone || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Địa chỉ:</label>
          <input type="text" value={user?.address || ""} readOnly />
        </div>
      </div>

      <div className={styles.paymentMethod}>
        <h2>Chọn phương thức thanh toán</h2>
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Thanh toán bằng tiền mặt
        </label>
        <label>
          <input
            type="radio"
            value="momo"
            checked={paymentMethod === "momo"}
            onChange={() => setPaymentMethod("momo")}
          />
          Thanh toán bằng Momo
        </label>
      </div>

      <div className={styles.couponSection}>
        <h2>Áp dụng mã giảm giá</h2>
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={applyCoupon}>Áp dụng</button>
      </div>
      
      <div className={styles.totalPrice}>
        <h2>Tổng tiền: {totalPrice - discount} đ</h2>
      </div>

      <button className={styles.checkoutButton}>Xác nhận thanh toán</button>
    </div>
  );
};

export default CheckoutPage;
