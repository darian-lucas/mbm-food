"use client";

import { useState, useEffect } from "react";
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

const CheckoutPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<
    { name: string; value: string }[]
  >([]);

  // Fetch danh sách phương thức thanh toán từ API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/payments");
        if (!response.ok)
          throw new Error("Không thể lấy dữ liệu phương thức thanh toán!");

        const data = await response.json();
        const formattedMethods = data.map(
          (method: { payment_name: string }) => ({
            value: method.payment_name,
            name:
              method.payment_name === "cash"
                ? "Thanh toán bằng tiền mặt"
                : method.payment_name === "momo"
                ? "Thanh toán bằng MoMo"
                : method.payment_name === "vnpay"
                ? "Thanh toán bằng VNPay"
                : method.payment_name,
          })
        );

        setPaymentMethods(formattedMethods);
      } catch (error) {
        console.error("Lỗi khi lấy phương thức thanh toán:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const response = await fetch(
          `http://localhost:3001/api/user/${userId}`
        );
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData).map((item: CartItem) => ({
          id_product: item._id,
          name: item.name || "Sản phẩm không có tên",
          size: item.size || "Mặc định",
          price: item.price || 0,
          quantity: item.quantity || 1,
          image: item.image || "",
        }));
        setCart(parsedCart);
      }
    };
    fetchCart();
  }, []);

  // Tính tổng tiền
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalAmount = totalAmount - discount; // Tổng tiền sau giảm giá

  // Xử lý áp dụng mã giảm giá
  const handleApplyDiscount = async () => {
    if (!discountCode) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/coupons`);
      if (!response.ok) throw new Error("Không thể lấy dữ liệu mã giảm giá!");

      const data = await response.json();
      const coupons = data.data; // Mảng chứa danh sách mã giảm giá

      const now = new Date(); // Ngày hiện tại
      const coupon = coupons.find((item: any) => item.code === discountCode);

      if (!coupon) {
        toast.error("Mã giảm giá không tồn tại!");
        return;
      }

      const startDate = new Date(coupon.start_date);
      const endDate = new Date(coupon.end_date);

      if (coupon.status !== "Active") {
        toast.error("Mã giảm giá không hợp lệ!");
        return;
      }

      if (coupon.quantity <= 0) {
        toast.error("Mã giảm giá đã hết số lượng!");
        return;
      }

      if (now < startDate || now > endDate) {
        toast.error("Mã giảm giá đã hết hạn sử dụng!");
        return;
      }

      // Kiểm tra điều kiện áp dụng mã giảm giá
      if (coupon.type === "Amount" && totalAmount < 200000) {
        toast.error(
          "Mã giảm giá chỉ áp dụng cho đơn hàng từ 200.000đ trở lên!"
        );
        return;
      }
      if (coupon.type === "Shipping" && totalAmount < 300000) {
        toast.error(
          "Mã miễn phí vận chuyển chỉ áp dụng cho đơn hàng từ 300.000đ trở lên!"
        );
        return;
      }

      setDiscount(coupon.discount);
      toast.success(
        `Áp dụng mã ${coupon.code}! Giảm ${coupon.discount.toLocaleString()}đ`
      );
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã giảm giá:", error);
      toast.error("Không thể áp dụng mã giảm giá!");
    }
  };

  const handleOrder = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      return;
    }
    if (discountCode) {
      try {
        const response = await fetch(
          "http://localhost:3001/api/coupons/apply-coupon",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: discountCode }),
          }
        );

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

   // Lấy payment_name của phương thức đang chọn
  const selectedPayment = paymentMethods.find(
    (method) => method.value === paymentMethod
  )?.value || "cash";

  const orderData = {
    id_user: user._id,
    email: user.email,
    address: user.address[0]?.address || "",
    phone: user.address[0]?.phone || "",
    paymentMethod: selectedPayment,
    products: cart.map((item) => ({
      id_product: item.id_product || "",
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    order_code: `MBM${Date.now()}`,
    total_payment: finalAmount,
    discount_code: discountCode,
    discount_value: discount,
    note: "Không có ghi chú",
    name: user.address[0]?.name || "",
    receive_address: user.address[0]?.address || "",
    total_amount: totalAmount,
  };

  console.log("Dữ liệu orderData gửi lên:", orderData);

    console.log("Payment Method:", paymentMethod); // Add this line to log paymentMethod
    console.log("Cart:", cart);
    // Lưu vào localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    try {
      const orderResponse = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResponseData = await orderResponse.json();

      console.log("Dữ liệu của orderResponseData", orderResponseData);
      if (!orderResponse.ok) {
        throw new Error(orderResponseData.error || "Đặt hàng thất bại!");
      }

      if (paymentMethod === "momo") {
        // Gọi API tạo thanh toán MoMo
        const momoResponse = await fetch(
          "http://localhost:3001/api/payments/momo/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: orderResponseData.id_user,
              order_code: orderResponseData.result.order.order_code,
              amount: finalAmount,
            }),
          }
        );

        const momoData = await momoResponse.json();
        console.log("Dữ liệu của momoResponse", momoData);
        if (!momoResponse.ok) {
          throw new Error(momoData.message || "Lỗi khi tạo thanh toán Momo!");
        }

        // Chuyển hướng đến cổng thanh toán MoMo
        window.location.href = momoData.payUrl;
        return;
      }

      await fetch("http://localhost:3001/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, orderData }),
      });

      toast.success("Đặt hàng thành công! Email xác nhận đã được gửi.");
      localStorage.removeItem("cart");
      setCart([]);

      router.push("/success");
    } catch (error) {
      const errMessage = (error as Error).message || "Đặt hàng thất bại!";
      console.error("⚠️ Lỗi khi đặt hàng:", errMessage);
      toast.error(`Lỗi đặt hàng: ${errMessage}`);
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
                  key={method.value}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method.name}
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
            <Image
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
