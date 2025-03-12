"use client";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFavorites } from "@/services/Favorite";
import countCart from "../../hooks/countCart";

export default function Header(): JSX.Element {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showProductMenu, setShowProductMenu] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cartCount = countCart();
  const menuItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/product", label: "Sản phẩm", isDropdown: true },
    { href: "/about", label: "Giới thiệu" },
    { href: "/news", label: "Tin tức" },
    { href: "/contact", label: "Liên hệ" },
    { href: "/faq", label: "Câu hỏi thường gặp" },
    { href: "/storesystem", label: "Hệ thống cửa hàng" },
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
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
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
  // Xử lí dăng xuất !
  const handleLogout = () => {
    localStorage.removeItem("token");
    //Bổ sung khi đăng xuất thì xóa luôn userId để khi đăng nhập mới được bình luận
    localStorage.removeItem("userId"); // Xóa userId
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập
    localStorage.removeItem("token"); // Xóa token nếu có
    setIsLoggedIn(false);
    window.location.reload();
  };
  return (
    <header>
      <div className={styles.headerTop}>Nhiều ưu đãi dành cho bạn</div>
      <div className={styles.headerMain}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Dola Food"
            width={150}
            height={75}
            priority
          />
        </Link>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Bạn muốn tìm gì?" />
          <div className={styles.searchIcon}>
            <Image
              src="/images/search-icon.png"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className={styles.delivery}>
          <Image
            src="/images/delivery-icon.png"
            alt="Delivery"
            width={40}
            height={40}
          />
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
            <Image
              src="/images/user-icon.png"
              alt="User"
              width={30}
              height={30}
            />
            {showUserMenu && (
              <div className={styles.dropdownMenu}>
                {isLoggedIn ? (
                  <>
                    <Link href="/account" className={styles.menuItem}>
                      <Image
                        src="/images/user-icon.png"
                        alt="Account"
                        width={20}
                        height={20}
                      />{" "}
                      Tài khoản
                    </Link>
                    <button onClick={handleLogout} className={styles.menuItem}>
                      <Image
                        src="/images/register-icon.png"
                        alt="Logout"
                        width={20}
                        height={20}
                      />{" "}
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={styles.menuItem}>
                      <Image
                        src="/images/register-icon.png"
                        alt="Login"
                        width={20}
                        height={20}
                      />{" "}
                      Đăng nhập
                    </Link>
                    <Link href="/register" className={styles.menuItem}>
                      <Image
                        src="/images/register-icon.png"
                        alt="Register"
                        width={20}
                        height={20}
                      />{" "}
                      Đăng ký
                    </Link>
                  </>
                )}
                <Link href="/favorite" className={styles.menuItem}>
                  <Image
                    src="/images/heart-icon.png"
                    alt="Wishlist"
                    width={20}
                    height={20}
                  />
                  Danh sách yêu thích
                  {favoriteCount > 0 && (
                    <span className={styles.favoriteBadge}>
                      {favoriteCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
          <Link href="/cart" className={styles.cartIcon}>
            <Image
              src="/images/cart-icon.png"
              alt="Cart"
              width={30}
              height={30}
            />
            <span className={styles.cartBadge}>{cartCount}</span>
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
