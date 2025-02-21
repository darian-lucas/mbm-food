"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import newsService from "../services/NewsService";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      [{ align: [] }],
      [{ header: "1" }, { header: "2" }, { font: [] }],
    ],
    handlers: {
      image: function () {
        const editor = this.quill;
        const imageUrl = prompt("Nhập URL của hình ảnh:");
        if (imageUrl) {
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", imageUrl);
        }
      },
    },
  },
};

export default function PostEditor() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageSummary, setImageSummary] = useState("");
  const [view, setView] = useState(0);
  const [hot, setHot] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { author, title, content, summary, imageSummary, view, hot, status: 1 };

    try {
      await newsService.addNews(postData);
      alert("Bài viết đã được đăng!");
    } catch (error) {
      alert("Có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow rounded">
      <h1 className="text-center text-2xl font-bold mb-4">Đăng Bài Viết</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên người đăng bài" className="w-full p-2 border rounded mb-3" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="text" placeholder="Tiêu đề" className="w-full p-2 border rounded mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label className="block font-bold mb-2">Nội dung bài viết:</label>
        <ReactQuill value={content} onChange={setContent} modules={modules} className="mb-4" />
        
        <label className="block font-bold mb-2">Tóm tắt bài viết:</label>
        <ReactQuill value={summary} onChange={setSummary} modules={modules} className="mb-4" />
        
        <label className="block font-bold mb-2">Hình ảnh tóm tắt:</label>
        <ReactQuill value={imageSummary} onChange={setImageSummary} modules={modules} className="mb-4" />
        
        <input type="number" placeholder="Số lượt xem" className="w-full p-2 border rounded mb-3" value={view} onChange={(e) => setView(Number(e.target.value))} required />
        
        <select className="w-full p-2 border rounded mb-3" value={hot} onChange={(e) => setHot(Number(e.target.value))}>
          <option value={0}>Không</option>
          <option value={1}>Có</option>
        </select>
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Đăng bài</button>
      </form>
    </div>
  );
}
