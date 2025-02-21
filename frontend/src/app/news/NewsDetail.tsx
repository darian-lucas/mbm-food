"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import "./newsDetail.css";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  create_at: string | number | Date;
  content: string;
  imageSummary?: string;
  author: string;
}

export default function NewsDetail() {
  // const router = useRouter();
  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return; // Tránh lỗi undefined

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);
        if (!res.ok) throw new Error("Bài viết không tồn tại");

        const data: Post = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Đang tải bài viết...</p>;
  }

  return (
    <div className="news-detail-container">
      <section className="bread-crumb">
        <div className="container">
          <ul className="breadcrumb">
            <li className="home">
              <Link href="/">
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="mr_lr"> / </li>
            <li>
              <Link href="/news">
                <span>Tin tức</span>
              </Link>
            </li>
            <li className="mr_lr"> / </li>
            <li>
              <strong>{post.title}</strong>
            </li>
          </ul>
        </div>
      </section>

      <div className="news-detail-content container">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>Tác giả: {post.author}</span> | <span>Ngày đăng: {new Date(post.create_at).toLocaleDateString()}</span>
        </div>
        <div className="post-image">
          <Image
            src={post.imageSummary || "/images/default.png"}
            alt={post.title}
            width={940}
            height={640}
            unoptimized
          />
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}
