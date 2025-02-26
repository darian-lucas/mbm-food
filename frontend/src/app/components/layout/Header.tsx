"use client";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFavorites } from "@/services/Favorite";

export default function Header(): JSX.Element {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const menuItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/product", label: "Sản phẩm", isDropdown: true },
    { href: "/about", label: "Giới thiệu" },
    { href: "/news", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
    { href: "/faq", label: "Câu hỏi thường gặp" },
    { href: "/he-thong-cua-hang", label: "Hệ thống cửa hàng" },
    { href: "/dat-ban", label: "Đặt bàn" },
  ];

  const productCategories = [
    { href: "/product/pizza", label: "Pizza" },
    { href: "/product/khai-vi", label: "Khai Vị" },
    { href: "/product/my-y", label: "Mỳ Ý" },
    { href: "/product/salad", label: "Salad" },
    { href: "/product/nuoc-uong", label: "Nước Uống" },
  ];

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchFavorites = async () => {
      if (token) {
        try {
          const data = await getFavorites(token);
          if (Array.isArray(data)) {
            setFavoriteCount(data.length);
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách yêu thích:", error);
        }
      }
    };

    fetchFavorites();
  }, []);

  return (
    <header>
      <div className={styles.headerTop}>Nhiều ưu đãi dành cho bạn</div>
      <div className={styles.headerMain}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.png" alt="Dola Food" width={150} height={75} priority />
        </Link>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Bạn muốn tìm gì?" />
          <div className={styles.searchIcon}>
            <Image src="/images/search-icon.png" alt="Search" width={20} height={20} />
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
                <Link href="/login" className={styles.menuItem}>
                  <Image src="/images/login-icon.png" alt="Login" width={20} height={20} /> Đăng nhập
                </Link>
                <Link href="/register" className={styles.menuItem}>
                  <Image src="/images/register-icon.png" alt="Register" width={20} height={20} /> Đăng ký
                </Link>
                <Link href="/favorite" className={styles.menuItem}>
                  <Image src="/images/heart-icon.png" alt="Wishlist" width={20} height={20} />
                  Danh sách yêu thích{favoriteCount > 0 && <span className={styles.favoriteBadge}>{favoriteCount}</span>}
                </Link>
              </div>
            )}
          </div>
          <Link href="/cart" className={styles.cartIcon}>
            <Image src="/images/cart-icon.png" alt="Cart" width={30} height={30} />
            <span className={styles.cartBadge}>0</span>
          </Link>
        </div>
        <div className={styles.icons}>
          <Link href="/dat-mon">
            <button>Đặt món online</button>
          </Link>
          <Link href="/dat-ban">
            <button>Đặt bàn</button>
          </Link>
        </div>
      </div>
      <div className={styles.navbar}>
        {menuItems.map(({ href, label, isDropdown }) =>
          isDropdown ? (
            <div
              key={href}
              className={styles.productMenuContainer}
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <Link href={href}>{label}</Link>
              {showProductMenu && (
                <div className={styles.dropdownMenu}>
                  {productCategories.map(({ href, label }) => (
                    <Link key={href} href={href} className={styles.menuItem}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={href} href={href}>
              {label}
            </Link>
          )
        )}
      </div>
    </header>
  );
}
