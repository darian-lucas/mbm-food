import Link from "next/link";
import "../../styles/new.css";
import "../../styles/Storesystem.css";

export default function Storesystem(){
    return(
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
                        <span>Hệ thống cửa hàng</span>
                    </strong>
                    </li>
                </ul>
                </div>
            </section>
            <div className="page page-he-thong">
                <div className="container">
                    <div className="hethong-info">
                        <div className="row row-fix">
                            <div className="col-fix">
                                <div className="item">
                                    <div className="thump">
                                        <img src="/images/icon_hethong1.png" alt="" />
                                    </div>
                                    <span>
                                        Cửa hàng
                                        <b>50+</b>
                                    </span>
                                </div>
                            </div>
                            <div className="col-fix">
                                <div className="item">
                                    <div className="thump">
                                        <img src="/images/icon_hethong2.png" alt="" />
                                    </div>
                                    <span>
                                        Tỉnh thành
                                        <b>30+</b>
                                    </span>
                                </div>
                            </div>
                            <div className="col-fix">
                                <div className="item">
                                    <div className="thump">
                                        <img src="/images/icon_hethong3.png" alt="" />
                                    </div>
                                    <span>
                                        Văn phòng đại diện
                                        <b>3</b>
                                    </span>
                                </div>
                            </div>
                            <div className="col-fix">
                                <div className="item">
                                    <div className="thump">
                                        <img src="/images/icon_hethong4.png" alt="" />
                                    </div>
                                    <span>
                                        Nhân sự
                                        <b>500+</b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block-background">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="option-chos option-chos1">
                                    <div className="group-option">
                                        <div className="group-city">
                                            <span className="title">Tỉnh / Thành</span>
                                            <select name="" id="city" className="select">
                                                <option value="ALL" selected>Chọn tỉnh thành</option>
                                                <option value="Hà Nội" selected>Hà Nội</option>
                                                <option value="Hồ Chí Minh" selected>Hồ Chí Minh</option>
                                                <option value="Đà Nẵng" selected>Đà Nẵng</option>
                                                <option value="Bình Dương" selected>Bình Dương</option>
                                                <option value="Cần Thơ" selected>Cần Thơ</option>
                                            </select>
                                        </div>
                                        <div className="group-city">
                                            <span className="title">Nhập tên cửa hàng</span>
                                            <input type="text" id="myName" placeholder="Nhập tên cửa hàng" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="option-chos" id="option-chos">
                                    <div className="info-store" id="info-store">
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Sài Gòn</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                Tầng 3, 70 Lữ Gia, Phường 15, Quận 11, Thành phố Hồ Chí Minh
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Bình Dương</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                169 / 34 Nguyễn Hữu Cảnh, Phường Phú Thọ, TP.Thủ Dầu Một, Tỉnh Bình Dương
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Cần Thơ</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                81 đường Phan Huy Chú, KDC Thới Nhựt I, Phường An Khánh, Quận Ninh Kiều, Tp Cần Thơ
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Hà Nội</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                Tầng 6 - 266 Đội Cấn, Phường Liễu Giai, Quận Ba Đình, Hà Nội
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Đà Nẵng</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                181 đường Huỳnh Tấn Phát, Phường Hoà Cường Nam, Quận Hải Châu, TP Đà Nẵng
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Hoàng Quốc Việt</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                38 Hoàng Quốc Việt, Phường Nghĩa Tân, Quận Cầu Giấy, Hà Nội
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Hoàng Đạo Thúy</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                150 Hoàng Đạo Thúy, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                        <div className="store-list">
                                            <span className="name-cuahang">MBM Trần Phú</span>
                                            <span className="store-name">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                        <path d="M11.0008 0C6.60743 0 3.0332 3.57423 3.0332 7.96752C3.0332 13.4197 10.1634 21.4239 10.467 21.762C10.7521 22.0796 11.2499 22.079 11.5346 21.762C11.8381 21.4239 18.9683 13.4197 18.9683 7.96752C18.9683 3.57423 15.3941 0 11.0008 0ZM11.0008 11.9762C8.79037 11.9762 6.99213 10.1779 6.99213 7.96752C6.99213 5.75712 8.79041 3.95888 11.0008 3.95888C13.2111 3.95888 15.0094 5.75717 15.0094 7.96757C15.0094 10.178 13.2111 11.9762 11.0008 11.9762Z" fill="#949494"> 
                                                        </path>
                                                    </svg>
                                                </b>
                                                95 Trần Phú, Phường Văn Quán, Quận Hà Đông, Hà Nội
                                            </span>
                                            <span className="store-phone">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                        <path d="M18.0945 14.616C16.8259 13.531 15.5385 12.8737 14.2854 13.9571L13.5372 14.6119C12.9898 15.0872 11.972 17.3081 8.03667 12.7811C4.10219 8.25986 6.44354 7.5559 6.99179 7.08468L7.7441 6.42907C8.99058 5.34322 8.52018 3.97627 7.62117 2.56917L7.07866 1.71688C6.17556 0.313051 5.19214 -0.6089 3.94238 0.475314L3.26711 1.06536C2.71475 1.46774 1.17079 2.77569 0.796277 5.26045C0.345545 8.24183 1.7674 11.6559
                                                                5.02496 15.4019C8.27842 19.1495 11.4639 21.032 14.4813 20.9992C16.989 20.9721 18.5035 
                                                                19.6265 18.9772 19.1372L19.6549 18.5464C20.9014 17.463 20.1269 16.3599 18.8575 15.2724L18.0945 14.616Z" fill="#949494">
                                                        </path>
                                                    </svg>
                                                </b>
                                                <a href="" className="phone-url" title="19005236">19005236</a>
                                            </span>
                                            <a href="" className="store-url">
                                                <b>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M11.102 17L9.68591 9.31409L2 7.89796L18 1L11.102 17Z" stroke="black" stroke-miterlimit="10">
                                                        </path>
                                                    </svg>
                                                </b>
                                                Chỉ đường
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                    <div className="iFrameMap">
                                        <div id="map_contact" className="map">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.569245209718!2d106.69681109999999!3d10.767643399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1573f5d56f%3A0x300ecbf0d5ab5050!2zMTAgVHLhu4tuaCBWxINuIEPhuqVuLCBQaMaw4budbmcgQ-G6p3Ugw5RuZyBMw6NuaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1740984076792!5m2!1svi!2s" width="600" height="450" style={{border:0}}  loading="lazy"></iframe>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}