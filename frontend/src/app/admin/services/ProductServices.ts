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

const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Xóa sản phẩm thất bại");
  return response.json();
};

const ProductServices = {
  getAllProducts,
  deleteProduct
};

export default ProductServices;
