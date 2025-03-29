import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/ProductListCate.module.css";
import { addFavorite, removeFavorite, checkFavorite } from "@/services/Favorite";
import QuickView from "../layout/QuickView";

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

interface ProductListProps {
  idcate: string;
  showAll?: boolean;
  minPrice?: number;
  maxPrice?: number;
  selectedSize?: string | null;
  sortOption?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
}

const ProductListCate = ({
  idcate,
  showAll = false,
  minPrice,
  maxPrice,
  selectedSize,
  sortOption = "newest",
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [token, setToken] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:3001/api/products/categories/${idcate}`;
        const queryParams = new URLSearchParams();

        if (minPrice !== undefined) queryParams.append("minPrice", String(minPrice));
        if (maxPrice !== undefined) queryParams.append("maxPrice", String(maxPrice));
        if (queryParams.toString()) url += `?${queryParams.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        let filteredProducts: Product[] = data.data;

        // Lọc theo size nếu có
        if (selectedSize) {
          filteredProducts = filteredProducts.filter((product) =>
            product.variants.some((variant) => variant.option === selectedSize)
          );
        }

        // **Áp dụng sắp xếp theo sortOption**
        switch (sortOption) {
          case "price-asc":
            filteredProducts.sort((a, b) => a.variants[0].price - b.variants[0].price);
            break;
          case "price-desc":
            filteredProducts.sort((a, b) => b.variants[0].price - a.variants[0].price);
            break;
          case "name-asc":
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "newest":
            filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          default:
            break;
        }

        setProducts(showAll ? filteredProducts : filteredProducts.slice(0, 10));

        if (token) {
          const favoriteStatuses: { [key: string]: boolean } = {};
          await Promise.all(
            filteredProducts.map(async (product) => {
              const result = await checkFavorite(product._id, token);
              favoriteStatuses[product._id] = result?.isFavorite || false;
            })
          );
          setFavorites(favoriteStatuses);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [token, idcate, minPrice, maxPrice, selectedSize, sortOption]);

  const toggleFavorite = async (id: string) => {
    if (!token) {
      toast.warning("⚠ Bạn cần đăng nhập để yêu thích sản phẩm!");
      return;
    }

    try {
      if (favorites[id]) {
        await removeFavorite(id, token);
        toast.error("Đã xóa sản phẩm khỏi danh sách yêu thích!");
      } else {
        await addFavorite(id, token);
        toast.success("Đã thêm sản phẩm vào danh sách yêu thích!");
      }
      setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      toast.error("⚠ Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;

  return (
    <div className={styles.container}>
      <section className={styles.sectionProduct}>
        <div className={styles.rowFix}>
          {products.map((item) => (
            <div className={styles.colFix} key={item._id}>
              <div className={styles.productAction}>
                <div className={styles.productThumnail}>
                  <Link href={`/product/${item.slug}`} className={styles.imageThum}>
                    <Image
                      className={styles.img}
                      src={`${API_URL}/images/${item.variants[0].image}`}
                      alt={item.name}
                      width={234}
                      height={234}
                    />
                  </Link>
                  <button className={styles.whistList} onClick={() => toggleFavorite(item._id)}>
                    <Heart
                      size={20}
                      color={favorites[item._id] ? "#E51735" : "gray"}
                      fill={favorites[item._id] ? "#E51735" : "transparent"}
                    />
                  </button>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>
                    <Link href={`/product/${item.slug}`} className={styles.productName}>
                      {item.name}
                    </Link>
                  </h3>
                  <div className={styles.productContent}>
                    <span className={styles.ProductDesc} dangerouslySetInnerHTML={{ __html: item.description }} />
                    <Link href={`/product/${item.slug}`}>Xem thêm</Link>
                  </div>
                  <div className={styles.groupForm}>
                    <div className={styles.priceBox}>
                      <span>Giá chỉ từ: </span> {item.variants[0].price.toLocaleString()}₫
                    </div>
                    <button className={styles.add} onClick={() => setSelectedProduct(item)}>
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedProduct && <QuickView product={{ ...selectedProduct, id: selectedProduct._id }} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default ProductListCate;
