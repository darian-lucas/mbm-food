"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { addFavorite, getFavorites, removeFavorite } from "../../services/Favorite";
import styles from "../../styles/Favorite.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCart from "../hooks/useCart"
import Link from "next/link";


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
        alert("vui lòng đăng nhập");
        return;
      }

      try {
        const data = await getFavorites(token);
        console.log("Dữ liệu API trả về:", data);

        if (Array.isArray(data)) {
          const formattedFavorites = data.map((fav) => fav.id_product).filter(Boolean);
          setFavorites(formattedFavorites);
        } else {
          console.error("Dữ liệu API không hợp lệ:", data);
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
          : [...prev, result.newFavorite]
      );
      toast.success(
        isFavorite ? "Đã xóa khỏi danh sách yêu thích" : "Đã thêm vào danh sách yêu thích",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
  };
  const { handleAddToCart } = useCart(); // Lấy hàm thêm vào giỏ hàng từ useCart.ts

  const handleClickAddToCart = (product: Product) => {
    if (!product || product.variants.length === 0) return;

    const selectedVariant = product.variants[0]; // Chọn biến thể đầu tiên
    handleAddToCart(product, selectedVariant, 1); // Mặc định số lượng là 1
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className={`container mt-4 ${styles.favoriteContainer}`}>
      <h2 className="mb-4">Danh sách yêu thích</h2>

      {favorites.length === 0 ? (
        <p className="text-center">Chưa có sản phẩm yêu thích.</p>
      ) : (
        <div className="row">
          {favorites.map((product) => (
            <div key={product._id} className="col-md-3 col-sm-6 mb-4">
              <div className={`card border-1 shadow-sm ${styles.productCard}`}>
                {/* Icon trái tim */}
                <i
                  className={`${styles.favoriteIcon} position-absolute top-0 end-0 p-2`}
                  onClick={() => toggleFavorite(product._id)}
                >
                  <button className="border-0"><Heart size={20} color="#E51735" fill="#E51735" /></button>
                </i>

                {/* Hình ảnh và tiêu đề được bọc trong Link */}
                <Link href={`/product/${product.slug}`} passHref legacyBehavior>
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    {/* Hình ảnh sản phẩm */}
                    {product.variants[0]?.image && (
                      <div className={`${styles.productImageWrapper}`}>
                        <Image
                          src={product.variants[0].image.startsWith("http")
                            ? product.variants[0].image
                            : `http://localhost:3001/images/${product.variants[0].image}`
                          }
                          alt={product.name}
                          width={300}
                          height={300}
                          className={`${styles.productImage}`}
                          priority
                        />
                      </div>
                    )}

                    {/* Tên sản phẩm */}
                    <div className="card-body flex-grow-1 d-flex flex-column p-2">
                      <h5 className={`${styles.productTitle} mb-1`}>{product.name}</h5>
                    </div>
                  </a>
                </Link>

                {/* Mô tả sản phẩm */}
                <div
                  className={`${styles.productDescription}`}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>

                {/* Giá và nút Thêm */}
                <div className={`card-footer bg-white border-0 d-flex justify-content-between align-items-center p-2 ${styles.productFooter}`}>
                  <div>
                    <p className="fw-bold mb-1">Giá chỉ từ</p>
                    <p className="text-danger fw-bold">
                      {product.variants[0]?.price?.toLocaleString()}₫
                    </p>
                  </div>
                  <button className="btn btn-success btn-sm" onClick={() => handleClickAddToCart(product)}>Thêm</button>
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
