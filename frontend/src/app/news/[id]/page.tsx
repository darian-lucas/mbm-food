"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchNewsDetail, Post } from "../../../services/post";
import "../../../styles/id.css";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // // Trích xuất URL ảnh từ chuỗi HTML (nếu có)
  // const extractImageSrc = (htmlString: string | undefined): string | null => {
  //   if (!htmlString) return null;
  //   const match = htmlString.match(/<img[^>]+src="([^">]+)"/);
  //   return match ? match[1] : null;
  // };
  // //Cắt bớt nội dung và giữ định dạng

  // // Lấy URL ảnh từ `imageSummary`
  // const imageSrc = extractImageSrc(post.imageSummary) || "/images/default.png";

  return (
    <div className="about-container">
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

      <article className="article-main">
        <div className="row">
          <div className="right-content col-lg-8 col-12">
            <div className="article-detail clearfix">
              <h1 className="article-title">{post.title}</h1>
              <div className="posts">
                <div className="time-post f">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="clock"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-clock fa-w-16"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"
                      className=""
                    ></path>
                  </svg>
                  {new Date(post.create_at).toLocaleDateString()}
                </div>
                <div className="time-post">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="svg-inline--fa fa-user fa-w-14"
                  >
                    <path
                      fill="currentColor"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                      className=""
                    ></path>
                  </svg>
                  <span>{post.author}</span>
                </div>
              </div>
              <div className="goto-wrapper ftoc-head">
                <a className="title-goto-wrapper">Nội dung chính</a>
                <div className="dola-toc">
                  <ol className="toc-list">
                    <li className="toc-list-item is-active-li">
                      <a
                        href=""
                        className="toc-link node-name--H2 is-active-link"
                      >
                        1. Mua bánh pizza ở đâu
                      </a>
                    </li>
                    <li className="toc-list-item">
                      <a href="" className="toc-link node-name--H2 ">
                        2. Nên chọn đế bánh pizza tươi hay đế bánh pizza làm
                        sẵn?
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
