"use client";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>VỀ CHÚNG TÔI</h3>
          <p>
            Chào mừng bạn đến với MBM Food - điểm đến lý tưởng cho những người
            yêu thưởng thức pizza tại thành phố! Dola Food tự hào là địa chỉ
            pizza hàng đầu, nổi tiếng với chất lượng món ăn tuyệt vời, dịch vụ
            tận tâm và mức độ hài lòng cao từ phía khách hàng.
          </p>
          <h4>HÌNH THỨC THANH TOÁN</h4>
          <div className={styles.paymentMethods}>
            <Image
              src="/images/payment-cash.png"
              alt="Tiền mặt"
              width={50}
              height={50}
            />
            <Image
              src="/images/payment-bank.png"
              alt="Chuyển khoản"
              width={50}
              height={50}
            />
            <Image
              src="/images/payment-visa.png"
              alt="Visa"
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>THÔNG TIN</h3>
          <p>
            Công ty TNHH MBM Food chuyên phục vụ trong lĩnh vực nhà hàng. Mã số
            thuế: 123456xxxx - Ngày cấp: 13/05/2024 - Nơi cấp: Sở kế hoạch và
            đầu tư TPHCM - Website: mpmfood.net
          </p>

          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/location.png"
                alt="Địa chỉ"
                width={20}
                height={20}
              />
            </div>
            <span>70 Lữ Gia, Phường 15, Quận 11, TP.HCM</span>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/clock.png"
                alt="Giờ mở cửa"
                width={20}
                height={20}
              />
            </div>
            <span>8h - 22h, Thứ 2 đến Chủ Nhật</span>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/phone.png"
                alt="Số điện thoại"
                width={20}
                height={20}
              />
            </div>
            <span>1900 6750</span>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <Image
                src="/images/email.png"
                alt="Email"
                width={20}
                height={20}
              />
            </div>
            <span>support@mbm.vn</span>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>CHÍNH SÁCH</h3>
          <ul>
            <li>
              <a href="#">Chính sách thành viên</a>
            </li>
            <li>
              <a href="#">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="#">Bảo mật thông tin cá nhân</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="#">Hướng dẫn thanh toán</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>THEO DÕI CHÚNG TÔI</h3>
          <div className={styles.socialIcons}>
            <a href="#">
              <Image
                src="/images/zalo.png"
                alt="Zalo"
                width={24}
                height={24}
              />
            </a>
            <a href="#">
              <Image
                src="/images/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a href="#">
              <Image
                src="/images/youtube.png"
                alt="YouTube"
                width={24}
                height={24}
              />
            </a>
            <a href="#">
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
