"use client";

import { useState, useEffect } from "react";

interface Comment {
  _id: string;
  id_user: { username: string; email: string };
  id_post: string;
  comment: string;
  create_at: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [postId]);

  // Lấy danh sách bình luận theo từng bài viết
  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cmt/post/${postId}`
      );
      if (!response.ok) throw new Error("Lỗi tải bình luận");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Lỗi lấy bình luận:", error);
      setComments([]); // Tránh lỗi nếu API không trả về dữ liệu
    }
  };

  // Gửi bình luận mới
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert("Vui lòng nhập đầy đủ họ tên và email.");
      return;
    }
    if (!newComment.trim()) {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/cmt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId || "guest",
        },
        body: JSON.stringify({
          postId,
          comment: newComment,
          username: fullName,
          email: email,
        }),
      });

      if (response.ok) {
        setNewComment("");
        setFullName("");
        setEmail("");
        fetchComments(postId); // Load lại bình luận sau khi gửi thành công
      } else {
        console.error("Lỗi khi gửi bình luận.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="col-12 order-lg-3">
      <div className="thump-comment">
        <form onSubmit={handleCommentSubmit}>
          <div className="form-comment">
            <div className="title-page">
              <span>Viết bình luận của bạn</span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    className="form-control form-control-lg"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
              <div className="col-md-6">
                <fieldset className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
              </div>
              <fieldset className="form-group col-lg-12">
                <textarea
                  placeholder="Nội dung bình luận..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="form-control"
                  required
                ></textarea>
              </fieldset>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Gửi bình luận
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Danh sách bình luận */}
        <div id="article-comments">
          <h5 style={{ paddingTop: "10px" }} className="title-form-comment margin-bottom-25">
            Bình luận ({comments.length})
          </h5>
          {comments.length === 0 ? (
            <p className="text-muted">Chưa có bình luận nào.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="article-comment clearfix">
                <figure className="article-comment-user-image">
                  <img src="" alt="user-avatar" className="block" />
                </figure>
                <div className="article-comment-user-comment">
                  <p className="user-name-comment">
                    <strong>{comment.id_user?.username || "Ẩn danh"}</strong>{" "}
                  </p>
                  <span className="article-comment-date-bull">
                    {comment.create_at
                      ? new Date(comment.create_at).toLocaleDateString()
                      : "Không xác định"}
                  </span>
                  <p className="cm">{comment.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
