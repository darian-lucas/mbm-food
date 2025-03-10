"use client";

import Image from "next/image";
import "../../styles/new.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNews, fetchFeaturedNews } from "../../services/post";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  create_at: string | number | Date;
  content: string;
  imageSummary?: string;
  author: string;
}

export default function New() {
  const [laytintuc, setLaytintuc] = useState<Post[]>([]);
  const [tintucNoibat, setTintucNoibat] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [news, featuredNews] = await Promise.all([
          fetchNews(),
          fetchFeaturedNews(),
        ]);
  
        console.log("Dữ liệu từ API:", { news, featuredNews });
  
        if (!news.length) throw new Error("Không có bài viết nào.");
        if (!featuredNews.length) throw new Error("Không có tin nổi bật.");
  
        setLaytintuc(news);
        setTintucNoibat(featuredNews);
        setError(null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
    };
  
    getData();
  }, []);
  

  const extractImageUrl = (htmlString?: string) => {
    if (!htmlString) return "/images/default.png";
    const match = htmlString.match(/src=['"]([^'"]+)['"]/);
    return match ? match[1] : "/images/default.png";
  };

  const truncateHTML = (html: string, maxLength: number) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="about-container">
      <section className="bread-crumb">
        <div className="container">
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/">
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="mr_lr">
              <svg
                width="10"
                height="10"
                viewBox="-96 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                    <div className="col-fix" key={tintuc._id}>
                      <div className="item-blog">
                        <div className="block-thumb">
                          <Link href={`/news/${encodeURIComponent(tintuc.slug)}`}>
                            <Image
                              src={extractImageUrl(tintuc.imageSummary)}
                              alt={tintuc.title}
                              width={940}
                              height={640}
                              unoptimized
                            />
                          </Link>
                        </div>
                        <div className="block-content">
                          <h3>
                            <Link href={`/news/${encodeURIComponent(tintuc.slug)}`}>
                              {tintuc.title}
                            </Link>
                          </h3>
                          <div className="time-post">
                            {new Date(tintuc.create_at).toLocaleDateString()}
                          </div>
                          <p>{truncateHTML(tintuc.content, 150)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4">
              <div className="aside-section">
                <h2 className="aside-title">Danh mục tin tức</h2>
                <ul className="aside-list">
                  <li><Link href="/">Trang chủ</Link></li>
                  <li><Link href="/about">Giới thiệu</Link></li>
                  <li className="menu-item">
                    <Link href="/products">Sản phẩm</Link>
                    <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                      {isOpen ? "−" : "+"}
                    </button>
                  </li>
                  {isOpen && (
                    <ul className="submenu">
                      <li><Link href="/products/pizza">Pizza</Link></li>
                      <li><Link href="/products/khaivi">Khai vị</Link></li>
                      <li><Link href="/products/myy">Mỳ Ý</Link></li>
                      <li><Link href="/products/salad">Salad</Link></li>
                      <li><Link href="/products/thucuong">Thức uống</Link></li>
                    </ul>
                  )}
                  <li><Link className="font-bold" href="/news">Tin tức</Link></li>
                  <li><Link href="/contact">Liên hệ</Link></li>
                  <li><Link href="#">Câu hỏi thường gặp</Link></li>
                  <li><Link href="#">Hệ thống cửa hàng</Link></li>
                  <li><Link href="#">Đặt bàn</Link></li>
                </ul>
              </div>

              <div className="aside-section">
                <h2 className="aside-title">Tin tức nổi bật</h2>
                <div className="item-blog-small">
                  <ul className="aside-list">
                    {tintucNoibat.map((tintuc) => (
                      <li className="aside-news-item" key={tintuc.slug}>
                        <div className="block-thumb">
                          <Link href={`/news/${encodeURIComponent(tintuc.slug)}`}>
                            <img
                              src={extractImageUrl(tintuc.imageSummary)}
                              alt={tintuc.title}
                              width={120}
                              height={120}
                            />
                          </Link>
                        </div>
                        <div className="block-content">
                          <Link href={`/news/${encodeURIComponent(tintuc.slug)}`}>
                            {tintuc.title}
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> {/* Kết thúc sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
}
