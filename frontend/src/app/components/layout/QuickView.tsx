import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/QuickView.module.css";
import useCart from "../../hooks/useCart";

interface Variant {
  option: string;
  price: number;
  sale_price: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  variants: Variant[];
  idcate: string;
}

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<string>("Đế dày");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!product) return;

    setSelectedVariant(product.variants.length > 0 ? product.variants[0] : null);
  }, [product]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const { handleAddToCart } = useCart();

  const handleClickAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!product || !selectedVariant) return;
    handleAddToCart(product, selectedVariant, quantity);
  };

  if (!product || !selectedVariant) return <p>Loading...</p>;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <div className={styles.content}>
          <Image
            src={`http://localhost:3001/images/${selectedVariant.image}`}
            alt={product.name}
            width={400}
            height={400}
          />
          <div className={styles.form}>
            <div className={styles.detailProduct2}>
              <h1 className={styles.titleProduct}>{product.name}</h1>
              <div className={styles.price}>
                <p>
                  {selectedVariant.sale_price > 0
                    ? selectedVariant.sale_price
                    : selectedVariant.price.toLocaleString()}{" "}đ
                </p>
              </div>

              {/* Chọn kích thước */}
              {product.variants.some((v) => v.option.trim() !== "") && (
                <div className={styles.swatch}>
                  <p>Kích thước: <span>{selectedVariant.option}</span></p>
                  <div className={styles.selectOption}>
                    {product.variants.map((variant) => (
                      <label key={variant.option}>
                        <input
                          type="radio"
                          name="variant"
                          checked={selectedVariant.option === variant.option}
                          onChange={() => setSelectedVariant(variant)}
                        />
                        {variant.option}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Chọn đế nếu là pizza */}
              {product.idcate === "67b0a4fbb5a39baf9de368ff" && (
                <div className={styles.swatch}>
                  <p>Đế: <span>{selectedCrust}</span></p>
                  <div className={styles.selectOption}>
                    <label>
                      <input
                        type="radio"
                        name="crust"
                        checked={selectedCrust === "Đế dày"}
                        onChange={() => setSelectedCrust("Đế dày")}
                      />
                      Đế dày
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="crust"
                        checked={selectedCrust === "Đế mỏng"}
                        onChange={() => setSelectedCrust("Đế mỏng")}
                      />
                      Đế mỏng
                    </label>
                  </div>
                </div>
              )}

              <label className={styles.labelNote}>Ghi chú</label>
              <input type="text" placeholder="Ghi chú món ăn" className={styles.inputNote} />

              <div className={styles.quantity}>
                <label>Số lượng</label>
                <div className={styles.numberControl}>
                  <button className={styles.btnNum} onClick={decreaseQuantity}>-</button>
                  <span className={styles.quantityShow}>{quantity}</span>
                  <button className={styles.btnNum} onClick={increaseQuantity}>+</button>
                </div>
              </div>

              <button className={styles.add} onClick={handleClickAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
