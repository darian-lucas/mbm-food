"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import newsService from "../services/NewsService";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

export default function EditPost({ id, onClose, onSuccess }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageSummary, setImageSummary] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const post = await newsService.getNewsById(id);
        setAuthor(post.author);
        setTitle(post.title);
        setContent(post.content);
        setSummary(post.summary);
        setImageSummary(post.imageSummary);
        setStatus(post.status === 1);
      } catch (error) {
        console.error("Lỗi tải bài viết", error);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { author, title, content, summary, imageSummary, status: status ? 1 : 0 };
    try {
      await newsService.updateNews(id, updatedData);
      alert("Bài viết đã được cập nhật!");
      onSuccess(); // Load lại danh sách tin tức
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow rounded">
      <h1 className="text-center text-2xl font-bold mb-4">Chỉnh Sửa Bài Viết</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên người đăng bài" className="w-full p-2 border rounded mb-3" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="text" placeholder="Tiêu đề" className="w-full p-2 border rounded mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label className="block font-bold mb-2">Nội dung bài viết:</label>
        <ReactQuill value={content} onChange={setContent} modules={modules} className="mb-4" />
        
        <label className="block font-bold mb-2">Tóm tắt bài viết:</label>
        <ReactQuill value={summary} onChange={setSummary} modules={modules} className="mb-4" />
        
        <label className="block font-bold mb-2">Hình ảnh tóm tắt:</label>
        <ReactQuill value={imageSummary} onChange={setImageSummary} modules={modules} className="mb-4" />
        
        <label className="block font-bold mb-2 flex items-center">
          <input type="checkbox" className="mr-2" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          Kích hoạt bài viết
        </label>
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Cập Nhật</button>
      </form>
    </div>
  );
}
