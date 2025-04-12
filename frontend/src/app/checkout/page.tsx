"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "../../styles/CheckoutPage.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

interface User {
  _id: string;
  email: string;
  address: Address[];
}

interface CartItem {
  id_product: string;
  _id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface Coupon {
  _id: string;
  code: string;
  discount: number;
}

interface PaymentMethod {
  _id: string;
  payment_name: string;
}

const CheckoutPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;
  const router = useRouter();

  // Hàm fetch API tái sử dụng
  const fetchData = useCallback(async (url: string, errorMessage: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(errorMessage);
      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
      toast.error(errorMessage);
      return null;
    }
  }, []);

  // Lấy danh sách phương thức thanh toán (BỎ VNPAY)
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const data = await fetchData(
        `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/payments/`,
        "Không thể lấy phương thức thanh toán!"
      );
      if (data) {
        const filteredMethods = data.filter(
          (method: PaymentMethod) => method.payment_name !== "vnpay"
        );
        setPaymentMethods(filteredMethods);
        setPaymentMethod(filteredMethods[0] || null);
      }
    };
    fetchPaymentMethods();
  }, [fetchData]);

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const data = await fetchData(
        `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/user/${userId}`,
        "Lỗi khi lấy thông tin người dùng!"
      );
      if (data) setUser(data);
    };
    fetchUser();
  }, [fetchData]);

  // Lấy giỏ hàng từ localStorage
  useEffect(() => {
    const fetchCart = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    fetchCart();
  }, []);

  // Tính tổng tiền
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalAmount = Math.max(0, totalAmount - discount); // Không để âm

  // Xử lý mã giảm giá
  const handleApplyDiscount = async () => {
    if (!discountCode) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/coupons/check?code=${discountCode}`
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Mã giảm giá không hợp lệ!");
        return;
      }

      setDiscount(data.discount);
      setSelectedCoupon(data);
      toast.success(
        `Áp dụng mã ${data.code}! Giảm ${data.discount.toLocaleString()}đ`
      );
    } catch (e) {
      toast.error(`Lỗi đặt hàng: ${(e as Error).message}`);
    }
  };

  // Xử lý đặt hàng
  const handleOrder = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      return;
    }
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    const orderData = {
      id_user: user._id,
      order_code: `MBM${Date.now()}`,
      id_coupon: selectedCoupon?._id || null, // Send null if no coupon
      id_payment_method: paymentMethod?._id || "",
      total_amount: totalAmount,
      total_payment: finalAmount,
      address: user.address[0]?.address || "",
      phone: user.address[0]?.phone || "",
      name: user.address[0]?.name || "",
      note: "Không có ghi chú",
      receive_address: user.address[0]?.address || "",
      order_status: "Pending",
      payment_status: "Pending",
      orderDetails: cart.map((item) => ({
        id_product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const orderDetails = cart.map((item) => ({
      id_product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // 🛑 Console log để debug
    console.log("🛒 Cart trước khi gửi:", cart);
    console.log("📦 orderData trước khi gửi:", orderData);
    console.log("🧾 orderDetails trước khi gửi:", orderDetails);
    console.log("💰 Phương thức thanh toán đã chọn (_id):", paymentMethod);
    console.log("🎟️ Mã giảm giá đã chọn:", selectedCoupon?._id);

    try {
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderData, orderDetails }),
        }
      );

      const orderDataResponse = await orderResponse.json();
      console.log("📢 Phản hồi từ backend:", orderDataResponse);
      if (!orderResponse.ok) {
        throw new Error(orderDataResponse.error || "Đặt hàng thất bại!");
      }
      if (paymentMethod.payment_name === "cash") {
        console.log("📢 Dữ liệu gửi đến email API:", {
          email: user.email,
          orderData: orderDataResponse.data.order,
        });
        await fetch(`${process.env.NEXT_PUBLIC_URL_IMAGE}/api/email/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            orderData: {
              ...orderDataResponse.data.order,
              orderDetails: cart.map((item) => ({
                id_product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          }),
        });
      }
      // Xử lý thanh toán nếu là MoMo
      if (paymentMethod.payment_name === "momo") {
        const momoResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/payments/momo`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: orderDataResponse.data.order._id,
              id_user: orderDataResponse.data.order.id_user,
              order_code: orderDataResponse.data.order.order_code,
              amount: orderDataResponse.data.order.total_payment,
              id_coupon: orderDataResponse.data.order.id_coupon,
              order_status: orderDataResponse.data.order.order_status,
              payment_status: orderDataResponse.data.order.payment_status,
              receive_address: orderDataResponse.data.order.receive_address,
              id_payment_method: orderDataResponse.data.order.id_payment_method,
              address: orderDataResponse.data.order.address,
              phone: orderDataResponse.data.order.phone,
              name: orderDataResponse.data.order.name,
              note: orderDataResponse.data.order.note,
            }),
          }
        );

        const momoData = await momoResponse.json();
        if (!momoResponse.ok) {
          throw new Error(momoData.message || "Lỗi khi tạo thanh toán Momo!");
        }

        window.location.href = momoData.payUrl;
        return;
      }

      toast.success("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      // 🔥 Phát sự kiện cập nhật
      window.dispatchEvent(new Event("cartUpdated"));

      setCart([]);
      router.push(`/success?_id=${orderDataResponse.data.order._id}`);
    } catch (e) {
      toast.error(`Lỗi đặt hàng: ${(e as Error).message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutForm}>
        <h2>Thông tin nhận hàng</h2>
        <form>
          <label htmlFor="address" className={styles.formLabel}>
            Số địa chỉ
          </label>
          <input
            type="text"
            id="address"
            className={styles.formInput}
            defaultValue={user?.address[0]?.address || ""}
          />

          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            defaultValue={user?.email || ""}
          />

          <label htmlFor="name" className={styles.formLabel}>
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            className={styles.formInput}
            defaultValue={user?.address[0]?.name || ""}
          />

          <label htmlFor="phone" className={styles.formLabel}>
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            className={styles.formInput}
            defaultValue={user?.address[0]?.phone || ""}
          />

          <label htmlFor="city" className={styles.formLabel}>
            Tỉnh thành
          </label>
          <select id="city" className={styles.formSelect}>
            <option>{user?.address[0]?.city || ""}</option>
          </select>

          <label htmlFor="district" className={styles.formLabel}>
            Quận huyện
          </label>
          <select id="district" className={styles.formSelect}>
            <option>{user?.address[0]?.district || ""}</option>
          </select>

          <label htmlFor="ward" className={styles.formLabel}>
            Phường xã
          </label>
          <select id="ward" className={styles.formSelect}>
            <option>{user?.address[0]?.ward || ""}</option>
          </select>

          <div className={styles.paymentOptions}>
            <label>Phương thức thanh toán:</label>
            <div>
              {paymentMethods.map((method) => (
                <label
                  key={method._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method._id}
                    checked={paymentMethod?._id === method._id}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {method.payment_name === "cash" ? (
                    <>
                      <img
                        src={`${API_URL}/images/cash.png`}
                        alt="Tiền mặt"
                        width={24}
                        height={24}
                      />{" "}
                      Tiền Mặt
                    </>
                  ) : method.payment_name === "momo" ? (
                    <>
                      <img
                        src={`${API_URL}/images/momo.png`}
                        alt="Momo"
                        width={24}
                        height={24}
                      />{" "}
                      Chuyển khoản Momo
                    </>
                  ) : (
                    method.payment_name
                  )}
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className={styles.orderSummary}>
        <h2>Đơn hàng ({cart.length} sản phẩm)</h2>

        {cart.map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <img
              className={styles.img}
              src={`${API_URL}/images/${item.image}`}
              alt={item.name}
              width={50}
              height={50}
            />
            <div>
              <p>{item.name}</p>
              <p>{item.size}</p>
              <p className={styles.price}>{item.price.toLocaleString()}đ</p>
              <p>Số lượng: {item.quantity}</p>
            </div>
          </div>
        ))}

        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className={styles.formInput}
        />
        <button className={styles.applyBtn} onClick={handleApplyDiscount}>
          Áp dụng
        </button>
        <br />
        <br />

        <p>
          Phí vận chuyển: <strong>30,000đ</strong>
        </p>
        <br />
        <p>
          Tạm tính: <strong>{totalAmount.toLocaleString()}đ</strong>
        </p>
        {discount > 0 && (
          <>
            <p>
              Giảm giá: <strong>-{discount.toLocaleString()}đ</strong>
            </p>
          </>
        )}
        <br />
        <hr />
        <br />
        <p>
          <strong>Tổng cộng: {finalAmount.toLocaleString()}đ</strong>
        </p>

        <button className={styles.orderBtn} onClick={handleOrder}>
          ĐẶT HÀNG
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
