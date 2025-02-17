"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import styles from "../admin/styles/costumerList.module.css";


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
