"use client";
import React, { useState } from "react";
import Link from "next/link"; // Thêm Link
import styles from "../styles/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLayerGroup,
  faUserFriends,
  faBox,
  faHeart,
  faShoppingCart,
  faCog,
  faEnvelope,
  faLanguage,
  faSignOutAlt,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function SidebarAdmin() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: "Dashboard", icon: faHome, path: "/admin" },
    { name: "Category", icon: faLayerGroup, path: "/admin/manage/category" },
    {
      name: "Customers",
      icon: faUserFriends,
      path: "/admin/manage/custumerList",
    },
    { name: "Products", icon: faBox, path: "/admin/manage/products" },
    { name: "Banner", icon: faHeart, path: "/admin/manage/banner" },
    { name: "Orders", icon: faShoppingCart, path: "/admin/manage/orders" },
    { name: "News", icon: faNewspaper, path: "/admin/manage/newsList" }, // Đường dẫn mới
    { name: "Settings", icon: faCog, path: "/admin/manage/settings" },
    { name: "Message", icon: faEnvelope, path: "/admin/manage/messages" },
    { name: "Language", icon: faLanguage, path: "/admin/manage/language" },
    { name: "Login", icon: faSignOutAlt, path: "/login" },
  ];

  return (
    <div className={styles.sidebar}>
      <div className="flex items-center justify-center w-full">
        <Link href="/" className="">
          <Image
            src="/images/logo.png"
            alt="Dola Food"
            width={200}
            height={110}
            className="w-[200px] h-[100px] object-fill"
            priority
          />
        </Link>
      </div>
      <ul className={styles.sidebarMenu}>
        {menuItems.map((item, i) => (
          <li
            key={i}
            className={`${styles.sidebarItem} ${
              activeIndex === i ? styles.sidebarItemActive : ""
            }`}
            onClick={() => setActiveIndex(i)}
          >
            <Link href={item.path} className={styles.link}>
              <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
