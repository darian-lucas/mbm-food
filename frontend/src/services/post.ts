export interface Post {
  _id: string;
  title: string;
  create_at: string | number | Date;
  summary: string;
  imageSummary?: string;
}

export const fetchNews = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3001/api/posts");
  if (!res.ok) throw new Error("Lỗi khi lấy tin tức!");
  return res.json();
};

export const fetchFeaturedNews = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3001/api/posts/newest/4");
  if (!res.ok) throw new Error("Lỗi khi lấy tin nổi bật!");
  return res.json();
};

export interface Post {
  _id: string;
  title: string;
  create_at: string | number | Date;
  content: string;
  imageSummary?: string;
  author: string;
}

export const fetchNewsDetail = async (_id: string): Promise<Post | null> => {
  if (!_id) return null; // Kiểm tra id hợp lệ

  try {
    const res = await fetch(`http://localhost:3001/api/posts/${_id}`);

    if (!res.ok) throw new Error("Bài viết không tồn tại");

    return await res.json();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    return null;
  }
};

