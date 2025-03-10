"use client";
import { manrope } from "@/utils";
import ClientLayout from "@/app/layout/ClientLayout";
import AdminLayout from "@/app/layout/AdminLayout";
import { usePathname } from "next/navigation";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeLayout from "./layout/EmployeeLayout";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); 

  // Kiểm tra role theo đường dẫn
  const isAdmin = pathname.startsWith("/admin");
  const isEmployee = pathname.startsWith("/employee");

  return (
    <html lang="en">
      <body className={manrope.className}>
        <ToastContainer position="top-right" autoClose={1500} />
        {isAdmin ? (
          <AdminLayout>{children}</AdminLayout>
        ) : isEmployee ? (
          <EmployeeLayout>{children}</EmployeeLayout>
        ) : (
          <ClientLayout>{children}</ClientLayout>
        )}
      </body>
    </html>
  );
}
