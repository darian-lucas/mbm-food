const API_URL = "http://localhost:3001/api/favorite";

const fetchAPI = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Lỗi API:", error);
        return { error: true, message: error instanceof Error ? error.message : "Lỗi không xác định" };
    }
};

export const addFavorite = async (id_product: string, token: string) => {
    return fetchAPI(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_product }),
    });
};

export const getFavorites = async (token: string, fetchFavorites?: () => void) => {
    const data = await fetchAPI(`${API_URL}/list`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (Array.isArray(data) && fetchFavorites) {
        fetchFavorites(); // Cập nhật danh sách ngay
    }

    return data;
};


export const removeFavorite = async (id_product: string, token: string) => {
    return fetchAPI(`${API_URL}/remove/${id_product}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const checkFavorite = async (id_product: string, token: string) => {
    return fetchAPI(`${API_URL}/check/${id_product}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
