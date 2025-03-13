"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

interface Order {
  orderId: string;
  id_user: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
  order_code: string;
  total_payment: number;
  total_amount: number;
  discount_code: string;
  discount_value: number;
  note: string;
  name: string;
  receive_address: string;
  products: {
    id_product: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

const SuccessPage = () => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem("orderData");
      if (storedOrder) {
        const parsedOrder: Order = JSON.parse(storedOrder);
  
        if (
          parsedOrder.order_code &&
          parsedOrder.id_user &&
          parsedOrder.email &&
          parsedOrder.address &&
          parsedOrder.phone &&
          parsedOrder.paymentMethod &&
          parsedOrder.total_payment !== undefined &&
          parsedOrder.total_amount !== undefined &&
          parsedOrder.discount_code !== undefined &&
          parsedOrder.discount_value !== undefined &&
          parsedOrder.note !== undefined &&
          parsedOrder.name &&
          parsedOrder.receive_address &&
          parsedOrder.products &&
          Array.isArray(parsedOrder.products)
        ) {
          setOrder(parsedOrder);
        } else {
          console.error("Dữ liệu order không hợp lệ:", parsedOrder);
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu order:", error);
    }
  }, []);
  
  
  

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        {/* Logo */}
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-green-600 flex items-center">
            <span className="text-red-500 text-5xl mr-2">V</span>DOLA <span className="text-red-500 ml-1">Food</span>
          </h2>
        </div>

        {/* Thông báo */}
        <div className="mt-6 text-center">
          <div className="text-green-600 text-5xl">✔</div>
          <h2 className="text-xl font-semibold mt-3">Cảm ơn bạn đã đặt hàng</h2>
          <p className="text-gray-600 text-sm">
  Một email xác nhận đã được gửi tới <b>{order.email}</b>. Xin vui lòng kiểm tra email của bạn.
</p>

{/* Thông tin khách hàng */}
<div className="mt-6 flex justify-between border p-4 rounded-lg">
  <div>
    <h3 className="font-semibold">Thông tin mua hàng</h3>
    <p>{order.name}</p>
    <p>{order.email}</p>
    <p>{order.phone}</p>
  </div>
  <div>
    <h3 className="font-semibold">Phương thức thanh toán</h3>
    <p>{order.paymentMethod}</p>
  </div>
</div>

        </div>

        {/* Thông tin đơn hàng */}
        <div className="mt-6 border p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Đơn hàng #{order.order_code}</h3>
{order.products.map((item, index) => (
  <div key={index} className="flex justify-between items-center border-b py-2">
    <div className="flex items-center">
      <div>
        <p className="font-semibold">{item.name}</p>
      </div>
    </div>
    <p className="font-semibold">{item.price.toLocaleString()}đ</p>
  </div>
))}

          <div className="flex justify-between font-semibold mt-3">
  <p>Tổng cộng</p>
  <p className="text-blue-600">{order.total_payment.toLocaleString()}đ</p>
</div>

        </div>

        {/* Nút tiếp tục mua hàng */}
        <div className="mt-6 text-center">
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Tiếp tục mua hàng
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
