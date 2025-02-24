"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { addFavorite, getFavorites, removeFavorite } from "../../services/Favotite";
import styles from "../../styles/Favorite.module.css"; // Import CSS module

interface Product {
  _id: string;
  name: string;
  slug: string;
  idcate: string;
  variants: { option: string; price: number; sale_price: number; image: string }[];
  hot: number;
  view: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        alert("Chưa có token, vui lòng đăng nhập");
        return;
      }

      try {
        const data = await getFavorites(token);
        console.log("Dữ liệu API trả về:", data); // Debug API trả về

        if (!data.error) {
          const formattedFavorites = data.map((fav) => fav.id_product); // Lấy đúng sản phẩm
          setFavorites(formattedFavorites);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  const toggleFavorite = async (productId: string) => {
    if (!token) {
      alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      return;
    }

    const isFavorite = favorites.some((fav) => fav._id === productId);
    const result = isFavorite
      ? await removeFavorite(productId, token)
      : await addFavorite(productId, token);

    if (!result.error) {
      setFavorites((prev) =>
        isFavorite
          ? prev.filter((p) => p._id !== productId)
          : [...prev, result.newFavorite] // Thêm trực tiếp sản phẩm mới vào danh sách
      );
      alert(isFavorite ? "Đã xóa khỏi danh sách yêu thích" : "Đã thêm vào danh sách yêu thích");
    }
  };

  return (
    <div className={styles.favoriteContainer}>
      <h2 className={styles.title}>Danh sách yêu thích</h2>
      {favorites.length === 0 ? (
        <p>Chưa có sản phẩm yêu thích.</p>
      ) : (
        <div className={styles.productList}>
          {favorites.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <i
                className={`${styles.favoriteIcon} ${favorites.some((fav) => fav._id === product._id) ? styles.active : ""}`}
                onClick={() => toggleFavorite(product._id)}
              ></i>
              <Image
                src={product.variants[0]?.image.startsWith("http") ? product.variants[0].image : `/images/${product.variants[0]?.image}`} 
                alt={product.name}
                width={150}
                height={150}
                className={styles.productImage}
              />
              <div className={styles.productBody}>
                <h5 className={styles.productTitle}>{product.name}</h5>
                <div className={styles.productFooter}>
                  <p className={styles.productPrice}>{product.variants[0]?.price?.toLocaleString()}₫</p>
                  <button className={styles.btnAdd}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
