"use client";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import PizzaList from "../components/layout/PizzaList";
import KhaiviList from "../components/layout/KhaiviList";
import MiyList from "../components/layout/MiyList";
import SaladList from "../components/layout/SaladList";


interface Category {
  _id: string;
  name: string;
  image: string;
}
export default function PageProduct(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
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
   return (
    <main className={styles.home}>
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
                  src={`/images/${category.image}`}
                  alt={category.name}
                  width={50}
                  height={50}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
{/* PIZZA */}
      <section>
        <h2 className={styles.title}>PIZZA</h2>
        <PizzaList/>
      </section>
{/* KHAI VỊ */}
      <br />
      <section>
        <h2 className={styles.title}>KHAI VỊ</h2>
        <KhaiviList/>
      </section>

{/* MÌ Ý */}
      <br />
      <section>
        <h2 className={styles.title}>MÌ Ý</h2>
        <MiyList/>
      </section>

{/* SALAD */}
      <br />
      <section>
        <h2 className={styles.title}>SALAD</h2>
        <SaladList/>
      </section>
    </main>
  );
}


