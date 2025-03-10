import { useState, useEffect } from "react";

export default function useCart() {
  const [cartCount, setCartCount] = useState<number>(0);

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
  };

  useEffect(() => {
    setCartCount(getCartCount());

    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    //Sự kiện cập nhật giỏ hàng
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return cartCount;
}
