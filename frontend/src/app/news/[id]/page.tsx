"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchNewsDetail, Post } from "../../../services/post";

export default function NewsDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy ID bài viết");
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      try {
        const data = await fetchNewsDetail(id);
        if (!data) {
          setError("Bài viết không tồn tại");
        } else {
          setPost(data);
        }
      } catch (error) {
        setError("Lỗi khi lấy bài viết");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <p>Đang tải bài viết...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return null;

  // Trích xuất URL ảnh từ chuỗi HTML (nếu có)
  const extractImageSrc = (htmlString: string | undefined): string | null => {
    if (!htmlString) return null;
    const match = htmlString.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  // Lấy URL ảnh từ `imageSummary`
  const imageSrc = extractImageSrc(post.imageSummary) || "/images/default.png";

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
        <h1>{post.title}</h1>
        <p className="news-meta">
          Ngày đăng: {new Date(post.create_at).toLocaleDateString()} - Tác giả: {post.author}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}
