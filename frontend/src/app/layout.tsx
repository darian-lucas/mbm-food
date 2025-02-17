"use client";
import { manrope } from "@/utils";
import ClientLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout"
import { usePathname } from "next/navigation";


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
