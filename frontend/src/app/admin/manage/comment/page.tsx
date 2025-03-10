"use client";
import { useState, useEffect } from "react";
import { getAllComments, hideComment } from "../../services/cmtServices";
import { Table, Button, Pagination } from "react-bootstrap";

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5; // Số bình luận trên mỗi trang

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const data = await getAllComments();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleToggleVisibility = async (commentId) => {
        try {
            await hideComment(commentId);
            fetchComments(); // Cập nhật lại danh sách
        } catch (error) {
            console.error("Error toggling comment visibility:", error);
        }
    };

    // Tính toán số trang
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    return (
        <div className="container mt-4">
            <h3 className="mb-4 fs-3 fw-bold">Danh sách Bình luận</h3>

            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white text-center">
                    <tr>
                        <th>Người bình luận</th>
                        <th>Bài viết</th>
                        <th>Thời điểm</th>
                        <th>Nội dung</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentComments.map((cmt) => (
                        <tr key={cmt._id} className="text-center">
                            <td>{cmt.id_user?.username || "Ẩn danh"}</td>
                            <td>{cmt.id_post?.title || "Không xác định"}</td>
                            <td>{new Date(cmt.create_at).toLocaleString()}</td>
                            <td>{cmt.hidden ? "(Bình luận đã ẩn)" : cmt.comment}</td>
                            <td>
                                <Button
                                    variant={cmt.hidden ? "success" : "warning"}
                                    size="sm"
                                    onClick={() => handleToggleVisibility(cmt._id)}
                                >
                                    {cmt.hidden ? "Hiện" : "Ẩn"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Phân trang */}
            <Pagination className="justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}