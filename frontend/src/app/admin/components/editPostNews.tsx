"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import newsService from "../services/NewsService";
import slugify from "slugify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function PostEditor() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageSummary, setImageSummary] = useState("");
  const [status, setStatus] = useState(false);

  const quillRef = useRef(null);
  const summaryQuillRef = useRef(null);
  const imageQuillRef = useRef(null);

  const handleImageUpload = (editorRef) => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;
    
    const imageUrl = prompt("Nhập URL của hình ảnh:");
    if (imageUrl) {
      const range = editor.getSelection();
      editor.insertEmbed(range?.index || 0, "image", imageUrl);
    }
  };

  const fullModules = {
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
        image: () => handleImageUpload(quillRef),
      },
    },
  };

  const textOnlyModules = {
    toolbar: [["bold", "italic", "underline"], ["blockquote"]],
  };

  const imageOnlyModules = {
    toolbar: {
      container: [["image"]],
      handlers: {
        image: () => handleImageUpload(imageQuillRef),
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      author,
      title,
      slug,
      content,
      summary,
      imageSummary,
      status: status ? 1 : 0,
    };
    try {
      await newsService.addNews(postData);
      alert("Bài viết đã được đăng!");
    } catch (error) {
      alert("Có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header">
          <h3>Update</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên người đăng bài</label>
              <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Tiêu đề</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Slug URL</label>
              <input type="text" className="form-control" value={slug} onChange={(e) => setSlug(slugify(e.target.value, { lower: true }))} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Nội dung bài viết</label>
              <ReactQuill ref={quillRef} value={content} onChange={setContent} modules={fullModules} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Tóm tắt bài viết</label>
              <ReactQuill ref={summaryQuillRef} value={summary} onChange={setSummary} modules={textOnlyModules} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Hình ảnh tóm tắt</label>
              <ReactQuill ref={imageQuillRef} value={imageSummary} onChange={setImageSummary} modules={imageOnlyModules} className="form-control" />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" checked={status} onChange={(e) => setStatus(e.target.checked)} />
              <label className="form-check-label">Kích hoạt bài viết</label>
            </div>

            <button type="submit" className="btn btn-primary w-100">Đăng bài</button>
          </form>
        </div>
      </div>
    </div>
  );
}