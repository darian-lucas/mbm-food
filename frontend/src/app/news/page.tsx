"use client";

import Image from "next/image";
import "./new.css";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  create_at: string | number;
  summary: string;
  imageSummary?: string;
}

export default function New() {
  const [laytintuc, ganLaytintuc] = useState<Post[]>([]);
  const [tintucNoibat, ganTintucNoibat] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu!");
        const data: Post[] = await response.json();

        ganLaytintuc(data);
        ganTintucNoibat(data.slice(0, 4)); // Lấy 4 bài viết đầu tiên làm tin tức nổi bật
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="about-container">
      <section className="bread-crumb">
        <div className="container">
          <ul className="breadcrumb">
            <li className="home">
              <a href="/">
                <span>Trang chủ</span>
              </a>
            </li>
            <li className="mr_lr">
              <svg width="10" height="10" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li>
              <strong>
                <span>Tin tức</span>
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <div className="blog_wrapper layout">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="list-blogs">
                <div className="row row-fix">
                  {laytintuc.map((tintuc) => (
                    <div className="col-fix" key={tintuc.id}>
                      <div className="item-blog">
                        <div className="block-thumb">
                          <a href="#">
                            <Image
                              src={tintuc.imageSummary || "/images/default.png"}
                              alt={tintuc.title}
                              width={940}
                              height={640}
                              unoptimized
                            />
                          </a>
                        </div>
                        <div className="block-content">
                          <h3>
                            <a href="#">{tintuc.title}</a>
                          </h3>
                          <div className="time-post">
                            {new Date(tintuc.create_at).toLocaleDateString()}
                          </div>
                          <p>{tintuc.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bên phải: Danh mục & Tin tức nổi bật */}
            <div className="col-xl-4">
              <div className="aside-section">
                <h2 className="aside-title">Danh mục tin tức</h2>
                <ul className="aside-list">
                  <li><a href="/">Trang chủ</a></li>
                  <li><a href="#">Giới thiệu</a></li>
                  <li><a href="#">Sản phẩm</a></li>
                  <li><a className="font-bold" href="#">Tin tức</a></li>
                  <li><a href="#">Liên hệ</a></li>
                  <li><a href="#">Câu hỏi thường gặp</a></li>
                  <li><a href="#">Hệ thống cửa hàng</a></li>
                  <li><a href="#">Đặt bàn</a></li>
                </ul>
              </div>

              <div className="aside-section">
                <h2 className="aside-title">Tin tức nổi bật</h2>
                <ul className="aside-list">
                  {tintucNoibat.map((tintuc) => (
                    <li className="aside-news-item" key={tintuc.id}>
                      <Image
                        src={tintuc.imageSummary || "/images/default.png"}
                        alt={tintuc.title}
                        width={200}
                        height={100}
                        unoptimized
                      />
                      <a href="#">{tintuc.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div> {/* Kết thúc cột bên phải */}
          </div>
        </div>
      </div>
    </div>
  );
}
