"use client";
import { manrope } from "@/utils";
import ClientLayout from "@/app/layout/ClientLayout";
import AdminLayout from "@/app/layout/AdminLayout";
import { usePathname } from "next/navigation";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu là trang admin, dùng AdminLayout, ngược lại dùng ClientLayout
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={manrope.className}>
        <ToastContainer position="top-right" autoClose={3000} />
        {isAdmin ? <AdminLayout>{children}</AdminLayout> : <ClientLayout>{children}</ClientLayout>}
      </body>
    </html>
  );
}
