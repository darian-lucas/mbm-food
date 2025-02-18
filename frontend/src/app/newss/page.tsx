"use client";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/posts/67b359a58142fe5bbbf145f0");
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const data = await res.json();

        // Sử dụng DOMParser để phân tích HTML và loại bỏ thẻ <p> bao quanh <img>
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, "text/html");

        // Loại bỏ các thẻ <p> bao quanh <img>
        // Loại bỏ các thẻ <p> bao quanh <img>
        const images = doc.querySelectorAll('p > img');
        images.forEach(img => {
          const parent = img.parentElement;
          if (parent && parent.tagName === 'P') {
            parent.replaceWith(img);
          }
        });


        // Cập nhật lại nội dung đã chỉnh sửa
        setPost({ ...data, content: doc.body.innerHTML });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, []);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
