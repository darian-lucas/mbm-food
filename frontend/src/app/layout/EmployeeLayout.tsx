"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../admin/components/Header";
import styles from "../admin/styles/costumerList.module.css";
import SidebarEmployee from "../employee/components/SidebarEmployee";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <SidebarEmployee />
      <div className={styles.content}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
