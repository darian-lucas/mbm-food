"use client";
import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUserFriends, faBox, faHeart, faShoppingCart, faCog, faEnvelope, faLanguage, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { name: "Dashboard", icon: faHome },
        { name: "Category", icon: faUsers },
        { name: "Customers", icon: faUserFriends },
        { name: "Products", icon: faBox },
        { name: "Banner", icon: faHeart },
        { name: "Orders", icon: faShoppingCart },
        { name: "Settings", icon: faCog },
        { name: "Message", icon: faEnvelope },
        { name: "Language", icon: faLanguage },
        { name: "Login", icon: faSignOutAlt }
    ];

    let menuList = [];
    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];
        let className = `${styles.sidebarItem} ${activeIndex === i ? styles.sidebarItemActive : ""}`;

        menuList.push(
            <li key={i} className={className} onClick={() => setActiveIndex(i)}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                {item.name}
            </li>
        );
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>SHERAH</div>
            <ul className={styles.sidebarMenu}>{menuList}</ul>
        </div>
    );
}
