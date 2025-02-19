// import { TCreateCategoryParams } from "../types";

const API_URL = "http://localhost:3001/api/categories";

const getAllCategories = async () => {
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

const createCategory = async (formData: FormData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData, // Gửi FormData thay vì JSON
    });
    if (!response.ok) {
      throw new Error(`Lỗi khi tạo danh mục: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error);
  }
};

const deleteCategory = async (id:string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Xóa danh mục thất bại");
  return response.json();
};


const CategoryServices = { getAllCategories, createCategory,deleteCategory };

export default CategoryServices;
