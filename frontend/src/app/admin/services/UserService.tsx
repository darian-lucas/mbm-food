const API_URL = "http://localhost:3001/api/user";

const getAllUsers = async (page = 1, limit = 5) => {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    return response.json();
};

const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
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

const activateUser = async (id, isActive) => {
    const response = await fetch(`${API_URL}/${id}/activate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
    });
    return response.json();
};

export default { 
    getAllUsers, 
    getUserById, 
    deleteUser, 
    register, 
    login, 
    updateUser, 
    findUserByName, 
    activateUser 
};
