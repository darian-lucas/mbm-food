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

      const result: { token?: string; message?: string } = await res.json();
      if (!res.ok) throw new Error(result.message || "Login failed");

      localStorage.setItem("token", result.token || "");
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email", { required: true })} className={styles.input} />
        <input type="password" placeholder="Password" {...register("password", { required: true })} className={styles.input} />
        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" /> Ghi nhớ đăng nhập
          </label>
          <a href="#" className={styles.link}>Quên mật khẩu</a>
        </div>
        <button type="submit" className={styles.button}>Đăng nhập</button>
      </form>
      <p>
        Bạn chưa có tài khoản ? <a href="/register" className={styles.link}>Đăng ký</a>
      </p>
    </div>
  );
};

export default Login;
