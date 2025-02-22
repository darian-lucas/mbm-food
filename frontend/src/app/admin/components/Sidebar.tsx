"use client";
import React, { useState } from "react";
import Link from "next/link"; // Thêm Link
import styles from "../styles/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, faLayerGroup, faUserFriends, faBox, 
    faHeart, faShoppingCart, faCog, faEnvelope, 
    faLanguage, faSignOutAlt, faNewspaper 
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { name: "Dashboard", icon: faHome, path: "/admin" },
        { name: "Category", icon: faLayerGroup, path: "/admin/pages/category" },
        { name: "Customers", icon: faUserFriends, path: "/admin/pages/custumerList" },
        { name: "Products", icon: faBox, path: "/admin/pages/products" },
        { name: "Banner", icon: faHeart, path: "/admin/pages/banner" },
        { name: "Orders", icon: faShoppingCart, path: "/admin/pages/orders" },
        { name: "News", icon: faNewspaper, path: "/admin/pages/newsList" }, // Đường dẫn mới
        { name: "Settings", icon: faCog, path: "/admin/pages/settings" },
        { name: "Message", icon: faEnvelope, path: "/admin/pages/messages" },
        { name: "Language", icon: faLanguage, path: "/admin/pages/language" },
        { name: "Login", icon: faSignOutAlt, path: "/login" }
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>SHERAH</div>
            <ul className={styles.sidebarMenu}>
                {menuItems.map((item, i) => (
                    <li 
                        key={i} 
                        className={`${styles.sidebarItem} ${activeIndex === i ? styles.sidebarItemActive : ""}`} 
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
