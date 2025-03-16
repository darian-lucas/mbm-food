"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OrderResult = () => {
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("orderId");
      const resultCode = urlParams.get("resultCode");

      if (!orderId) {
        toast.error("Không tìm thấy thông tin đơn hàng!");
        router.push("/checkout");
        return;
      }

      if (resultCode === "0") {
        toast.success("Thanh toán MoMo thành công!");

        // Gửi email xác nhận
        const email = localStorage.getItem("userEmail"); // Giả sử email đã được lưu trong localStorage
        if (email) {
          await fetch("http://localhost:3001/api/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, orderId }),
          });
        }

        // Xóa giỏ hàng sau khi thanh toán thành công
        localStorage.removeItem("cart");

        router.push("/success");
      } else {
        toast.error("Thanh toán thất bại hoặc bị hủy!");
        router.push("/checkout");
      }
    };

    checkPaymentStatus();
  }, [router]);

  return <p>Đang xử lý thanh toán...</p>;
};

export default OrderResult;
