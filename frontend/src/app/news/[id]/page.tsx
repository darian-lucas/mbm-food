"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchNewsDetail, Post } from "../../../services/post";

export default function NewsDetail() {
  const [post, setPost] = useState<Post | null>(null);
  
  const params = useParams();
  const _id = Array.isArray(params._id) ? params._id[0] : params._id; // Đảm bảo _id là string

  useEffect(() => {
    if (!_id) {
      console.error("Không tìm thấy ID bài viết");
      return;
    }

    const loadPost = async () => {
      try {
        const data = await fetchNewsDetail(_id);
        if (!data) {
          console.error("Không tìm thấy bài viết");
          return;
        }
        setPost(data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    loadPost();
  }, [_id]);

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

      <div className="news-content">
        {[post].map((tintuc) => (
          <div key={tintuc._id}>
            <h1>{tintuc.title}</h1>
            <p className="news-meta">
              Ngày đăng: {new Date(tintuc.create_at).toLocaleDateString()} - Tác giả: {tintuc.author}
            </p>
            <Image
              src={tintuc.imageSummary || "/images/default.png"}
              alt={tintuc.title}
              width={800}
              height={500}
            />
            <div dangerouslySetInnerHTML={{ __html: tintuc.content }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
