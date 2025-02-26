"use client";

import React, { useEffect, useState } from "react";
import newsService from "../../services/NewsService";
import styles from "../../styles/newsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddNews from "../../components/addPostNews";
import EditNews from "../../components/editPostNews";

export default function NewsTable() {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 2; // Số bài viết mỗi trang

    useEffect(() => {
        loadNews(page);
    }, [page]);

    const loadNews = async (currentPage: number) => {
        try {
            const { posts, totalPages } = await newsService.getAllNews(currentPage, limit);
            setNews(posts);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Lỗi khi tải danh sách bài viết:", error);
        }
    };

    const handleDelete = async (id: string) => {
        await newsService.deleteNews(id);
        loadNews(page);
    };

    // Hàm tìm kiếm với debounce
    let debounceTimer: NodeJS.Timeout;
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (value.trim() === "") {
                loadNews(page);
            } else {
                try {
                    const data = await newsService.searchNewsByTitle(value);
                    setNews(data);
                } catch (error) {
                    console.error("Lỗi tìm kiếm bài viết:", error);
                }
            }
        }, 300);
    };

    const handleAdd = () => setIsAdding(true);
    const handleEdit = (id: string) => {
        setEditId(id);
        setIsEditing(true);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.mainTitle}>
                <h4>News Management</h4>
                <div className={styles.titleTable}>
                    <p>Admin/</p>
                    <p className={styles.titles}>News List</p>
                </div>
            </div>

            <div className={styles.headerActions}>
                <button className={styles.addButton} onClick={handleAdd}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm bài viết
                </button>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm tiêu đề..."
                        value={search}
                        onChange={handleInputChange}
                    />
                    <button onClick={() => loadNews(page)}>🔍</button>
                </div>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Ngày đăng</th>
                        <th>Hình ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((post, index) => (
                        <tr key={post._id}>
                            <td>{(page - 1) * limit + index + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{new Date(post.create_at).toLocaleDateString()}</td>
                            <td>
                                <div className={styles.imageSummary} dangerouslySetInnerHTML={{ __html: post.imageSummary }} />
                            </td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(post._id)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        console.log("Xác nhận xóa bài viết:", post._id);
                                        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
                                        if (confirmDelete) {
                                            handleDelete(post._id);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            {search.trim() === "" && (
                <div className={`${styles.pagination} d-flex justify-content-center align-items-center`}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        &laquo; Prev
                    </button>
                    <span className="mx-3">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="btn btn-primary"
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}


            {/* Modal Thêm Bài Viết */}
            {isAdding && (
                <div className={styles.overlays}>
                    <div className={styles.modals}>
                        <button className={styles.closeButton} onClick={() => setIsAdding(false)}>✖</button>
                        <AddNews onClose={() => setIsAdding(false)} onSuccess={() => loadNews(page)} />
                    </div>
                </div>
            )}

            {/* Modal Chỉnh Sửa Bài Viết */}
            {isEditing && (
                <div className={styles.overlays}>
                    <div className={styles.modals}>
                        <button className={styles.closeButton} onClick={() => setIsEditing(false)}>✖</button>
                        <EditNews id={editId} onClose={() => setIsEditing(false)} onSuccess={() => loadNews(page)} />
                    </div>
                </div>
            )}
        </div>
    );
}
