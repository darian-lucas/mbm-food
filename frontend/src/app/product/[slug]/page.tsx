"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ProductDetail.module.css";
import { toast } from "react-toastify";

interface Variant {
  option: string;
  price: number;
  sale_price: number;
  image: string;
}

interface Product {
  name: string;
  description: string;
  slug: string;
  variants: Variant[];
  idcate: string;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<string>("Đế dày");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/products/slug/${slug}`
        );
        if (!res.ok) throw new Error("Lỗi khi tải sản phẩm");
        const data = await res.json();
        setProduct(data.data);
        setSelectedVariant(data.data.variants[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slug]);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };
  const addToCart = () => {
    if (!product || !selectedVariant) return;
  
    const cartItem = {
      id: product.slug,
      name: product.name,
      option: selectedVariant.option,
      price:
        selectedVariant.sale_price > 0
          ? selectedVariant.sale_price
          : selectedVariant.price,
      image: selectedVariant.image,
      quantity,
      crust: product.idcate === "67b0a4fbb5a39baf9de368ff" ? selectedCrust : null,
    };
  
    // Lấy danh sách giỏ hàng cũ từ localStorage
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
  
    // Tìm sản phẩm trong giỏ hàng
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.option === cartItem.option &&
        item.crust === cartItem.crust
    );
  
    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào danh sách giỏ hàng
      cart.push(cartItem);
    }
  
    // Ghi đè giỏ hàng cũ bằng danh sách mới
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Hiển thị thông báo thành công
    toast.success("Đã thêm vào giỏ hàng!");
  
    console.log("Cart after adding:", cart);
  };

  if (!product || !selectedVariant) return <p>Loading...</p>;

  return (
    <div>
      {/* Phần Chi tiết */}
      <div className={styles.container}>
        <div className={styles.detailProduct}>
          <div className={styles.row}>
            <div className={styles.productLeft}>
              <div className={styles.productImage}>
                <Image
                  src={`http://localhost:3001/images/${selectedVariant.image}`}
                  alt={product.name}
                  width={400}
                  height={400}
                />
              </div>
              <div className={styles.voucherContainer}>
                <div>
                  <div className={styles.tittleVoucher}>
                    <span>NHẬN VOUCHER NGAY !!!</span>
                  </div>
                  <div className={styles.rowFix}>
                    <div className={styles.colFix}>
                      <span>
                        Nhập mã
                        <b>MBM20</b> Áp dụng cho đơn hàng từ 200k trở lên. Không
                        đi kèm với chương trình khác.
                      </span>
                      <button className={styles.voucherBtn}>Sao chép</button>
                    </div>
                    <div className={styles.colFix}>
                      <span>
                        Nhập mã
                        <b>MBM20</b> Áp dụng cho đơn hàng từ 200k trở lên. Không
                        đi kèm với chương trình khác.
                      </span>
                      <button className={styles.voucherBtn}>Sao chép</button>
                    </div>
                    <div className={styles.colFix}>
                      <span>
                        Nhập mã
                        <b>MBM20</b> Áp dụng cho đơn hàng từ 200k trở lên. Không
                        đi kèm với chương trình khác.
                      </span>
                      <button className={styles.voucherBtn}>Sao chép</button>
                    </div>
                    <div className={styles.colNote}>
                      <span>
                        Lưu Mã và nhập ở trang <b>THANH TOÁN</b> bạn nhé!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* PHẦN MÔ TẢ */}
              <div className={styles.descContainer}>
                <div className={styles.descTit}>
                  <p>MÔ TẢ MÓN ĂN</p>
                </div>
                <div
                  className={styles.descContent}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.detailProduct2}>
                <div className={styles.titleProduct}>
                  <h1>{product.name}</h1>
                </div>
                <form action="#" className={styles.form}>
                  <div className={styles.price}>
                    <p>
                      {selectedVariant.sale_price > 0
                        ? selectedVariant.sale_price
                        : selectedVariant.price.toLocaleString()}{" "}
                      đ
                    </p>
                  </div>
                  <div className={styles.formProduct}>
                    <div className={styles.select}>
                      {product.variants.some(
                        (variant) => variant.option.trim() !== ""
                      ) && (
                        <div className={styles.swatch}>
                          <div className={styles.selectHeader}>
                            <p>
                              Kích thước:{" "}
                              <span>
                                {selectedVariant?.option || "Chưa chọn"}
                              </span>
                            </p>
                          </div>
                          <div className={styles.selectOption}>
                            {product.variants
                              .filter((variant) => variant.option.trim() !== "") // Lọc các option rỗng
                              .map((variant) => (
                                <label
                                  key={variant.option}
                                  className={styles.selectOptionElement}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedVariant?.option === variant.option
                                    }
                                    onChange={() => setSelectedVariant(variant)}
                                  />
                                  {variant.option}
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                      {product.idcate === "67b0a4fbb5a39baf9de368ff" && (
                        <div className={styles.swatch}>
                          <div className={styles.selectHeader}>
                            <p>
                              Đế:{" "}
                              <span className={styles.valueRoperties}>
                                {selectedCrust}
                              </span>
                            </p>
                          </div>
                          <div className={styles.selectOption}>
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedCrust === "Đế dày"}
                                onChange={() => setSelectedCrust("Đế dày")}
                              />
                              Đế dày
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedCrust === "Đế mỏng"}
                                onChange={() => setSelectedCrust("Đế mỏng")}
                              />
                              Đế mỏng
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.note}>
                      <label htmlFor="" className={styles.labelNote}>
                        Ghi chú
                      </label>
                      <input
                        type="text"
                        placeholder="Ghi chú món ăn"
                        className={styles.inputNote}
                      />
                    </div>
                    <div className={styles.clearForm}>
                      <div className={styles.quantity}>
                        <div className={styles.numberShow}>
                          <label htmlFor="">Số lượng</label>
                          <div className={styles.numberControl}>
                            <button
                              className={styles.btnNum}
                              onClick={decreaseQuantity}
                              type="button"
                            >
                              -
                            </button>
                            <span className={styles.quantityShow}>
                              {quantity}
                            </span>
                            <button
                              className={styles.btnNum}
                              onClick={increaseQuantity}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className={styles.addCart}>
                          <button
                            className={styles.add}
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart();
                            }}
                          >
                            Thêm vào giỏ hàng
                          </button>
                        </div>
                      </div>
                      <div className={styles.groupBtn}>
                        <button className={styles.buyNow}>Mua Ngay</button>
                        <button className={styles.booking}>Đặt bàn</button>
                      </div>
                      <div className={styles.hotline}>
                        Gọi<a href="$">123456</a>Để được hỗ trợ ngay
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
