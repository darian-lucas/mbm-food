"use client";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  addFavorite,
  removeFavorite,
  checkFavorite,
  // getFavorites,
} from "../services/Favorite";
// import { FaChevronRight } from "react-icons/fa";
interface Category {
  _id: string;
  name: string;
  image: string;
}
interface Product {
  _id: string;
  name: string;
  idcate: string;
  description: string;
  variants: { price: number; image: string; sale_price?: number }[];
  hot?: number;
}
interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  imageSummary?: string;
  create_at: string;
  status: number;
  author: string;
  view: number;
  hot: number;
}

export default function Home(): JSX.Element {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;
  
  const [token, setToken] = useState<string | null>(null);

  // const [menuFavorites, setMenuFavorites] = useState<Record<string, boolean>>(
  //   {}
  // );
  const handleScrollToCategory = (categoryId: string) => {
    const section = document.getElementById(categoryId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        const data = await response.json();

        // console.log("Dữ liệu từ API:", data);

        if (data && Array.isArray(data.data)) {
          setCategories(data.data.slice(0, 5));
        } else {
          console.error("Dữ liệu từ API không đúng định dạng mong đợi:", data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");

        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setProducts(data.data); // Lưu danh sách sản phẩm

          if (token) {
            // Kiểm tra trạng thái yêu thích với user từ token
            const favoriteStatus: { [key: string]: boolean } = {};
            await Promise.all(
              data.data.map(async (product) => {
                const result = await checkFavorite(product._id, token);
                favoriteStatus[product._id] = result?.isFavorite || false;
              })
            );
            setFavorites(favoriteStatus);
          }
        } else {
          console.error("Dữ liệu từ API không đúng định dạng mong đợi:", data);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [token]); // Cập nhật lại nếu token thay đổi
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  // Toggle trạng thái yêu thích
  const toggleFavorite = async (food_id: string) => {
    if (!token) {
      alert("Bạn cần đăng nhập để yêu thích sản phẩm!");
      return;
    }

    const newFavorites = { ...favorites };

    if (favorites[food_id]) {
      await removeFavorite(food_id, token);
      newFavorites[food_id] = false;
      alert("❌ Đã xóa sản phẩm khỏi danh sách yêu thích!");
    } else {
      await addFavorite(food_id, token);
      newFavorites[food_id] = true;
      alert("✅ Đã thêm sản phẩm vào danh sách yêu thích!");
    }

    setFavorites(newFavorites);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        const result = await response.json();

        if (result && Array.isArray(result.posts)) {
          setNewsData(result.posts); // Lấy danh sách `posts` từ kết quả API
        } else {
          console.error("Dữ liệu từ API không đúng định dạng:", result);
        }
      } catch (error) {
        console.error("Lỗi khi tải tin tức:", error);
      }
    };

    fetchNews();
  }, []);

  ///sản phẩm yêu thích

  const promoData = [
    { name: "Khuyến mãi 1", img: "/images/promo-1.png" },
    { name: "Khuyến mãi 2", img: "/images/promo-2.png" },
    { name: "Khuyến mãi 3", img: "/images/promo-3.png" },
    { name: "Khuyến mãi 4", img: "/images/promo-4.png" },
  ];
  const bestSellingItems = [
    {
      img: "/images/hot2.png",
      name: "Gà Giòn Xốt Tương Tỏi Hàn Quốc",
      description:
        "Những miếng gà tươi ngon tẩm bột chiên giòn phủ xốt tương tỏi...",
      price: "85.000đ",
      isNew: false,
    },
    {
      img: "/images/hot2.png",
      name: "Gà Giòn Xốt Hàn - Truyền Thống",
      description:
        "Gà tẩm bột chiên giòn rụm phủ lớp xốt (có chút vị cay rất nhẹ)...",
      price: "85.000đ",
      isNew: false,
    },
    {
      img: "/images/hot2.png",
      name: "Gà Giòn Xốt Hàn - Truyền Thống",
      description:
        "Gà tẩm bột chiên giòn rụm phủ lớp xốt (có chút vị cay rất nhẹ)...",
      price: "85.000đ",
      isNew: false,
    },
    {
      img: "/images/hot2.png",
      name: "Gà Nướng BBQ (2 miếng)",
      description:
        "Thịt gà mềm ngọt, thấm đẫm gia vị, da gà giòn rụm, màu vàng...",
      price: "85.000đ",
      isNew: false,
    },
    {
      img: "/images/hot2.png",
      name: "Pizza Puff_Gà BBQ Nướng",
      description: "Gà nướng dứa cùng phô mai thơm béo và sốt Thousand...",
      price: "85.000đ",
      isNew: false,
    },
  ];
  const specialBannerImages = [
    { base: "/images/bannereff1.png", overlay: "/images/bannereff4.png" },
    { base: "/images/bannereff2.png", overlay: "/images/bannereff5.png" },
    { base: "/images/bannereff3.png", overlay: "/images/bannereff6.png" },
  ];
  const reasons = [
    {
      img: "/images/quality.png",
      text: "Chất lượng món ăn hàng đầu",
    },
    {
      img: "/images/customer-service.png",
      text: "Dịch vụ chăm sóc khách hàng xuất sắc",
    },
    {
      img: "/images/menu.png",
      text: "Menu đa dạng phong cách",
    },
    {
      img: "/images/ingredients.png",
      text: "Chất lượng nguyên liệu cao cấp",
    },
    {
      img: "/images/promotion.png",
      text: "Ưu đãi và khuyến mãi hấp dẫn",
    },
  ];
  // const hotFoodItems = products.filter((food) => food.hot === 1);
  // const [foodFavorites, setFoodFavorites] = useState(
  //   Array(hotFoodItems.length).fill(false)
  // );
  const discountItems = products
    .filter((product) =>
      product.variants.some(
        (variant) => variant.sale_price && variant.sale_price > 0
      )
    )
    .slice(0, 4);

  // const [discountFavorites, setDiscountFavorites] = useState<boolean[]>(
  //   Array(discountItems.length).fill(false)
  // );
  // const [bestSellingFavorites, setBestSellingFavorites] = useState(
  //   Array(bestSellingItems.length).fill(false)
  // );
  // const toggleFoodFavorite = (index: number) => {
  //   setFoodFavorites((prev) => {
  //     const newFavorites = [...prev];
  //     newFavorites[index] = !newFavorites[index];
  //     return newFavorites;
  //   });
  // };

  // const toggleDiscountFavorite = (index: number) => {
  //   setDiscountFavorites((prev) => {
  //     const newFavorites = [...prev];
  //     newFavorites[index] = !newFavorites[index];
  //     return newFavorites;
  //   });
  // };

  // const toggleBestSellingFavorite = (index: number) => {
  //   setBestSellingFavorites((prev) => {
  //     const newFavorites = [...prev];
  //     newFavorites[index] = !newFavorites[index];
  //     return newFavorites;
  //   });
  // };

  // const handleToggleFavorite = (productId: string) => {
  //   setMenuFavorites((prev) => ({
  //     ...prev,
  //     [productId]: !prev[productId],
  //   }));
  // };
  
  

  return (
    <main className={styles.home}>
      {/* Banner */}
      <section className={styles.banner}>
        <Link href="/product">
          <Image
            src="/images/banner-1.png"
            alt="Banner chính"
            width={1280}
            height={500}
            priority
            className={styles.bannerImage}
          />
        </Link>
      </section>
      {/* Danh mục nổi bật */}
      <section className={styles.section}>
        <h2 className={styles.titlelitter}>Nổi Bật</h2>
        <h2 className={styles.title}>Danh mục nổi bật</h2>
        <div className={styles.categoryList}>
          {categories.slice(0, 4).map((category) => (
            <Link key={category._id} href="#" className={styles.categoryLink}>
              <div className={styles.categoryItem}>
                <p>{category.name}</p>
                <Image
                  src={`${API_URL}/images/${category.image}`}
                  alt={category.name}
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      ;{/* Giới thiệu */}
      <section className={styles.about}>
        <div className={styles.aboutContainer}>
          {/* Hình lớn bên trái */}
          <div className={styles.aboutImage}>
            <Image
              src="/images/pizza0.png"
              alt="MBM Food"
              width={403}
              height={403}
            />
          </div>

          {/* Nội dung bên phải */}
          <div className={styles.aboutContent}>
            <h3 className={styles.aboutSubtitle}>Về Chúng Tôi</h3>
            <h2 className={styles.aboutTitle}>MBM Food</h2>
            <p className={styles.aboutText}>
              Chào mừng bạn đến với MBM Food - điểm đến lý tưởng cho những người
              yêu thương thức pizza tại thành phố! MBM Food tự hào là địa chỉ
              pizza hàng đầu, nổi tiếng với chất lượng món ăn tuyệt vời, dịch vụ
              tận tâm và mức độ hài lòng cao từ phía khách hàng.
            </p>

            {/* Danh sách hình nhỏ */}
            <div className={styles.imageGallery}>
              <div className={styles.galleryItem}>
                <Image
                  src="/images/pizza1.png"
                  alt="Pizza 1"
                  width={201}
                  height={201}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/images/pizza2.png"
                  alt="Pizza 2"
                  width={201}
                  height={201}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/images/pizza3.png"
                  alt="Pizza 3"
                  width={201}
                  height={201}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/images/pizza4.png"
                  alt="Pizza 4"
                  width={201}
                  height={201}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Món ăn nổi bật */}
      <section className={styles.section}>
        <h2 className={styles.TitleHot}>Món ăn nổi bật</h2>
        <Swiper
          className={styles.customSwiper}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 2 },
          }}
        >
          {products
            .filter((product) => product.hot === 1) // Lọc sản phẩm có hot === 1
            .map((food, index) => (
              <SwiperSlide key={food._id} className={styles.slideItem}>
                <div className={styles.foodItem}>
                <button
                    className={styles.heartIcon}
                    onClick={async () => {
                      await toggleFavorite(food._id);
                    }}
                  >
                    <Heart
                      size={20}
                      className={
                        favorites[food._id]
                          ? styles.heartActive
                          : styles.heartInactive
                      }
                    />
                  </button>
                  <Image
                    src={`${API_URL}/images/${food.variants[0]?.image || "default.png"}`}
                    alt={food.name}
                    width={150}
                    height={140}
                  />
                  <div className={styles.foodContent}>
                    <h3 className={styles.foodName}>{food.name}</h3>
                    <p
                      className={styles.foodDesc}
                      dangerouslySetInnerHTML={{
                        __html: food.description || "Không có mô tả",
                      }}
                    />
                    <p className={styles.viewMore}>Xem thêm</p>
                    <p className={styles.foodPriceLabel}>Giá chỉ từ: </p>
                    <span className={styles.foodPrice}>
                      {food.variants[0]?.price.toLocaleString() || "Liên hệ"}đ
                    </span>
                  </div>
                  <button className={styles.addButton}>Thêm</button>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      {/* Chương trình khuyến mãi */}
      <section className={styles.section}>
        {/* Tiêu đề nhỏ "Chương trình" */}
        <h3 className={styles.subTitle}>Chương trình</h3>

        {/* Tiêu đề lớn "Các chương trình nổi bật" */}
        <h2 className={styles.title}>Các chương trình nổi bật</h2>

        <div className={styles.promoList}>
          {promoData.map((promo, index) => (
            <div key={index} className={styles.promoItem}>
              <Image
                src={promo.img}
                alt={promo.name}
                width={280} // Nhỏ hơn container để tạo khoảng trắng
                height={180} // Tỉ lệ nhỏ hơn hình gốc
                className={styles.promoImage}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Món ăn đang giảm giá */}
      <section className={styles.discountSection}>
        {/* Phần trên: Chia thành 2 cột (Text bên trái, banner bên phải) */}
        <div className={styles.discountHeader}>
          {/* Bên trái: Text */}
          <div className={styles.discountContent}>
            <h3 className={styles.discountSubTitle}>Món ăn</h3>
            <h2 className={styles.discountTitle}>Đang được giảm giá</h2>
            <p className={styles.discountDescription}>
              Chúng tôi thường xuyên cập nhật những chương trình khuyến mãi để
              quý khách có thể trải nghiệm tất cả món ăn của chúng tôi.
            </p>
            <p className={styles.discountEndText}>
              Chương trình đã kết thúc, hẹn gặp lại trong thời gian sớm nhất!
            </p>
          </div>

          {/* Bên phải: Banner */}
          <div className={styles.discountBanner}>
            <Image
              src="/images/banner-discount.png"
              alt="Pizza ngon"
              width={350}
              height={280}
            />
          </div>
        </div>
      </section>
      <section className={styles.discountproductSection}>
        <div className={styles.discountWrapper}>
          <div className={styles.discountList}>
            {discountItems.map((item, index) => {
              const variant = item.variants[0]; // Lấy biến thể đầu tiên
              return (
                <div key={item._id} className={styles.discountItem}>
                  <button
                    className={styles.heartIcon}
                    onClick={async () => {
                      await toggleFavorite(item._id);
                    }}
                  >
                    <Heart
                      size={20}
                      className={
                        favorites[item._id]
                          ? styles.heartActive
                          : styles.heartInactive
                      }
                    />
                  </button>
                  <Image
                    src={`${API_URL}/images/${variant.image}`}
                    alt={item.name}
                    width={250}
                    height={200}
                  />
                  <h3 className={styles.discountItemName}>{item.name}</h3>
                  <p
                    className={styles.discountItemDesc}
                    dangerouslySetInnerHTML={{
                      __html: item.description || "Không có mô tả",
                    }}
                  ></p>
                  <Link href="#" className={styles.menufoodMore}>
                    Xem thêm
                  </Link>
                  <div className={styles.discountPriceContainer}>
                    <div className={styles.discountFoodPrice}>
                      <p>Giá chỉ từ:</p>
                      <span>
                        {variant.sale_price
                          ? `${variant.sale_price.toLocaleString()}đ`
                          : `${variant.price.toLocaleString()}đ`}
                      </span>
                    </div>
                    <button className={styles.discountAddButton}>Thêm</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Danh sách bán chạy */}
      <section className="styles.bestSelling">
        <div className={styles.bestSellingWrapper}>
          <h2 className={styles.bestSellingTitle}>Món ăn</h2>
          <span className={styles.bestSellingSubtitle}>
            Được bán nhiều nhất
          </span>
          {/*cần thêm tính năng yêu thích khi bestSelling dc gọi bằng api*/}
          <div className={styles.bestSellingList}>
            {bestSellingItems.map((item, index) => (
              <div key={index} className={styles.bestSellingItem}>
                {item.isNew && (
                  <span className={styles.bestSellingNewTag}>Mới</span>
                )}

                <button
                  className={styles.heartIcon}
                  onClick={async () => {
                    await toggleFavorite(item._id);
                  }}
                >
                  <Heart
                    size={20}
                    className={
                      favorites[item._id]
                        ? styles.heartActive
                        : styles.heartInactive
                    }
                  />
                </button>

                <Image
                  src={item.img}
                  alt={item.name}
                  width={230}
                  height={200}
                />

                <h3 className={styles.bestSellingItemName}>{item.name}</h3>
                <p className={styles.bestSellingItemDesc}>{item.description}</p>
                <Link href="#" className={styles.menufoodMore}>
                  Xem thêm
                </Link>
                <div className={styles.bestSellingContainer}>
                  <div className={styles.bestSellingFoodPrice}>
                    <p>Giá chỉ từ:</p>
                    <span>{item.price}</span>
                  </div>
                  <button className={styles.bestSellingAddButton}>Thêm</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="styles.specialBanner">
        <div className={styles.specialBannerContainer}>
          {specialBannerImages.map((banner, index) => (
            <div key={index} className={styles.specialBannerItem}>
              {/* Hình nền chính */}
              <Image
                src={banner.base}
                alt={`Banner ${index + 1}`}
                width={350}
                height={200}
                className={styles.specialBannerBase}
              />
              {/* Hình hiệu ứng đè lên */}
              <Image
                src={banner.overlay}
                alt={`Effect ${index + 1}`}
                width={350}
                height={200}
                className={`${styles.specialBannerOverlay} ${
                  styles[`overlay${index}`]
                }`}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Menu */}
      <section className={styles.menufoodContainer}>
        <div className={styles.menufoodsubtitle}>Tất cả</div>
        <h2 className={styles.menufoodTitle}>Menu dành cho bạn</h2>

        <div className={styles.menufoodTabs}>
          {categories.slice(0, 5).map((category) => (
            <div
              key={category._id}
              className={styles.menufoodTab}
              onClick={() => handleScrollToCategory(category._id)}
            >
              {category.name}
            </div>
          ))}
        </div>

        {categories.map((category) => {
          const filteredProducts = products
            .filter((product) => product.idcate === category._id)
            .slice(0, 4);

          return (
            <div key={category._id} id={category._id}>
              <h3 className={styles.menufoodCategoryTitle}>{category.name}</h3>
              <div className={styles.menufoodGrid}>
                {filteredProducts.map((item) => (
                  <div key={item._id} className={styles.menufoodCard}>
                    <Image
                      src={`${API_URL}/images/${
                        item.variants[0]?.image || "default.png"
                      }`}
                      alt={item.name}
                      width={100}
                      height={70}
                      className={styles.menufoodImage}
                    />
                    <div className={styles.menufoodContent}>
                      <h4 className={styles.menufoodItemName}>{item.name}</h4>
                      <p
                        className={styles.menufoodItemDesc}
                        dangerouslySetInnerHTML={{
                          __html: item.description || "Không có mô tả",
                        }}
                      ></p>
                      <p className={styles.menufoodPrice}>
                        Giá chỉ từ:{" "}
                        <span>
                          {item.variants[0]?.price
                            ? item.variants[0].price.toLocaleString() + "đ"
                            : "Liên hệ"}
                        </span>
                      </p>
                      <div className={styles.menufoodActions}>
                        <Link href="#" className={styles.menufoodMore}>
                          Xem thêm
                        </Link>
                        <button className={styles.menufoodAdd}>Thêm</button>
                      </div>
                    </div>
                    <button
                      className={styles.heartIcon}
                      onClick={async () => {
                        await toggleFavorite(item._id);
                      }}
                    >
                      <Heart
                        size={20}
                        className={
                          favorites[item._id]
                            ? styles.heartActive
                            : styles.heartInactive
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <button className={styles.menufoodViewMore}>
          Xem chi tiết &raquo;
        </button>
      </section>
      <section className={styles.newsSection}>
        <h3 className={styles.subTitle}>Tin tức</h3>
        <h2 className={styles.mainTitle}>Tin tức mới nhất</h2>
        <div className={styles.newsList}>
          {newsData.map((news) => (
            <Link
              href={`/news/${encodeURIComponent(news.slug)}`}
              key={news._id}
              className={styles.newsLink}
            >
              <div className={styles.newsItem}>
                {news.imageSummary && (
                  <div className={styles.newsImgWrapper}>
                    <div
                      dangerouslySetInnerHTML={{ __html: news.imageSummary }}
                    />
                  </div>
                )}

                <div className={styles.newsContent}>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsDate}>
                    {new Date(news.create_at).toLocaleDateString("vi-VN")}
                  </p>
                  <p
                    className={styles.newsDesc}
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                  <button
                    onClick={() =>
                      router.push(`/news/${encodeURIComponent(news.slug)}`)
                    }
                    className={styles.readMore}
                  >
                    Đọc tiếp
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.danhgiaSection}>
        <div className={styles.danhgiaContent}>
          <h2>Khách hàng nói gì về chúng tôi</h2>
          <p>
            Chúng tôi cung cấp cho bạn cách chuẩn bị bữa ăn hoàn chỉnh, bao gồm
            các nguyên liệu cần thiết được đóng gói sẵn cho một bữa tối thân
            thánh cũng như hướng dẫn công thức nấu ăn dễ làm theo một cách đẹp
            mắt.
          </p>
          <div className={styles.danhgiaStats}>
            <div className={styles.stat}>
              <span>12+</span>
              <p>Cửa hàng</p>
            </div>
            <div className={styles.stat}>
              <span>200+</span>
              <p>Nhân viên</p>
            </div>
            <div className={styles.stat}>
              <span>5000+</span>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>

        <div className={styles.danhgiaCard}>
          <Image
            src="/images/danhgia_1.webp"
            alt="Hoàng Dung"
            width={60}
            height={60}
            className={styles.avatar}
          />
          <div className={styles.danhgiaText}>
            <h3>Hoàng Dung</h3>
            <p className={styles.danhgiaRole}>Nhân viên văn phòng</p>
            <p className={styles.danhgiaComment}>
              Các món ăn ở MBM Food đều rất ngon. Con tôi cũng rất thích, mỗi
              tuần đều dẫn con tôi đến đây ăn. Không những ngon mà không gian
              còn rất thoải mái.
            </p>
          </div>
          {/* <button className={styles.danhgiaNext}>
            <FaChevronRight />
          </button> */}
        </div>
      </section>
      <section className={styles["lydo-section"]}>
        <p className={styles["lydo-subtitle"]}>Lý do</p>
        <h2 className={styles["lydo-title"]}>Tại sao chọn MBM Food?</h2>
        <div className={styles["lydo-grid"]}>
          {reasons.map((item, index) => (
            <div key={index} className={styles["lydo-item"]}>
              <div className={styles["lydo-iconWrapper"]}>
                <Image src={item.img} alt={item.text} width={80} height={80} />
              </div>
              <p className={styles["lydo-text"]}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Đăng ký nhận tin */}
      <section className={styles.subscribe}>
        {/* Hình ảnh bên trái */}
        <div className={styles.imageLeft}>
          <Image
            src="/images/left-image.png"
            alt="Decor"
            width={300}
            height={250}
          />
        </div>

        {/* Nội dung chính */}
        <div className={styles.content}>
          <h2>Đăng ký nhận tin</h2>
          <p>
            Nhập email của bạn và nhận nhiều chương trình ưu đãi hấp dẫn từ cửa
            hàng!
          </p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="Nhập email nhận tin khuyến mãi" />
            <button>ĐĂNG KÝ</button>
          </div>
        </div>

        {/* Hình ảnh bên phải */}
        <div className={styles.imageRight}>
          <Image
            src="/images/right-image.png"
            alt="Pizza"
            width={300}
            height={300}
          />
        </div>
      </section>
    </main>
  );
}
