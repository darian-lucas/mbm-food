"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/CartPage.module.css";
import CartIcon from "@/components/ui/empty";
import { useRouter } from "next/navigation";



interface CartItem {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  quantity: number;
  image: string;
  variants?: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").filter(
      (item: any) => item && typeof item === "object" && "id" in item // Lọc các item hợp lệ
    ).map((item: any) => {
      let variants = "";
      if (item.option && item.crust) {
        variants = `${item.option} - ${item.crust}`;
      } else if (item.option) {
        variants = item.option;
      } else if (item.crust) {
        variants = item.crust;
      }
  
      return {
        id: item.id || "", // Đảm bảo luôn có id, tránh lỗi undefined
        name: item.name || "Sản phẩm không tên", // Đề phòng trường hợp thiếu name
        price: item.price || 0, // Giá mặc định là 0 nếu thiếu
        sale_price: item.sale_price || 0,
        quantity: item.quantity || 1, // Mặc định 1 nếu thiếu số lượng
        image: item.image || "default.jpg", // Hình mặc định nếu thiếu
        variants: variants || undefined,
      };
    });
  
    setCart(storedCart);
  }, []);
  

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQuantity = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total + (item.sale_price > 0 ? item.sale_price : item.price) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
  
      console.log(user);
      if (user && user.isLoggedIn) {
        router.push("../checkout");
      } else {
        router.push("../login");
      }
    } catch (error) {
      console.error("Lỗi khi parse JSON:", error);
      router.push("../login"); // Nếu có lỗi, chuyển hướng đến trang đăng nhập
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.mainCartPage}>
        <div className={styles.mainContainer}>
          <div className={styles.wrapBackGround}>
            <div className={styles.headerCart}>
              <div className={styles.titleBlockPage}>
                <h1 className={styles.titleCart}></h1>
              </div>
            </div>

            {cart.length > 0 ? (
              <div className={styles.row}>
                <div className={styles.cartLeft}>
                  <div className={styles.cartHeaderInfo}>
                    <div>Thông tin sản phẩm</div>
                    <div>Đơn giá</div>
                    <div>Số lượng</div>
                    <div>Thành tiền</div>
                  </div>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.cartBody}>
                      <div className={styles.ajaxCartRow}>
                        <div className={styles.ajaxCartProduct}>
                          <Image
                            className={styles.ajaxImage}
                            src={`http://localhost:3001/images/${item.image}`}
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                          <div className={styles.gridItemInfo}>
                            <div className={styles.cartName}>
                              <a className={styles.ProductName}>{item.name}</a>
                              {item.variants && (
                                <span className={styles.VariantTitle}>{item.variants}</span>
                              )}
                              <button
                                className={styles.removebtn}
                                onClick={() => removeItem(item.id)}
                              >
                                Xóa
                              </button>
                            </div>
                            <div className={styles.grid}>
                              <div className={styles.cartPrice}>
                                <span className={styles.price}>
                                  {item.sale_price > 0
                                    ? item.sale_price
                                    : item.price.toLocaleString()} đ
                                </span>
                              </div>
                            </div>
                            <div className={styles.grid}>
                              <div className={styles.cartSelect}>
                                <div className={styles.qtyBtnCart}>
                                  <button
                                    className={styles.qtybtn}
                                    onClick={(e) => decreaseQuantity(item.id, e)}
                                  >
                                    -
                                  </button>
                                  <span className={styles.textQty}>{item.quantity}</span>
                                  <button
                                    className={styles.qtybtn}
                                    onClick={(e) => increaseQuantity(item.id, e)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className={styles.grid}>
                              <div className={styles.cartPrice}>
                                <span className={styles.price}>
                                  {((item.sale_price > 0 ? item.sale_price : item.price) * item.quantity).toLocaleString()} đ
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={styles.cartFooter}>
                    <div className={styles.offSet}>
                      <div className={styles.subTotal}>
                        <div className={styles.cartSubTotal}>
                          <div className={styles.cartCol}>Tổng tiền:</div>
                          <div className={styles.textRight}>
                            <span className={styles.totalPrice}>
                              {getTotalPrice().toLocaleString()} đ
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.checkOut}>
                        <button 
                        className={styles.cartBtnCheckOut}
                        onClick={handleCheckout}
                        >Thanh toán
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.Empty}>
                <CartIcon />
                <p>Giỏ hàng của bạn đang trống.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
