"use client";
import { manrope } from "@/utils";
import ClientLayout from "@/app/layout/ClientLayout";
import AdminLayout from "@/app/layout/AdminLayout";
import { usePathname } from "next/navigation";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { log } from "console";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  useEffect(() => {
    if (!pathname) return;
    const pathNames = pathname.split("/").filter((path) => path);

    if (pathNames.length === 0) {
      document.title = "Mbmfood";
      return;
    }

    let formattedTitle = "Mbmfood";

    const fetchNames = async () => {
      const newNames: Record<string, string> = {};
      await Promise.all(
        pathNames.map(async (slug) => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_URL_IMAGE}/api/breadcrum?slug=${slug}`
            );
            newNames[slug] = res.data.name || slug;
          } catch {
            newNames[slug] = slug;
          }
        })
      );

      const formattedParts = pathNames
        .map((part) => newNames[part] || part)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

      formattedTitle = `Mbmfood | ${formattedParts.join(" | ")}`;
      document.title = formattedTitle;
    };

    fetchNames();
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="120x120" href="/apple-icon-120x120.png"></link>
      </head>
      <body className={manrope.className}>
        <ToastContainer position="top-right" autoClose={1500} />
        {isAdmin ? (
          <AdminLayout>{children}</AdminLayout>
        ) : (
          <ClientLayout>{children}</ClientLayout>
        )}
      </body>
    </html>
  );
}
