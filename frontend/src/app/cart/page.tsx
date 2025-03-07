"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/CartPage.module.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  sale_price?: number; // tùy biến or mặc định = 0 
  quantity: number;
  image: string;
  variants: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        sale_price: item.sale_price || 0, // Nếu không có thì đặt là 0
        quantity: item.quantity,
        image: item.image,
        variants: `${item.option} - ${item.crust}`, // Ghép 2 giá trị
      })
    );
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
        total +
        (item.sale_price > 0 ? item.sale_price : item.price) * item.quantity,
      0
    );
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
            <div className={styles.row}>
              <div className={styles.cartLeft}>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className={styles.cartPage}>
                      <div className={styles.drawer}>
                        <div className={styles.cartPageContainer}>
                          <form action="/cart" className={styles.formCart}>
                            <div className={styles.cartHeaderInfo}>
                              <div>Thông tin sản phẩm</div>
                              <div>Đơn giá</div>
                              <div>Số lượng</div>
                              <div>Thành tiền</div>
                            </div>
                            <div className={styles.cartBody}>
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
                                      <a className={styles.ProductName}>
                                        {item.name}
                                      </a>
                                      <span className={styles.VariantTitle}>
                                        {item.variants}
                                      </span>
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
                                            : item.price.toLocaleString()}{" "}
                                          đ
                                        </span>
                                      </div>
                                    </div>
                                    <div className={styles.grid}>
                                      <div className={styles.cartSelect}>
                                        <div className={styles.qtyBtnCart}>
                                          <button
                                            className={styles.qtybtn}
                                            onClick={(e) =>
                                              decreaseQuantity(item.id, e)
                                            }
                                          >
                                            -
                                          </button>
                                          <span className={styles.textQty}>
                                            {item.quantity}
                                          </span>
                                          <button
                                            className={styles.qtybtn}
                                            onClick={(e) =>
                                              increaseQuantity(item.id, e)
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={styles.grid}>
                                      <div className={styles.cartPrice}>
                                        <span className={styles.price}>
                                          {getTotalPrice().toLocaleString()} đ
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.cartFooter}>
                              <div className={styles.row}>
                                <div className={styles.offSet}>
                                  <div className={styles.subTotal}>
                                    <div className={styles.cartSubTotal}>
                                      <div className={styles.cartCol}>
                                        Tổng tiền:
                                      </div>
                                      <div className={styles.textRight}>
                                        <span className={styles.totalPrice}>
                                          {getTotalPrice().toLocaleString()} đ
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.checkOut}>
                                    <button className={styles.cartBtnCheckOut}>
                                      Thanh toán
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Giỏ hàng của bạn đang trống.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
