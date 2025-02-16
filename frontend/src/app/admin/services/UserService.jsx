const API_URL = "http://localhost:3001/api/user";

const getAllUsers = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};

const updateUser = async (id, updateData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    });
    return response.json();
};

const findUserByName = async (username) => {
    const response = await fetch(`${API_URL}/search?username=${username}`);
    return response.json();
};

export default { getAllUsers, deleteUser, register, login, updateUser, findUserByName };
