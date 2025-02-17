import Image from "next/image";
import "../about/About.css";

export default function About() {
  return (
    <>
      <header className="headerAbout">
        <div className="container">
          <p>Trang chủ &gt;     
            <b style={{color: "red"}}>Giới thiệu</b>
            </p>
        </div>
      </header>
      <main className="container">
        <section className="section">
          <div className="about-flex">
            <div className="about-image">
              <Image
                src="/images/about-page.png"
                alt="A person holding two pizzas"
                width={500}
                height={500}
              />
            </div>
            <div className="about-text">
              <h2>Về Chúng Tôi</h2>
              <h1>MBM</h1>
              <p>
                Chào mừng bạn đến với MBM - điểm đến lý tưởng cho những người yêu thương thức pizza tại thành phố! MBM tự hào là địa chỉ pizza hàng đầu, nổi tiếng với chất lượng món ăn tuyệt vời, dịch vụ tận tâm và mức độ hài lòng cao từ phía khách hàng.
              </p>
              <ul>
                <li>Chất lượng món ăn hàng đầu</li>
                <li>Dịch vụ chăm sóc khách hàng xuất sắc</li>
                <li>Menu đa dạng phong phú</li>
                <li>Chất lượng nguyên liệu cao cấp</li>
                <li>Không gian thoải mái và ấm cúng</li>
                <li>Ưu đãi và khuyến mãi hấp dẫn</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Tại sao chọn</h2>
          <h1>MBM</h1>
          <p>
            Đến với MBM, bạn sẽ không chỉ là khách hàng mà còn là thành viên của một cộng đồng yêu thích thức phẩm ngon. Hãy để chúng tôi đưa bạn vào hành trình khám phá hương vị tuyệt vời của pizza và ẩm thực đa dạng tại MBM!
          </p>
          <div className="features">
            <div className="feature">
              <i className="fas fa-clock" style={{ color: "#f59e0b" }}></i>
              <div>
                <h3>Tốc độ nhanh</h3>
                <p>Thời gian chế biến nhanh nhưng vẫn đảm bảo chất lượng</p>
              </div>
            </div>
            <div className="feature">
              <i className="fas fa-chair" style={{ color: "#ef4444" }}></i>
              <div>
                <h3>Không gian thoải mái</h3>
                <p>Không gian luôn đảm bảo tiêu chí gọn gàng, sạch sẽ, thoáng mát</p>
              </div>
            </div>
            <div className="feature">
              <i className="fas fa-truck" style={{ color: "#10b981" }}></i>
              <div>
                <h3>Đặt hàng nhanh chóng</h3>
                <p>Dịch vụ giao hàng giúp bạn ngồi ở nhà vẫn được thưởng thức món ăn ngon</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Đầu bếp</h2>
          <h1>Người tạo ra những món ăn chất lượng</h1>
          <div className="chefs">
            <div className="chef">
              <Image
                src="/images/image1_about3.png"
                alt="Chef 1"
                width={200}
                height={200}
              />
              <h3>Chef 1</h3>
            </div>
            <div className="chef">
              <Image
                src="/images/image1_about3.png"
                alt="Chef 2"
                width={200}
                height={200}
              />
              <h3>Chef 2</h3>
            </div>
            <div className="chef">
              <Image
                src="/images/image1_about3.png"
                alt="Chef 3"
                width={200}
                height={200}
              />
              <h3>Chef 3</h3>
            </div>
            <div className="chef">
              <Image
                src="/images/image1_about3.png"
                alt="Chef 4"
                width={200}
                height={200}
              />
              <h3>Chef 4</h3>
            </div>
            <div className="chef">
              <Image
                src="/images/image1_about3.png"
                alt="Chef 5"
                width={200}
                height={200}
              />
              <h3>Chef 5</h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
