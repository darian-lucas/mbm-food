import Image from "next/image";
import "./new.css";

export default function New() {
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
          {/* <h1 className="title-page d-none">
                <Image src={}></Image>
            </h1> */}
          <div className="row">
            <div className="col-lg-8">
              <div className="list-blogs">
                <div className="row row-fix">
                  <div className="col-fix">
                    <div className="item-blog">
                      <div className="block-thumb">
                        <a href="">
                          <Image
                            src={"/images/de-banh-pizza-mua-o.png"}
                            alt={""}
                            width={940}
                            height={640}
                          ></Image>
                        </a>
                      </div>
                      <div className="block-content">
                        <h3>
                          <a href="">
                            Đế bánh pizza mua ở đâu đảm bảo chất lượng
                          </a>
                        </h3>
                        <div className="time-post">27/02/2024</div>
                        <p>
                          Nếu bạn muốn&nbsp;tự làm bánh pizza tại nhà&nbsp;thì
                          có thể chọn mua đế bánh pizza để tiết kiệm thời gian
                          hơn. Tuy nhiên, khi mua đế bánh, bạn cũng nên...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-fix">
                    <div className="item-blog">
                      <div className="block-thumb">
                        <a href="">
                          <Image
                            src={"/images/cach-lam-pizza-xot-mayonnaise.png"}
                            alt={""}
                            width={100}
                            height={100}
                          ></Image>
                        </a>
                      </div>
                      <div className="block-content">
                        <h3>
                          <a href="">
                            Cách làm pizza xốt Mayonnaise thơm béo ngon ngất
                            ngây
                          </a>
                        </h3>
                        <div className="time-post">27/02/2024</div>
                        <p>
                          Các món pizza xốt Mayonnaise luôn góp mặt vào menu
                          “vàng” của chuỗi cửa hàng MBM trên toàn quốc. Hôm nay,
                          hãy cùng khám phá xem điều gì...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-fix">
                    <div className="item-blog">
                      <div className="block-thumb">
                        <a href="">
                          <Image
                            src={"/images/tim-hieu-cac-loai-pasta.png"}
                            alt={""}
                            width={100}
                            height={100}
                          ></Image>
                        </a>
                      </div>
                      <div className="block-content">
                        <h3>
                          <a href="">
                            Pasta là món ăn của nước nào? Pasta và...
                          </a>
                        </h3>
                        <div className="time-post">27/02/2024</div>
                        <p>
                          Bất kỳ ai đã từng thưởng thức một trong các loại
                          Pasta, chắc hẳn sẽ không thể nào quên được cảm giác...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-fix">
                    <div className="item-blog">
                      <div className="block-thumb">
                        <a href="">
                          <Image
                            src={
                              "/images/tiet-lo-tinh-cach-qua-cach-an-pizza.png"
                            }
                            alt={""}
                            width={100}
                            height={100}
                          ></Image>
                        </a>
                      </div>
                      <div className="block-content">
                        <h3>
                          <a href="">
                            Tiết lộ tính cách qua cách ăn pizza cực thú vị
                          </a>
                        </h3>
                        <div className="time-post">27/02/2024</div>
                        <p>
                          1. Ăn vỏ bánh trước tiên: Nhóm người tạo ảnh hưởng,
                          thích sự khác biệt Đây là kiểu người...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="aside-section">
                <h2 className="aside-title">Danh mục tin tức</h2>
                <ul className="aside-list">
                  <li>
                    <a href="#">Trang chủ</a>
                  </li>
                  <li>
                    <a href="#">Giới thiệu</a>
                  </li>
                  <li>
                    <a href="#">Sản phẩm</a>
                  </li>
                  <li>
                    <a className="font-bold" href="#">
                      Tin tức
                    </a>
                  </li>
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                  <li>
                    <a href="#">Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <a href="#">Hệ thống cửa hàng</a>
                  </li>
                  <li>
                    <a href="#">Đặt bàn</a>
                  </li>
                </ul>
              </div>
              <div className="aside-section">
                <h2 className="aside-title">Tin tức nổi bật</h2>
                <ul className="aside-list">
                  <li className="aside-news-item">
                    <Image
                      src="/images/de-banh-pizza-mua-o.png"
                      alt="Hands kneading pizza dough"
                      width={200}
                      height={100}
                    />
                    <a href="#">Đế bánh pizza mua ở đâu đảm bảo chất lượng?</a>
                  </li>
                  <li className="aside-news-item">
                    <Image
                      src="/images/cach-lam-pizza-xot-mayonnaise.png"
                      alt="Pizza with mayonnaise sauce"
                      width={200}
                      height={100}
                    />
                    <a href="#">
                      Cách làm pizza xốt Mayonnaise thơm béo ngon ngất ngây
                    </a>
                  </li>
                  <li className="aside-news-item">
                    <Image
                      src="/images/tim-hieu-cac-loai-pasta.png"
                      alt="Pasta with sauce"
                      width={200}
                      height={100}
                    />
                    <a href="#">
                      Pasta là món ăn của nước nào? Pasta và Spaghetti có gì
                      khác nhau?
                    </a>
                  </li>
                  <li className="aside-news-item">
                    <Image
                      src="/images/tiet-lo-tinh-cach-qua-cach-an-pizza.png"
                      alt="People sharing a pizza"
                      width={200}
                      height={100}
                    />
                    <a href="#">
                      Tiết lộ tính cách qua cách ăn pizza cực thú vị
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
