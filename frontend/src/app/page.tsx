"use client";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { Heart } from "lucide-react";
import { FaChevronRight } from "react-icons/fa";
export default function Home(): JSX.Element {
  const categories = [
    { name: "Pizza", img: "/images/pizza.png" },
    { name: "Khai Vị", img: "/images/khaivi.png" },
    { name: "Mì Ý", img: "/images/myy.png" },
    { name: "Salad", img: "/images/salad.png" },
    // { name: "Nước Uống", img: "/images/salad.png" },
  ];
  const foodItems = [
    {
      name: "Pizza Hải Sản",
      price: "150.000đ",
      desc: "Pizza hải sản với phô mai thơm ngon.",
      img: "/images/hot1.png",
    },
    {
      name: "Gà Sốt Tỏi",
      price: "120.000đ",
      desc: "Gà chiên giòn phủ sốt tỏi hấp dẫn.",
      img: "/images/hot2.png",
    },
    {
      name: "Mì Ý Sốt Bò",
      price: "135.000đ",
      desc: "Mì Ý thơm ngon với sốt bò đặc biệt.",
      img: "/images/hot3.png",
    },
    {
      name: "Bánh Mì Bò",
      price: "90.000đ",
      desc: "Bánh mì bò với sốt đậm đà.",
      img: "/images/hot4.png",
    },
    {
      name: "Burger Gà",
      price: "85.000đ",
      desc: "Burger gà chiên giòn hấp dẫn.",
      img: "/images/hot5.png",
    },
  ];
  const promoData = [
    { name: "Khuyến mãi 1", img: "/images/promo-1.png" },
    { name: "Khuyến mãi 2", img: "/images/promo-2.png" },
    { name: "Khuyến mãi 3", img: "/images/promo-3.png" },
    { name: "Khuyến mãi 4", img: "/images/promo-4.png" },
  ];
  const discountItems = [
    {
      name: "Gà Giòn Xốt Tương Tỏi Hàn Quốc",
      price: "99.000đ",
      img: "/images/hot1.png",
      description:
        "Những miếng gà tươi ngon tẩm bột chiên giòn phủ xốt tương tỏi kiểu Hàn được chế biến theo công thức đặc biệt pha chút vị the nhè nhẹ và mùi thơm của gừng, tỏi mang đến cảm giác mới lạ khi thưởng thức.",
    },
    {
      name: "Gà Giòn Xốt Hàn - Truyền Thống",
      price: "429.000đ",
      img: "/images/hot1.png",
      description:
        "Những miếng gà tươi ngon tẩm bột chiên giòn phủ xốt tương tỏi kiểu Hàn được chế biến theo công thức đặc biệt pha chút vị the nhè nhẹ và mùi thơm của gừng, tỏi mang đến cảm giác mới lạ khi thưởng thức.",
    },
    {
      name: "Gà Giòn Xốt Hàn - Truyền Thống",
      price: "249.000đ",
      img: "/images/hot1.png",
      description:
        "Những miếng gà tươi ngon tẩm bột chiên giòn phủ xốt tương tỏi kiểu Hàn được chế biến theo công thức đặc biệt pha chút vị the nhè nhẹ và mùi thơm của gừng, tỏi mang đến cảm giác mới lạ khi thưởng thức.",
    },
    {
      name: "Gà Nướng BBQ (2 miếng)",
      price: "99.000đ",
      img: "/images/hot1.png",
      description:
        "Những miếng gà tươi ngon tẩm bột chiên giòn phủ xốt tương tỏi kiểu Hàn được chế biến theo công thức đặc biệt pha chút vị the nhè nhẹ và mùi thơm của gừng, tỏi mang đến cảm giác mới lạ khi thưởng thức.",
    },
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
  const menuItems = [
    {
      name: "Pizza Puff, Gà BBQ Nướng Dứa",
      description:
        "Gà nướng dứa cùng phô mai thơm béo và sốt Thousand Island. 1 Ăn vỏ bánh trước tiên: Nhóm người tạo...",
      price: "99.000đ",
      img: "/images/pizza1.png",
    },
    {
      name: "Pizza Chất - Gà Nướng Dứa",
      description:
        "Hoà quyện vị giác với thịt gà nướng cùng với dứa và nhiều loại phô mai thượng hạng...",
      price: "89.000đ",
      img: "/images/pizza2.png",
    },
    {
      name: "Pizza Chất, Giăm Bông & Thịt Xông Khói",
      description:
        "Vị truyền thống với thịt xông khói và thịt nguội hoà trộn với cà chua, phô mai và sốt béo...",
      price: "89.000đ",
      img: "/images/pizza3.png",
    },
    {
      name: "Pizza Chất, Thanh Cua và Xúc Xích Cocktail",
      description:
        "Sự kết hợp hài hoà phô mai, thịt xông khói với mùi tây, thanh cua và sốt Thousand Island...",
      price: "89.000đ",
      img: "/images/pizza4.png",
    },
  ];
  const newsData = [
    {
      title: "Để bánh pizza mua ở đâu đảm bảo chất lượng?",
      date: "27/02/2024",
      desc: "Nếu bạn muốn tự làm bánh pizza tại nhà thì có thể chọn mua đế bánh pizza để tiết kiệm thời gian hơn...",
      img: "/images/news1.png",
    },
    {
      title: "Cách làm pizza xốt Mayonnaise thơm béo ngon ngất ngây",
      date: "27/02/2024",
      desc: "Các món pizza xốt Mayonnaise luôn góp mặt vào menu “vàng” của chuỗi cửa hàng Dola trên toàn quốc...",
      img: "/images/news2.png",
    },
    {
      title: "Pasta là món ăn của nước nào? Pasta và Spaghetti có gì khác?",
      date: "27/02/2024",
      desc: "Bất kỳ ai đã từng thưởng thức một trong các loại Pasta, chắc hẳn sẽ không thể nào quên được cảm giác...",
      img: "/images/news3.png",
    },
    {
      title: "Tiết lộ tính cách qua cách ăn pizza cực thú vị",
      date: "27/02/2024",
      desc: "1. Ăn vỏ bánh trước tiên: Nhóm người tạo ảnh hưởng, thích sự khác biệt...",
      img: "/images/news4.png",
    },
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
  const [foodFavorites, setFoodFavorites] = useState(
    Array(foodItems.length).fill(false)
  );
  const [discountFavorites, setDiscountFavorites] = useState(
    Array(discountItems.length).fill(false)
  );
  const [bestSellingFavorites, setBestSellingFavorites] = useState(
    Array(bestSellingItems.length).fill(false)
  );
  const [menuFavorites, setMenuFavorites] = useState(
    Array(menuItems.length).fill(false)
  );
  const toggleFoodFavorite = (index: number) => {
    setFoodFavorites((prev) => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  const toggleDiscountFavorite = (index: number) => {
    setDiscountFavorites((prev) => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  const toggleBestSellingFavorite = (index: number) => {
    setBestSellingFavorites((prev) => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  const handleToggleFavorite = (index: number) => {
    setMenuFavorites((prev) => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };
  return (
    <main className={styles.home}>
      {/* Banner */}
      <section className={styles.banner}>
        <Image
          src="/images/banner-1.png"
          alt="Banner chính"
          width={1280}
          height={300}
          className={styles.bannerImage}
        />
      </section>
      {/* Danh mục nổi bật */}
      <section className={styles.section}>
        <h2 className={styles.titlelitter}>Nổi Bật</h2>
        <h2 className={styles.title}>Danh mục nổi bật</h2>
        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <Link key={index} href="#" className={styles.categoryLink}>
              <div className={styles.categoryItem}>
                <p>{category.name}</p>
                <Image
                  src={category.img}
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
          {foodItems.map((food, index) => (
            <SwiperSlide key={index} className={styles.slideItem}>
              <div className={styles.foodItem}>
                {/* Icon trái tim */}
                <button
                  className={styles.heartIcon}
                  onClick={() => toggleFoodFavorite(index)}
                >
                  <Heart
                    size={20}
                    className={
                      foodFavorites[index]
                        ? styles.heartActive
                        : styles.heartInactive
                    }
                  />
                </button>

                <Image
                  src={food.img}
                  alt={food.name}
                  width={250}
                  height={200}
                />
                <h3 className={styles.foodName}>{food.name}</h3>
                <p className={styles.foodDesc}>{food.desc}</p>
                <p className={styles.foodPrice}>
                  Giá chỉ từ: <span>{food.price}</span>
                </p>
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
            {discountItems.map((item, index) => (
              <div key={index} className={styles.discountItem}>
                <button
                  className={styles.favoriteIcon}
                  onClick={() => toggleDiscountFavorite(index)}
                >
                  <Heart
                    size={20}
                    className={
                      discountFavorites[index]
                        ? styles.heartActive
                        : styles.heartInactive
                    }
                  />
                </button>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={250}
                  height={200}
                />
                <h3 className={styles.discountItemName}>{item.name}</h3>
                <p className={styles.discountItemDesc}>{item.description}</p>
                <p className={styles.discountFoodPrice}>
                  Giá chỉ từ: <span>{item.price}</span>
                </p>
                <button className={styles.discountAddButton}>Thêm</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Danh sách bán chạy */}
      <div className={styles.bestSellingWrapper}>
        <h2 className={styles.bestSellingTitle}>Món ăn</h2>
        <span className={styles.bestSellingSubtitle}>Được bán nhiều nhất</span>

        <div className={styles.bestSellingList}>
          {bestSellingItems.map((item, index) => (
            <div key={index} className={styles.bestSellingItem}>
              {item.isNew && (
                <span className={styles.bestSellingNewTag}>Mới</span>
              )}

              <button
                className={styles.bestSellingFavoriteIcon}
                onClick={() => toggleBestSellingFavorite(index)}
              >
                <Heart
                  size={20}
                  className={
                    bestSellingFavorites[index]
                      ? styles.heartActive
                      : styles.heartInactive
                  }
                />
              </button>

              <Image src={item.img} alt={item.name} width={230} height={200} />

              <h3 className={styles.bestSellingItemName}>{item.name}</h3>
              <p className={styles.bestSellingItemDesc}>{item.description}</p>
              <p className={styles.bestSellingFoodPrice}>
                Giá chỉ từ: <span>{item.price}</span>
              </p>

              <button className={styles.bestSellingAddButton}>Thêm</button>
            </div>
          ))}
        </div>
      </div>
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
      <section className={styles.menufoodContainer}>
        <div className={styles.menufoodsubtitle}>Tất cả</div>
        <h2 className={styles.menufoodTitle}>Menu dành cho bạn</h2>

        <div className={styles.menufoodTabs}>
          {categories.map((category, index) => (
            <div key={index} className={styles.menufoodTab}>
              {category.name}
            </div>
          ))}
        </div>

        <h3 className={styles.menufoodCategoryTitle}>Pizza</h3>

        <div className={styles.menufoodGrid}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menufoodCard}>
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className={styles.menufoodImage}
              />
              <div className={styles.menufoodContent}>
                <h4 className={styles.menufoodItemName}>{item.name}</h4>
                <p className={styles.menufoodItemDesc}>{item.description}</p>
                <p className={styles.menufoodPrice}>
                  Giá chỉ từ: <span>{item.price}</span>
                </p>
                <div className={styles.menufoodActions}>
                  <a href="#" className={styles.menufoodMore}>
                    Xem thêm
                  </a>
                  <button className={styles.menufoodAdd}>Thêm</button>
                </div>
              </div>
              <button
                className={styles.menufoodFavorite}
                onClick={() => handleToggleFavorite(index)}
              >
                <Heart
                  size={20}
                  className={
                    menuFavorites[index]
                      ? styles.heartActive
                      : styles.heartInactive
                  }
                />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.menufoodViewMore}>
          Xem chi tiết &raquo;
        </button>

        <h3 className={styles.menufoodCategoryTitle}>Pizza</h3>
        <div className={styles.menufoodGrid}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menufoodCard}>
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className={styles.menufoodImage}
              />
              <div className={styles.menufoodContent}>
                <h4 className={styles.menufoodItemName}>{item.name}</h4>
                <p className={styles.menufoodItemDesc}>{item.description}</p>
                <p className={styles.menufoodPrice}>
                  Giá chỉ từ: <span>{item.price}</span>
                </p>
                <div className={styles.menufoodActions}>
                  <a href="#" className={styles.menufoodMore}>
                    Xem thêm
                  </a>
                  <button className={styles.menufoodAdd}>Thêm</button>
                </div>
              </div>
              <button
                className={styles.menufoodFavorite}
                onClick={() => handleToggleFavorite(index)}
              >
                <Heart
                  size={20}
                  className={
                    menuFavorites[index]
                      ? styles.heartActive
                      : styles.heartInactive
                  }
                />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.menufoodViewMore}>
          Xem chi tiết &raquo;
        </button>

        <h3 className={styles.menufoodCategoryTitle}>Pizza</h3>
        <div className={styles.menufoodGrid}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menufoodCard}>
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className={styles.menufoodImage}
              />
              <div className={styles.menufoodContent}>
                <h4 className={styles.menufoodItemName}>{item.name}</h4>
                <p className={styles.menufoodItemDesc}>{item.description}</p>
                <p className={styles.menufoodPrice}>
                  Giá chỉ từ: <span>{item.price}</span>
                </p>
                <div className={styles.menufoodActions}>
                  <a href="#" className={styles.menufoodMore}>
                    Xem thêm
                  </a>
                  <button className={styles.menufoodAdd}>Thêm</button>
                </div>
              </div>
              <button
                className={styles.menufoodFavorite}
                onClick={() => handleToggleFavorite(index)}
              >
                <Heart
                  size={20}
                  className={
                    menuFavorites[index]
                      ? styles.heartActive
                      : styles.heartInactive
                  }
                />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.menufoodViewMore}>
          Xem chi tiết &raquo;
        </button>

        <h3 className={styles.menufoodCategoryTitle}>Pizza</h3>
        <div className={styles.menufoodGrid}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menufoodCard}>
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className={styles.menufoodImage}
              />
              <div className={styles.menufoodContent}>
                <h4 className={styles.menufoodItemName}>{item.name}</h4>
                <p className={styles.menufoodItemDesc}>{item.description}</p>
                <p className={styles.menufoodPrice}>
                  Giá chỉ từ: <span>{item.price}</span>
                </p>
                <div className={styles.menufoodActions}>
                  <a href="#" className={styles.menufoodMore}>
                    Xem thêm
                  </a>
                  <button className={styles.menufoodAdd}>Thêm</button>
                </div>
              </div>
              <button
                className={styles.menufoodFavorite}
                onClick={() => handleToggleFavorite(index)}
              >
                <Heart
                  size={20}
                  className={
                    menuFavorites[index]
                      ? styles.heartActive
                      : styles.heartInactive
                  }
                />
              </button>
            </div>
          ))}
        </div>

        <button className={styles.menufoodViewMore}>
          Xem chi tiết &raquo;
        </button>
      </section>
      <section className={styles.newsSection}>
        <h3 className={styles.subTitle}>Tin tức</h3>
        <h2 className={styles.mainTitle}>Tin tức mới nhất</h2>
        <div className={styles.newsList}>
          {newsData.map((news, index) => (
            <div key={index} className={styles.newsItem}>
              <Image
                src={news.img}
                alt={news.title}
                width={300}
                height={200}
                className={styles.newsImg}
              />
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsDate}>{news.date}</p>
                <p className={styles.newsDesc}>{news.desc}</p>
                <Link href="#">Đọc tiếp</Link>
              </div>
            </div>
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
            src="/images/user1.jpg"
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
          <button className={styles.danhgiaNext}>
            <FaChevronRight />
          </button>
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
          <Image src="/images/left-image.png" alt="Decor" width={300} height={250} />
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
          <Image src="/images/right-image.png" alt="Pizza" width={300} height={300} />
        </div>
      </section>
    </main>
  );
}
