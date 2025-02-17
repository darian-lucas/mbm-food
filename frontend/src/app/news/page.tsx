import Image from "next/image";
import "./new.css";

export default function New() {
    return (
        <main className="container">
            <section>
                <div className="grid">
                    <div className="card">
                        <div className="block-thumb">
                            <Image src="/images/de-banh-pizza-mua-o.png" alt="Để bánh pizza" width={300} height={200}/>
                        </div>
                        <div className="card-content">
                            <a href=""><h2 className="card-title">Đế bánh pizza mua ở đâu đảm bảo chất lượng?</h2></a>
                            <p className="card-date">27/02/2024</p>
                            <p>Nếu bạn muốn tự làm bánh pizza tại nhà thì có thể chọn mua đế bánh pizza để tiết kiệm thời gian hơn. Tuy nhiên, khi mua đế bánh, bạn cũng nên...</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="block-thumb">
                            <Image src="/images/cach-lam-pizza-xot-mayonnaise.png" alt="Cách làm bánh" width={300} height={200}/>
                        </div>
                        <div className="card-content">
                            <a href=""><h2 className="card-title">Cách làm pizza xốt Mayonnaise thơm béo ngon ngất ngây</h2></a>
                            <p className="card-date">27/02/2024</p>
                            <p>Các món pizza xốt Mayonnaise luôn góp mặt vào menu “vàng” của chuỗi cửa hàng Dola trên toàn quốc. Hôm nay, hãy cùng khám phá xem điều gì đã tạo nên...</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="block-thumb">
                            <Image src="/images/tim-hieu-cac-loai-pasta.png" alt="Tìm hiểu các loại" width={200} height={100}/>
                        </div>
                        <div className="card-content">
                            <a href=""><h2 className="card-title">Pasta là món ăn của nước nào? Pasta và Spaghetti có gì khác nhau?</h2></a>
                            <p className="card-date">27/02/2024</p>
                            <p>Bất kỳ ai đã từng thưởng thức một trong các loại Pasta, chắc hẳn không thể nào quên được...</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="block-thumb">
                            <Image src="/images/tiet-lo-tinh-cach-qua-cach-an-pizza.png" alt="Tiết lộ tính cách" width={200} height={100}/>
                        </div>
                        <div className="card-content">
<a href=""><h2 className="card-title">Tiết lộ tính cách qua cách ăn pizza cực thú vị</h2></a>
                            <p className="card-date">27/02/2024</p>
                            <p>1. Ăn vỏ bánh trước tiên: Nhóm người này có tính cách hướng nội, thích sự khác biệt...</p>
                        </div>
                    </div>
                </div>
            </section>
            <aside>
                <div className="aside-section">
                    <h2 className="aside-title">Danh mục tin tức</h2>
                    <ul className="aside-list">
                        <li><a href="#">Trang chủ</a></li>
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
                        <li className="aside-news-item">
                            <Image src="/images/de-banh-pizza-mua-o.png" alt="Để bánh pizza" width={300} height={200}/>
                            <a href="#">Đế bánh pizza mua ở đâu đảm bảo chất lượng?</a>
                        </li>
                        <li className="aside-news-item">
                            <Image src="/images/cach-lam-pizza-xot-mayonnaise.png" alt="Cách làm bánh" width={300} height={200}/>
                            <a href="#">Cách làm pizza xốt Mayonnaise thơm béo ngon ngất ngây</a>
                        </li>
                        <li className="aside-news-item">
                            <Image src="/images/tim-hieu-cac-loai-pasta.png" alt="Tìm hiểu các loại" width={300} height={200}/>
                            <a href="#">Pasta là món ăn của nước nào? Pasta và Spaghetti có gì khác nhau?</a>
                        </li>
                        <li className="aside-news-item">
                            <Image src="/images/tiet-lo-tinh-cach-qua-cach-an-pizza.png" alt="Tiết lộ tính cách" width={300} height={200}/>
                            <a href="#">Tiết lộ tính cách qua cách ăn pizza cực thú vị</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </main>
    );
}