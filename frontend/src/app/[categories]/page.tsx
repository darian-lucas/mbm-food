"use client";
import { notFound } from "next/navigation";
import ProductListCate from "@/components/common/ProductListCate";
import style from "@/styles/Categories.module.css";
import { useState } from "react";

interface CategoryPageProps {
  params: {
    categories: string;
  };
}

const categoryMap: Record<string, string> = {
  pizza: "67b0a4fbb5a39baf9de368ff",
  "khai-vi": "67b0a54db5a39baf9de36902",
  "my-y": "67b0a582b5a39baf9de36904",
  salad: "67b0a5d2b5a39baf9de36907",
  "nuoc-uong": "67b0a75ab5a39baf9de3690a",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = categoryMap[params.categories];
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  if (!categoryId) return notFound();

  return (
    <div className={style.container}>
      <div className={style.title_page}>
        {params.categories.replace("-", " ").toUpperCase()}
      </div>
      <div className={style.row}>
        <aside className={style.dqdt_sidebar}>
          <div className={style.aside_content_menu}>
            <div className={style.title_head_col}>Danh mục sản phẩm</div>
            <nav className={style.nav_category}>
              <ul className={style.navbar_pills}>
                <li className={style.nav_item}>
                  <a href="/" className={style.navlink}>
                    Trang chủ
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="/" className={style.navlink}>
                    Giới thiệu
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Sản phẩm
                  </a>
                  <i className={style.down_icon}></i>
                  <ul className={style.menu_down}>
                    <li className={style.nav_item}>
                      <a href="/pizza" className={style.navlink}>
                        Pizza
                      </a>
                    </li>
                    <li className={style.nav_item}>
                      <a href="/khai-vi" className={style.navlink}>
                        Khai vị
                      </a>
                    </li>
                    <li className={style.nav_item}>
                      <a href="/my-y" className={style.navlink}>
                        Mỳ ý
                      </a>
                    </li>
                    <li className={style.nav_item}>
                      <a href="/salad" className={style.navlink}>
                        Salad
                      </a>
                    </li>
                    <li className={style.nav_item}>
                      <a href="/thuc-uong" className={style.navlink}>
                        Thức uống
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Tin tức
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Liên hệ
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Hệ thống cửa hàng
                  </a>
                </li>
                <li className={style.nav_item}>
                  <a href="" className={style.navlink}>
                    Đặt bàn
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={style.filter_content}>
            <div className={style.title_head_col}>Bộ lọc sản phẩm</div>
            <div className={style.filter_container}>
              <aside className={style.filter_price}>
                <div className={style.title_head}>Chọn mức giá</div>
                <div className={style.filter_group}>
                  <ul>
                    {[
                      { min: 0, max: 100000, label: "Dưới 100.000đ" },
                      {
                        min: 100000,
                        max: 200000,
                        label: "100.000đ - 200.000đ",
                      },
                      {
                        min: 200000,
                        max: 300000,
                        label: "200.000đ - 300.000đ",
                      },
                      {
                        min: 300000,
                        max: 500000,
                        label: "300.000đ - 500.000đ",
                      },
                      {
                        min: 500000,
                        max: 1000000,
                        label: "500.000đ - 1.000.000đ",
                      },
                      { min: 1000000, max: null, label: "Trên 1.000.000đ" },
                    ].map(({ min, max, label }) => (
                      <li key={label} className={style.filter_item}>
                        <label>
                          <input
                            type="radio"
                            name="price"
                            checked={minPrice === min && maxPrice === max}
                            onChange={() => {
                              setMinPrice(min);
                              setMaxPrice(max);
                            }}
                          />
                          {label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
              <aside className={style.filter_tag}>
                <div className={style.title_head}>Kích thước</div>
                <div className={style.filter_group}>
                  <ul>
                    <li className={style.filter_item}>
                      <span>
                        <label htmlFor="filter-nho-6-inch">
                          <input type="checkbox" title="filter-nho-6-inch" />{" "}
                          Nhỏ 6 inch
                        </label>
                      </span>
                    </li>

                    <li className={style.filter_item}>
                      <span>
                        <label htmlFor="filter-vua-9-inch">
                          <input type="checkbox" title="filter-vua-9-inch" />{" "}
                          Vừa 9 inch
                        </label>
                      </span>
                    </li>

                    <li className={style.filter_item}>
                      <span>
                        <label htmlFor="filter-lon-12-inch">
                          <input type="checkbox" title="filter-lon-12-inch" />{" "}
                          Lớn 12 inch
                        </label>
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </aside>
        <div className={style.block_collection}>
          <div className={style.category_products}>
            <div className={style.sort_cate}>
              <h3>Xếp theo : </h3>
              <ul>
                <li className={style.btn_quick_sort}>
                  <a href="">Mặc định</a>
                </li>
                <li className={style.btn_quick_sort}>
                  <a href="">Tên A-Z</a>
                </li>
                <li className={style.btn_quick_sort}>
                  <a href="">Tên Z-A</a>
                </li>
                <li className={style.btn_quick_sort}>
                  <a href="">Hàng mới</a>
                </li>
                <li className={style.btn_quick_sort}>
                  <a href="">Giá thấp đến cao</a>
                </li>
                <li className={style.btn_quick_sort}>
                  <a href="">Giá cao đến thấp</a>
                </li>
              </ul>
            </div>
            <section className={style.product_view}>
              {/* Gọi ProductList, nhưng ép nó hiển thị toàn bộ sản phẩm */}
              <ProductListCate
                idcate={categoryId}
                showAll={true}
                minPrice={minPrice ?? undefined}
                maxPrice={maxPrice ?? undefined}
              />
            </section>
            <div className="section_pagenav"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
