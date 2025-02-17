import { manrope } from "@/utils";
// import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={manrope.className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
