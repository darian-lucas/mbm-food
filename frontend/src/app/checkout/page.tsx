"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "../../styles/CheckoutPage.module.css";
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
  note?:string;
}

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  type: string;
  start_date: string;
  end_date: string;
  status: string;
  quantity: number;
  description: string;
};


interface PaymentMethod {
  _id: string;
  payment_name: string;
}

const CheckoutPage = () => {
  const shippingFee = 30000;
  const [user, setUser] = useState<User | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;
  const router = useRouter();

  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);


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
  const finalAmount = Math.max(0, totalAmount + shippingFee - discountApplied);

  // Xử lý mã giảm giá
  const handleCheckDiscountCode = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/coupons");
      const result = await response.json();
      const coupon = result.data.find(
        (item) => item.code === discountCode.trim() 
      );
      if (!coupon) {
        toast.error("Mã giảm giá không tồn tại!");
        return;
      }
      // Kiểm tra trạng thái
      if (coupon.status !== "Active") {
        toast.error("Mã giảm giá đã hết hạn hoặc không còn hiệu lực!");
        return;
      }
      // Kiểm tra thời gian
      const now = new Date();
      const start = new Date(coupon.start_date);
      const end = new Date(coupon.end_date);
      if (now < start || now > end) {
        toast.error("Mã giảm giá không còn trong thời gian sử dụng!");
        return;
      }
      // Kiểm tra đơn hàng tối thiểu (từ mô tả)
      const minOrderMatch = coupon.description.match(/đơn hàng từ (\d+)k?/i);
      if (minOrderMatch) {
        const minOrder = parseInt(minOrderMatch[1]) * 1000;
        if (totalAmount < minOrder) {
          toast.error(`Mã này chỉ áp dụng cho đơn hàng từ ${minOrder.toLocaleString()}đ trở lên!`);
          return;
        }
      }
      // Áp dụng mã
      setSelectedCoupon(coupon);
      setAppliedCoupon(coupon);
      setDiscountApplied(coupon.type === "Amount" ? coupon.discount : 0); // Có thể xử lý freeship riêng ở đây
      toast.success(`Áp dụng mã "${coupon.code}" thành công!`);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi kiểm tra mã giảm giá!");
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
      id_coupon: appliedCoupon?._id || null,
      id_payment_method: paymentMethod?._id || "",
      total_amount: totalAmount,
      total_payment: finalAmount,
      address: user.address[0]?.address || "",
      phone: user.address[0]?.phone || "",
      name: user.address[0]?.name || "",
      receive_address: user.address[0]?.address || "",
      order_status: "Pending",
      payment_status: "Pending",
      orderDetails: cart.map((item) => ({
        id_product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        note: item.note || "Không có ghi chú",
      })),
    };

    const orderDetails = cart.map((item) => ({
      id_product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      note: item.note || "Không có ghi chú",
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
                note: item.note || "Không có ghi chú",
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
    // Xử lý coupon sau khi áp mã : 
    if (discountCode) {
      try {
        const response = await fetch("http://localhost:3001/api/coupons/apply-coupon", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: discountCode }),
        });
    
        const data = await response.json();
        if (!response.ok) {
          console.error("⚠️ Lỗi:", data.message);
        } else {
          console.log("✅ Mã giảm giá áp dụng thành công:", data);
        }
      } catch (error) {
        console.error("⚠️ Lỗi khi áp dụng mã giảm giá:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutForm}>
        <h2>THÔNG TIN NHẬN HÀNG</h2>
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
        <h2>ĐƠN HÀNG ({cart.length} sản phẩm)</h2>

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
        <button className={styles.applyBtn} onClick={handleCheckDiscountCode}>
          Áp dụng
        </button><br/><br/>
        {discountApplied > 0 && (
          <p className={styles.discountText}>Giảm : <strong>{discountApplied.toLocaleString()}đ</strong></p>
        )}
        <p>Phí vận chuyển: <strong>{shippingFee.toLocaleString()}đ</strong></p><br/>
        <p>Tổng giá đơn hàng: <strong>{totalAmount.toLocaleString()}đ</strong></p>
        <br/><hr/><br/>
        <p>Tổng cộng:<strong> {finalAmount.toLocaleString()}đ</strong></p>
        <button className={styles.orderBtn} onClick={handleOrder}>
          ĐẶT HÀNG
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
