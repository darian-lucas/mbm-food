"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/app/components/Register.module.css";

interface Address {
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  zip: string;
  address: string;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  address: Address;
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  
  const selectedCity = watch("address.city");
  const selectedDistrict = watch("address.district");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);
  
  useEffect(() => {
    if (selectedCity) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts || []));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(res => res.json())
        .then(data => setWards(data.wards || []));
    }
  }, [selectedDistrict]);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const formattedData = {
        ...data,
        address: [{ ...data.address }],
      };

      const res = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Đăng kí thất bại!");

      toast.success("Tạo tài khoản thành công!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ĐĂNG KÝ</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Tên đăng nhập" {...register("username", { required: "Tên đăng nhập là bắt buộc" })} className={styles.input} />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}

        <input type="email" placeholder="Email" {...register("email", { required: "Email là bắt buộc" })} className={styles.input} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input type="password" placeholder="Mật khẩu" {...register("password", { required: "Mật khẩu là bắt buộc" })} className={styles.input} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <input type="text" placeholder="Họ và tên" {...register("address.name", { required: "Tên là bắt buộc" })} className={styles.input} />
        {errors.address?.name && <p className={styles.error}>{errors.address.name.message}</p>}

        <input type="text" placeholder="Số điện thoại" {...register("address.phone", { required: "Số điện thoại là bắt buộc" })} className={styles.input} />
        {errors.address?.phone && <p className={styles.error}>{errors.address.phone.message}</p>}

        <input type="text" placeholder="Địa chỉ cụ thể" {...register("address.address", { required: "Địa chỉ là bắt buộc" })} className={styles.input} />
        {errors.address?.address && <p className={styles.error}>{errors.address.address.message}</p>}

        <select {...register("address.city", { required: "Thành phố là bắt buộc" })} className={styles.input}>
          <option value="">Chọn Thành phố</option>
          {cities.map(city => <option key={city.code} value={city.code}>{city.name}</option>)}
        </select>
        {errors.address?.city && <p className={styles.error}>{errors.address.city.message}</p>}

        <select {...register("address.district", { required: "Quận/Huyện là bắt buộc" })} className={styles.input}>
          <option value="">Chọn Quận/Huyện</option>
          {districts.map(district => <option key={district.code} value={district.code}>{district.name}</option>)}
        </select>
        {errors.address?.district && <p className={styles.error}>{errors.address.district.message}</p>}

        <select {...register("address.ward", { required: "Phường/Xã là bắt buộc" })} className={styles.input}>
          <option value="">Chọn Phường/Xã</option>
          {wards.map(ward => <option key={ward.code} value={ward.code}>{ward.name}</option>)}
        </select>
        {errors.address?.ward && <p className={styles.error}>{errors.address.ward.message}</p>}

        <input type="text" placeholder="Mã bưu điện" {...register("address.zip", { required: "Mã bưu điện là bắt buộc" })} className={styles.input} />
        {errors.address?.zip && <p className={styles.error}>{errors.address.zip.message}</p>}

        <button type="submit" className={styles.button}>Đăng ký</button>
      </form>
      <p>
        Bạn đã có tài khoản? <a href="/login" className={styles.link}>Đăng nhập ngay!</a>
      </p>
    </div>
  );
}