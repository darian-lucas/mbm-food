const API_URL = "http://localhost:3001/api/posts";

export interface Post {
  _id: string;
  title: string;
  create_at: string | number | Date;
  summary: string;
  imageSummary?: string;
  author: string;
}

const fetchAPI = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Lỗi: ${res.status} - ${res.statusText}`);
    
    const data = await res.json();
    return (data?.posts ?? data) as T; // Nếu API trả về { posts: [...] }, chỉ lấy `posts`
  } catch (error) {
    console.error("Lỗi API:", error);
    throw error;
  }
};

// Lấy toàn bộ danh sách bài viết (hoặc có phân trang)
export const fetchNews = async (page?: number, limit?: number): Promise<Post[]> => {
  const query = page && limit ? `?page=${page}&limit=${limit}` : "";
  return fetchAPI<Post[]>(`${API_URL}${query}`);
};

// Lấy danh sách bài viết nổi bật (mặc định lấy 4 bài)
export const fetchFeaturedNews = async (): Promise<Post[]> => {
  return fetchAPI<Post[]>(`${API_URL}/newest/4`);
};

// Lấy chi tiết một bài viết theo `_id`
export const fetchNewsDetail = async (_id: string): Promise<Post | null> => {
  if (!_id) return null;
  return fetchAPI<Post>(`${API_URL}/${_id}`);
};
