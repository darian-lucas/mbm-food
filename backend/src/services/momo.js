export const createMomoPayment = async (amount, orderId) => {
    const response = await fetch("/api/payment/momo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        orderId,
        orderInfo: "Thanh toán đơn hàng",
      }),
    });
  
    return response.json();
  };
  