"use client"; 

import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ProductDetail.module.css";
import { Heart } from "lucide-react";

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/slug/${slug}`);
        if (!res.ok) throw new Error("Lỗi khi tải sản phẩm");
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Image src={product.image} alt={product.name} width={400} height={400} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Giá: {product.price} VND</p>
      <button className={styles.button}>
        <Heart /> Yêu thích
      </button>
    </div>
  );
};

export default ProductDetail;
