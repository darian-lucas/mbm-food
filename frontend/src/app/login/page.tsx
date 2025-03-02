"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/app/components/Login.module.css";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Kiểm tra API có trả về JSON hợp lệ không
      const result = await res.json();
      console.log("Dữ liệu từ API:", result);

      if (!res.ok) {
        throw new Error(result.message || "Đăng nhập thất bại");
      }

      // Kiểm tra các giá trị quan trọng từ API
      if (!result.token || !result.userId || !result.role) {
        throw new Error("Dữ liệu từ server không hợp lệ.");
      }

      // Lưu token và userId vào localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);

      toast.success("Đăng nhập thành công!");

      // Điều hướng dựa vào role
      const role = result.role.trim().toLowerCase();
      if (role === "admin") {
        router.refresh();
        router.push("/admin");
      } else if (role === "user") {
        router.push("/");
      } else if (role === "staff") {
        router.push("/employee");
      } else {
        toast.error(`Vai trò "${result.role}" không có quyền truy cập.`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Đăng nhập</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Vui lòng nhập email" })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          className={styles.input}
        />
        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" /> Ghi nhớ đăng nhập
          </label>
          <a href="#" className={styles.link}>
            Quên mật khẩu?
          </a>
        </div>
        <button type="submit" className={styles.button}>
          Đăng nhập
        </button>
      </form>
      <p>
        Bạn chưa có tài khoản?{" "}
        <a href="/register" className={styles.link}>
          Đăng ký
        </a>
      </p>
    </div>
  );
};

export default Login;
