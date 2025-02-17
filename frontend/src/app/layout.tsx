"use client"; // Đặt "use client" vì có usePathname
import { manrope } from "@/utils";
import { usePathname } from "next/navigation";
import "./globals.css";
import ClientLayout from "@/app/layout/ClientLayout";
import AdminLayout from "@/app/layout/AdminLayout"; // Import AdminLayout



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu là trang admin, dùng AdminLayout, ngược lại dùng ClientLayout
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={manrope.className}>
        {isAdmin ? <AdminLayout>{children}</AdminLayout> : <ClientLayout>{children}</ClientLayout>}
      </body>
    </html>
  );
}
