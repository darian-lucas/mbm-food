"use client";
import { manrope } from "@/utils";
import "@/styles/globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ProductNotification from '../../components/layout/ProductNotification';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={manrope.className}>
      
      <Header />
      <main>{children}</main>
      <ProductNotification />
      <Footer />
      
    </div>
  );
}
