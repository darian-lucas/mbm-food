"use client";
import React from "react";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.searchBox}>
                <input type="text" placeholder="Search..." />
                <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            </div>
            <div className={styles.userInfo}>
                <FontAwesomeIcon icon={faBell} />
                <img src="https://via.placeholder.com/40" alt="User" className={styles.avatar} />
                <span>Anthony (USA)</span>
            </div>
        </div>
    );
}
