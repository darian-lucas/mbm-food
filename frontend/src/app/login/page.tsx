"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
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

      const result: { token?: string; userId?: string; message?: string } = await res.json();
      if (!res.ok) throw new Error(result.message || "Đăng nhập thất bại");

      // Lưu token và userId vào localStorage
      localStorage.setItem("token", result.token || "");
      localStorage.setItem("userId", result.userId || "");

      // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không mong muốn");
      }
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
          {...register("email", { required: true })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          {...register("password", { required: true })}
          className={styles.input}
        />
        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" /> Ghi nhớ đăng nhập
          </label>
          <a href="#" className={styles.link}>Quên mật khẩu?</a>
        </div>
        <button type="submit" className={styles.button}>Đăng nhập</button>
      </form>
      <p>
        Bạn chưa có tài khoản? <a href="/register" className={styles.link}>Đăng ký</a>
      </p>
    </div>
  );
};

export default Login;
