"use client";
import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUserFriends, faBox, faHeart, faShoppingCart, faFileInvoice, faHistory, faCog, faEnvelope, faFile, faLanguage, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const menuItems = [
        { name: "Dashboard", icon: faHome },
        { name: "Vendors", icon: faUsers },
        { name: "Customers", icon: faUserFriends },
        { name: "Products", icon: faBox },
        { name: "Wishlist", icon: faHeart },
        { name: "Orders", icon: faShoppingCart },
        { name: "Invoice", icon: faFileInvoice },
        { name: "History", icon: faHistory },
        { name: "Settings", icon: faCog },
        { name: "Message", icon: faEnvelope },
        { name: "Pages", icon: faFile },
        { name: "Language", icon: faLanguage },
        { name: "Login", icon: faSignOutAlt }
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>SHERAH</div>
            <ul className={styles.sidebarMenu}>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`${styles.sidebarItem} ${activeIndex === index ? styles.sidebarItemActive : ""}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
