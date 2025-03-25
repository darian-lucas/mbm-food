'use client';
import { notFound } from "next/navigation";
import ProductList from "@/components/common/ProductList";
import style from "@/styles/Categories.module.css";

// Ánh xạ slug sang idcate
const categoryMap: Record<string, string> = {
  pizza: "67b0a4fbb5a39baf9de368ff",
  "khai-vi": "67b0a54db5a39baf9de36902",
  "my-y": "67b0a582b5a39baf9de36904",
  salad: "67b0a5d2b5a39baf9de36907",
  "nuoc-uong": "67b0a75ab5a39baf9de3690a",
};

export default function CategoryPage({ params }: { params: { categories: string } }) {
  // Lấy ID danh mục tương ứng
  const categoryId = categoryMap[params.categories];
  if (!categoryId) return notFound();

  return (
    <div className={style.container}>
        <div className={style.title_page}>{params.categories.replace("-", " ").toUpperCase()}</div>
        <div className={style.row}>
            <aside className={style.dqdt_sidebar}>
                <div className={style.aside_content_menu}>
                    <div className={style.title_head_col}>Danh mục sản phẩm</div>
                    <nav className={style.nav_category}>
                        <ul className={style.navbar_pills}>
                            <li className={style.nav_item}>
                                <a href="/" className={style.navlink}>Trang chủ</a>
                            </li>
                            <li className={style.nav_item}>
                                <a href="/" className={style.navlink}>Giới thiệu</a>
                            </li>
                            <li className={style.nav_item}>
                                <a href="" className={style.navlink}>Sản phẩm</a>
                                <i className={style.down_icon}></i>
                                <ul className={style.menu_down}>
                                    <li className={style.nav_item}><a href="/pizza" className={style.navlink}>Pizza</a></li>
                                    <li className={style.nav_item}><a href="/khai-vi" className={style.navlink}>Khai vị</a></li>
                                    <li className={style.nav_item}><a href="/my-y" className={style.navlink}>Mỳ ý</a></li>
                                    <li className={style.nav_item}><a href="/salad" className={style.navlink}>Salad</a></li>
                                    <li className={style.nav_item}><a href="/thuc-uong" className={style.navlink}>Thức uống</a></li>
                                </ul>
                            </li>
                            <li className={style.nav_item}><a href="" className={style.navlink}>Tin tức</a></li>
                            <li className={style.nav_item}><a href="" className={style.navlink}>Liên hệ</a></li>
                            <li className={style.nav_item}><a href="" className={style.navlink}>Câu hỏi thường gặp</a></li>
                            <li className={style.nav_item}><a href="" className={style.navlink}>Hệ thống cửa hàng</a></li>
                            <li className={style.nav_item}><a href="" className={style.navlink}>Đặt bàn</a></li>
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
                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-duoi-100-000d">
                                                <input type="checkbox" title="filter-duoi-100-000d" /> Dưới 100.000đ
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-tu-100-000d-200-000d">
                                                <input type="checkbox" title="filter-tu-100-000d-200-000d" /> Từ 100.000đ - 200.000đ
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-tu-200-000d-300-000d">
                                                <input type="checkbox" title="filter-tu-200-000d-300-000d" /> Từ 200.000đ - 300.000đ
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-tu-300-000d-500-000d">
                                                <input type="checkbox" title="filter-tu-300-000d-500-000d" /> Từ 300.000đ - 500.000đ
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-tu-500-000d-1-000-000d">
                                                <input type="checkbox" title="filter-tu-500-000d-1-000-000d" /> Từ 500.000đ - 1.000.000đ
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-tren-1-000-000d">
                                                <input type="checkbox" title="filter-tren-1-000-000d" /> Trên 1.000.000đ
                                            </label>
                                        </span>
                                    </li>
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
                                                <input type="checkbox" title="filter-nho-6-inch" /> Nhỏ 6 inch
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-vua-9-inch">
                                                <input type="checkbox" title="filter-vua-9-inch" /> Vừa 9 inch
                                            </label>
                                        </span>
                                    </li>

                                    <li className={style.filter_item}>
                                        <span>
                                            <label htmlFor="filter-lon-12-inch">
                                                <input type="checkbox" title="filter-lon-12-inch" /> Lớn 12 inch
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
                            <li className={style.btn_quick_sort}><a href="">Mặc định</a></li>
                            <li className={style.btn_quick_sort}><a href="">Tên A-Z</a></li>
                            <li className={style.btn_quick_sort}><a href="">Tên Z-A</a></li>
                            <li className={style.btn_quick_sort}><a href="">Hàng mới</a></li>
                            <li className={style.btn_quick_sort}><a href="">Giá thấp đến cao</a></li>
                            <li className={style.btn_quick_sort}><a href="">Giá cao đến thấp</a></li>
                        </ul>
                    </div>
                    <section className={style.product_view}>
                        {/* Gọi ProductList, nhưng ép nó hiển thị toàn bộ sản phẩm */}
                        <ProductList idcate={categoryId} showAll={true} />
                    </section>
                    <div className="section_pagenav"></div>
                </div>
            </div>
        </div>
    </div>        
  );
}
