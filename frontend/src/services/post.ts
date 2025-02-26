
export interface Post {
  _id: string;
  title: string;
  create_at: string | number | Date;
  summary: string;
  imageSummary?: string;
  slug: string;
}

export const fetchNews = async (): Promise<Post[]> => {
  try {
      const res = await fetch("http://localhost:3001/api/posts");
      if (!res.ok) throw new Error(`Lỗi khi lấy tin tức! Mã lỗi: ${res.status}`);

      const data = await res.json();

      if (!data.posts || !Array.isArray(data.posts)) {
          throw new Error("Dữ liệu không hợp lệ hoặc thiếu 'posts'");
      }

      console.log("Dữ liệu tin tức:", data.posts); // Kiểm tra dữ liệu
      return data.posts; // Chỉ lấy danh sách bài viết
  } catch (error) {
      console.error("Lỗi khi fetch tin tức:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
  }
};



export const fetchFeaturedNews = async (): Promise<Post[]> => {
  const res = await fetch(`http://localhost:3001/api/posts/newest/4`);
  if (!res.ok) throw new Error("Lỗi khi lấy tin nổi bật!");
  return res.json();
};

export interface Post { 
  _id: string;
  title: string;
  slug: string;
  create_at: string | number | Date;
  content: string;
  imageSummary?: string;
  author: string;
}

export const fetchNewsDetail = async (slug: string): Promise<Post | null> => {
  if (!slug) {
    console.error("fetchNewsDetail: Slug bị thiếu");
    return null;
  }

  try {
    const res = await fetch(`http://localhost:3001/api/posts/slug/${slug}`);
    if (!res.ok) throw new Error(`Bài viết không tồn tại! Mã lỗi: ${res.status}`);

    const data: Post = await res.json();
    console.log("Dữ liệu trả về:", data);

    // Kiểm tra xem dữ liệu trả về có đúng định dạng không
    if (!data || typeof data !== "object" ) {
      throw new Error("Dữ liệu không hợp lệ hoặc bài viết không tồn tại");
    }

    return data;
  } catch (error) {
    console.error("Lỗi khi fetch bài viết:", error);
    return null;
  }
};







