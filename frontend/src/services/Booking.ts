import { TCreateRegisterParams } from "@/types/enum";

const API_URL_TABLE = "http://localhost:3001/api/tables";
const API_URL_USER = "http://localhost:3001/api/user";
const API_URL_REGISTER = "http://localhost:3001/api/registers";

const getAllTables = async () => {
  try {
    const response = await fetch(API_URL_TABLE);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};

const getUserById = async (id:string) => {
  try {
    const response = await fetch(`${API_URL_USER}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};

const getTableById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL_TABLE}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};

const createRegister = async (data: TCreateRegisterParams) => {
  try {
    const response = await fetch(API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    throw error; 
  }
};

const BookingServices = {
  getAllTables,
  getTableById,
  createRegister,
  getUserById,
};
export default BookingServices;
