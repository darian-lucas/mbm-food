const API_URL = "http://localhost:3001/api/products";

const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};

const getProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Lấy sản phẩm thất bại");
  return response.json();
};

const createProduct = async (formData: FormData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Lỗi khi tạo sản phẩm: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
  }
};

const getProductBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/slug/${slug}`);
  if (!response.ok) throw new Error("Lấy sản phẩm thất bại");
  return response.json();
};

const updateProduct = async (id: string, data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return null;
  }
};

const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Xóa sản phẩm thất bại");
  return response.json();
};

const ProductServices = {
  getAllProducts,
  deleteProduct,
  createProduct,
  getProductById,
  updateProduct,
  getProductBySlug
};

export default ProductServices;
