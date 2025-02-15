"use client";
import styles from "/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <main className={styles.home}>
      {/* Danh mục nổi bật */}
      <section className={styles.section}>
        <h2>Danh mục nổi bật</h2>
        <div className={styles.categoryList}>
          {["Pizza", "Gà rán", "Mì Ý"].map((category, index) => (
            <Link key={index} href="#">
              <div className={styles.categoryItem}>{category}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Giới thiệu */}
      <section className={styles.about}>
        <h2>Dola Food</h2>
        <p>
          Dola Food chuyên phục vụ các món ăn ngon với công thức chuẩn vị và
          nguyên liệu tươi ngon. Hãy đến và trải nghiệm ngay!
        </p>
        <Image src="/images/about-food.jpg" alt="Dola Food" width={600} height={300} />
      </section>

      {/* Món ăn nổi bật */}
      <section className={styles.section}>
        <h2>Món ăn nổi bật</h2>
        <div className={styles.foodList}>
          {[
            { name: "Pizza Hải Sản", price: "150.000đ" },
            { name: "Gà Sốt Tỏi", price: "120.000đ" },
          ].map((food, index) => (
            <div key={index} className={styles.foodItem}>
              <Image src="/images/sample-food.jpg" alt={food.name} width={150} height={150} />
              <h3>{food.name}</h3>
              <p>{food.price}</p>
              <button>Mua ngay</button>
            </div>
          ))}
        </div>
      </section>

      {/* Tin tức mới nhất */}
      <section className={styles.section}>
        <h2>Tin tức mới nhất</h2>
        <div className={styles.newsList}>
          {[
            { title: "Ưu đãi 50% cho khách hàng mới", date: "10/02/2025" },
            { title: "Khai trương chi nhánh mới", date: "15/02/2025" },
          ].map((news, index) => (
            <div key={index} className={styles.newsItem}>
              <h3>{news.title}</h3>
              <p>{news.date}</p>
              <Link href="#">Đọc tiếp</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Đăng ký nhận tin */}
      <section className={styles.subscribe}>
        <h2>Đăng ký nhận tin</h2>
        <p>Nhập email của bạn để nhận thông tin khuyến mãi và ưu đãi từ Dola Food.</p>
        <div className={styles.subscribeForm}>
          <input type="email" placeholder="Nhập email của bạn" />
          <button>Đăng ký</button>
        </div>
      </section>
    </main>
  );
}
