"use client";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./styles/costumerList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
