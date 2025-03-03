"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Employee.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faCog,
  faEnvelope,
  faLanguage,
  faSignOutAlt,
  faTable
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function SidebarEmployee() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: "Dashboard", icon: faHome, path: "/employee" },
    { name: "Orders", icon: faShoppingCart, path: "/employee/manage/orders" },
    { name: "Table", icon: faTable, path: "/employee/manage/table" },
    { name: "Settings", icon: faCog, path: "/employee/manage/settings" },
    { name: "Message", icon: faEnvelope, path: "/employee/manage/messages" },
    { name: "Language", icon: faLanguage, path: "/employee/manage/language" },
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
