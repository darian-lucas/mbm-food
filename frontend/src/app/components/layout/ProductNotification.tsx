import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/ProductNotification.module.css";
import Link from "next/link";
interface Variant {
  option: string;
  price: number;
  sale_price: number;
  image: string;
  _id: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  idcate: string;
  variants: Variant[];
  hot?: number;
  view: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  flag: boolean;
}

const ProductNotification: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProduct, setRandomProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const showRandomProduct = () => {
        const randomIndex = Math.floor(Math.random() * products.length);
        const product = products[randomIndex];
        setRandomProduct(product);
        setVisible(true);

        setTimeout(() => {
          setVisible(false); // Ẩn sau 5 giây
        }, 5000);
      };

      // Chỉ gọi lần đầu tiên sau 5 giây, rồi sau đó mới bắt đầu interval
      const firstTimeout = setTimeout(() => {
        showRandomProduct();
        const interval = setInterval(showRandomProduct, 10000); // Mỗi 10 giây
        return () => clearInterval(interval); // Dọn dẹp interval
      }, 5000);

      return () => clearTimeout(firstTimeout); // Dọn dẹp timeout lần đầu
    }
  }, [products]);

  if (!randomProduct || !visible) return null;

  // Chọn hình ảnh của variant đầu tiên (có thể tùy chỉnh logic chọn hình)
  const productImage = randomProduct.variants[0]?.image
    ? `http://localhost:3001/images/${randomProduct.variants[0].image}`
    : "/placeholder.png";

  return (
    <div className={styles.notificationContainer}>
      <Link href={`/product/${randomProduct.slug}`}>
        <Image
          src={productImage}
          alt={randomProduct.name}
          width={60}
          height={60}
          className={styles.productImage}
        />
      </Link>
      <div className={styles.notificationContent}>
        <Link href={`/product/${randomProduct.slug}`}>
          <h4>{randomProduct.name}</h4>
        </Link>
        <p>Giá: {randomProduct.variants[0]?.price?.toLocaleString()} VND</p>
        <span>Đã được mua cách đây 45 phút</span>
      </div>
      <button className={styles.closeBtn} onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};

export default ProductNotification;
