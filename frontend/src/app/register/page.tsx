"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/app/components/Register.module.css";

interface Address {
  name: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  zip: string;
  default?: boolean;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  address: Address[];
  defaultAddress?: string | null; // Lưu ID của địa chỉ mặc định
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const selectedDistrict = watch("address.0.district");

  // Lấy dữ liệu chỉ của Hồ Chí Minh
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=3")
      .then(res => {
        const hcm = res.data.find((city: any) => city.name === "Thành phố Hồ Chí Minh");
        if (hcm) setDistricts(hcm.districts);
      })
      .catch(err => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  // Cập nhật danh sách phường/xã và mã ZIP khi chọn quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.name === selectedDistrict);
      setWards(district ? district.wards : []);
      setZipCode(district?.code || ""); // Mã ZIP từ API
      setValue("address.0.zip", district?.code || ""); // Cập nhật giá trị zip vào form
    }
  }, [selectedDistrict, districts, setValue]);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const addressId = new Date().getTime().toString(); // Giả lập ID tạm thời

      const formattedData: RegisterForm = { 
        ...data, 
        address: [{
          ...data.address[0],
          city: "Thành phố Hồ Chí Minh",
          default: isDefault
        }],
        defaultAddress: null // Không gửi ID giả lập
      };
      
  
      const res = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Đăng kí thất bại!");
  
      toast.success("Tạo tài khoản thành công!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ĐĂNG KÝ</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Họ và tên" {...register("username", { required: "Tên đăng nhập là bắt buộc" })} className={styles.input} />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}

        <input type="email" placeholder="Email" {...register("email", { required: "Email là bắt buộc" })} className={styles.input} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input type="password" placeholder="Mật khẩu" {...register("password", { required: "Mật khẩu là bắt buộc" })} className={styles.input} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <h3 className={styles.subtitle}>Địa chỉ giao hàng</h3>

        <input type="text" placeholder="Họ tên người nhận" {...register("address.0.name", { required: "Họ tên là bắt buộc" })} className={styles.input} />
        {errors.address?.[0]?.name && <p className={styles.error}>{errors.address[0].name.message}</p>}

        <input type="text" placeholder="Số điện thoại" {...register("address.0.phone", { required: "Số điện thoại là bắt buộc" })} className={styles.input} />
        {errors.address?.[0]?.phone && <p className={styles.error}>{errors.address[0].phone.message}</p>}

        <input type="text" placeholder="Công ty (nếu có)" {...register("address.0.company")} className={styles.input} />

        <input type="text" placeholder="Địa chỉ chi tiết. Ví dụ : Số nhà / Hẻm / Đường" {...register("address.0.address", { required: "Địa chỉ chi tiết là bắt buộc" })} className={styles.input} />
        {errors.address?.[0]?.address && <p className={styles.error}>{errors.address[0].address.message}</p>}

        <input type="text" value="Thành phố Hồ Chí Minh" disabled className={styles.input} />

        <select {...register("address.0.district", { required: "Vui lòng chọn Quận/Huyện" })} className={styles.input}>
          <option value="">Chọn Quận/Huyện</option>
          {districts.map(district => <option key={district.code} value={district.name}>{district.name}</option>)}
        </select>
        {errors.address?.[0]?.district && <p className={styles.error}>{errors.address[0].district.message}</p>}

        <select {...register("address.0.ward", { required: "Vui lòng chọn Phường/Xã" })} className={styles.input} disabled={!selectedDistrict}>
          <option value="">Chọn Phường/Xã</option>
          {wards.map(ward => <option key={ward.code} value={ward.name}>{ward.name}</option>)}
        </select>
        {errors.address?.[0]?.ward && <p className={styles.error}>{errors.address[0].ward.message}</p>}

        <input type="text" value={zipCode} readOnly {...register("address.0.zip")} className={styles.input} />

        <label className={styles.checkbox}>
          <input 
            type="checkbox" 
            {...register("address.0.default")}
            onChange={(e) => setIsDefault(e.target.checked)} 
          />
          Đặt làm địa chỉ mặc định
        </label>

        <button type="submit" className={styles.button}>Đăng ký</button>
      </form>
      <p>
        Bạn đã có tài khoản? <a href="/login" className={styles.link}>Đăng nhập ngay!</a>
      </p>
    </div>
  );
}