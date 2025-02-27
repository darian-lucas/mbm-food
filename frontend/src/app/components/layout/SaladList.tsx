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
        setProducts(filteredProducts.slice(0, 10));
      });
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;

  return (
    <div className={styles.container}>
      <section className={styles.sectionProduct}>
        <div className={styles.titleModule}>
          <h3><a href="">Salad</a></h3>
        </div>
        <div className={styles.rowFix}>
          {products.map((item) => (
            <div className={styles.colFix} key={item._id}>
              <div className={styles.productAction}>
                <div className={styles.productThumnail}>
                  <Link href={`/product/${item.slug}`} className={styles.imageThum}>
                    <Image className={styles.img} src={`${API_URL}/images/${item.variants[0].image}`} alt={item.name} width={234} height={234} />
                  </Link>
                  <button className={styles.whistList} onClick={() => toggleFavorite(item._id)}>
                    <Heart size={20} className={favorites[item._id] ? styles.heartActive : styles.heartInactive} />
                  </button>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>
                    <Link href={`/product/${item.slug}`} className={styles.productName}>{item.name}</Link>
                  </h3>
                  <div className={styles.productContent}>
                    <span className={styles.ProductDesc} dangerouslySetInnerHTML={{ __html: item.description }} />
                    <Link href={`/product/${item.slug}`}>Xem thêm</Link>
                  </div>
                  <div className={styles.groupForm}>
                    <div className={styles.priceBox}>
                      <span>Giá chỉ từ:  </span> {item.variants[0].price.toLocaleString()}₫
                    </div>
                    <button className={styles.add}>Thêm</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SaladList;
