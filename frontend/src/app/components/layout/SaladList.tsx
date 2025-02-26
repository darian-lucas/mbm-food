import Image from "next/image";
import styles from "../../../styles/ProductList.module.css";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
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
  hot: number;
  view: number;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const SaladList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("http://localhost:3001/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.data.filter(
          (product: Product) => product.idcate === "67b0a5d2b5a39baf9de36907"
        );
        setProducts(filteredProducts.slice(0, 5));
      });
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.ProductList}>
      {products.map((item) => (
        <div key={item._id} className={styles.ProductItem}>
          <button className={styles.favoriteIcon} onClick={() => toggleFavorite(item._id)}>
            <Heart size={20} className={favorites[item._id] ? styles.heartActive : styles.heartInactive} />
          </button>

          <Image src={`/images/${item.variants[0].image}`} alt={item.name} width={230} height={200} />

          <Link href={`/product/${item.slug}`}>
            <h3 className={styles.ProductName}>{item.name}</h3>
          </Link>
          <p className={styles.ProductDesc} dangerouslySetInnerHTML={{__html: item.description,}}/>          
          <a href="#" className={styles.viewMore}>Xem thêm</a>

          <div className={styles.ProductFooter}>
            <div className={styles.ProductPrice}>
              <p>Giá chỉ từ:</p>
              <span>{item.variants[0].price.toLocaleString()}₫</span>
            </div>
            <button className={styles.addButton}>Thêm</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaladList;
