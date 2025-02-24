"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ProductDetail.module.css";
import { Heart } from "lucide-react";

interface Variant {
  option: string;
  price: number;
  sale_price: number;
  image: string;
}

interface Product {
  name: string;
  description: string;
  slug: string;
  variants: Variant[];
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<string>("Đế dày");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!slug) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/slug/${slug}`);
        if (!res.ok) throw new Error("Lỗi khi tải sản phẩm");
        const data = await res.json();
        setProduct(data.data);
        setSelectedVariant(data.data.variants[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product || !selectedVariant) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.pic}>
        <Image 
          src={`http://localhost:3001/images/${selectedVariant.image}`} 
          alt={product.name}
          width={400} 
          height={400}
          />
      </div>
      <div className={styles.formDetail}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.price}>{selectedVariant.sale_price > 0 ? selectedVariant.sale_price : selectedVariant.price} đ</p>
        <div className={styles.optionGroup}>
          <p className={styles.label}>Kích thước:</p>
          {product.variants.map((variant) => (
            <label key={variant.option} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedVariant.option === variant.option}
                onChange={() => setSelectedVariant(variant)}
              />
              {variant.option}
            </label>
          ))}
        </div>
        
        <div className={styles.optionGroup}>
          <p className={styles.label}>Đế: {selectedCrust}</p>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedCrust === "Đế dày"}
              onChange={() => setSelectedCrust("Đế dày")}
            />
            Dày
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedCrust === "Đế mỏng"}
              onChange={() => setSelectedCrust("Đế mỏng")}
            />
            Mỏng giòn
          </label>
        </div>

        <textarea className={styles.noteInput} placeholder="Ghi chú cho món ăn" />

        <div className={styles.quantityWrapper}>
          <p className={styles.label}>Số lượng:</p>
          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button className={styles.addToCart}>THÊM VÀO GIỎ</button>
          <button className={styles.favorite} title="Thêm vào yêu thích"><Heart /></button>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.buyNow}>MUA NGAY</button>
          <button className={styles.bookNow}>Đặt bàn ngay</button>
        </div>
        
        <p className={styles.support}>Gọi <span className={styles.hotline}>1900.6750</span> Để được hỗ trợ ngay</p>
      </div>
    </div>

  );
};

export default ProductDetail;
