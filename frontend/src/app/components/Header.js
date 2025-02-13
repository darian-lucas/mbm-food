"use client";
import styles from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);

  return (
    <header>
      <div className={styles.headerTop}>Nhiều ưu đãi dành cho bạn</div>
      <div className={styles.headerMain}>
        <a href="#" className={styles.logo}>
          <Image src="/images/logo.png" alt="Dola Food" width={150} height={75} />
        </a>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Bạn muốn tìm gì?" />
          <div className={styles.searchIcon}>
            <Image src="/images/search-icon.png" alt="Search" width={20} height={20} className={styles.whiteIcon} />
          </div>
        </div>
        <div className={styles.delivery}>
          <Image src="/images/delivery-icon.png" alt="Delivery" width={40} height={40} />
          <span>
            Giao hàng tận nơi
            <br />
            <strong>1900 6750</strong>
          </span>
        </div>
        <div className={styles.userCart}>
          <div 
            className={styles.userIcon} 
            onMouseEnter={() => setShowUserMenu(true)} 
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <Image src="/images/user-icon.png" alt="User" width={30} height={30} />
            {showUserMenu && (
              <div className={styles.dropdownMenu}>
                <a href="#" className={styles.menuItem}><Image src="/images/login-icon.png" alt="Login" width={20} height={20} /> Đăng nhập</a>
                <a href="#" className={styles.menuItem}><Image src="/images/register-icon.png" alt="Register" width={20} height={20} /> Đăng ký</a>
                <a href="#" className={styles.menuItem}><Image src="/images/heart-icon.png" alt="Wishlist" width={20} height={20} /> Danh sách yêu thích</a>
              </div>
            )}
          </div>
          <a href="#" className={styles.cartIcon}>
            <Image src="/images/cart-icon.png" alt="Cart" width={30} height={30} />
            <span className={styles.cartBadge}>0</span>
          </a>
        </div>
        <div className={styles.icons}>
          <a href="#"><button>Đặt món online</button></a>
          <a href="#"><button>Đặt bàn</button></a>
        </div>
      </div>
      <div className={styles.navbar}>
        <a href="#" className={styles.active}>Trang chủ</a>
        <a href="#">Giới thiệu</a>
        <div 
          className={styles.productMenuContainer}
          onMouseEnter={() => setShowProductMenu(true)}
          onMouseLeave={() => setShowProductMenu(false)}
        >
          <a href="#">Sản phẩm</a>
          {showProductMenu && (
            <div className={styles.dropdownMenu}>
              <a href="#" className={styles.menuItem}>Pizza</a>
              <a href="#" className={styles.menuItem}>Khai Vị</a>
              <a href="#" className={styles.menuItem}>Mỳ Ý</a>
              <a href="#" className={styles.menuItem}>Salad</a>
              <a href="#" className={styles.menuItem}>Nước Uống</a>
            </div>
          )}
        </div>
        <a href="#">Tin tức</a>
        <a href="#">Liên hệ</a>
        <a href="#">Câu hỏi thường gặp</a>
        <a href="#">Hệ thống cửa hàng</a>
        <a href="#">Đặt bàn</a>
      </div>
    </header>
  );
}
