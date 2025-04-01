/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Booking.module.css";
import { toast } from "react-toastify";
import BookingServices from "@/services/Booking";
import { jwtDecode } from "jwt-decode";

interface Register {
  _id: string;
  id_user: {
    _id: string;
    username: string;
    email: string;
  };
  id_table: {
    _id: string;
    name: string;
    position: string;
  };
  start_time: string;
  createdAt: string;
  note: string;
  status: "Confirmed" | "Completed" | "Cancelled";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return styles.confirmed;
    case "Cancelled":
      return styles.cancelled;
    case "Completed":
      return styles.completed;
    default:
      return "";
  }
};

const ShowHistoryBooking = () => {
  const [registers, setRegisters] = useState<Register[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");

  const cancelReasons = [
    "Thay đổi kế hoạch đột xuất",
    "Thời tiết xấu hoặc giao thông bất lợi",
    "Tìm được nhà hàng khác phù hợp hơn"
  ];

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = (decodedToken as { userId: string })?.userId;

          const data = await BookingServices.getRegistersByUser(userId);
          setRegisters(data);
        }
      } catch (error) {
        toast.error("Không thể tải dữ liệu đặt bàn, vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCancelModal = (register: Register) => {
    if (register.status !== "Confirmed") {
      toast.info("Chỉ có thể hủy đơn đặt bàn ở trạng thái Confirmed!");
      return;
    }
    
    setSelectedRegister(register);
    setCancelReason(cancelReasons[0]);
    setShowCancelModal(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedRegister || !cancelReason) {
      toast.error("Vui lòng chọn lý do hủy đơn!");
      return;
    }

    try {
      await BookingServices.updateRegisterStatus(selectedRegister._id, "Cancelled", cancelReason);

      setRegisters((prev) =>
        prev.map((item) =>
          item._id === selectedRegister._id ? { ...item, status: "Cancelled", note: cancelReason } : item
        )
      );

      toast.success("Đã hủy đơn đặt bàn thành công!");
      setShowCancelModal(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi hủy đơn đặt bàn!");
    }
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setSelectedRegister(null);
    setCancelReason("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Đơn đặt bàn của bạn</h2>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Thời gian bắt đầu</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {registers.length > 0 ? (
              registers.map((register) => (
                <tr key={register._id}>
                  <td>{register.id_table.name}</td>
                  <td>{register.start_time}</td>
                  <td>{formatDate(register.createdAt)}</td>
                  <td>
                    <span
                      className={`${styles.status} ${getStatusColor(
                        register.status
                      )}`}
                    >
                      {register.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles.cancelButton} ${
                        register.status !== "Confirmed" ? styles.disabled : ""
                      }`}
                      onClick={() => openCancelModal(register)}
                      disabled={register.status !== "Confirmed"}
                      title={
                        register.status !== "Confirmed"
                          ? "Không thể hủy đơn này"
                          : "Nhấn để hủy đơn"
                      }
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyMessage}>
                  Không có đơn đặt bàn nào!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Xác nhận hủy đơn đặt bàn</h3>
            <p>Vui lòng chọn lý do hủy đơn:</p>
            
            <div className={styles.reasonContainer}>
              {cancelReasons.map((reason, index) => (
                <div key={index} className={styles.reasonOption}>
                  <input
                    type="radio"
                    id={`reason-${index}`}
                    name="cancelReason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={() => setCancelReason(reason)}
                  />
                  <label htmlFor={`reason-${index}`}>{reason}</label>
                </div>
              ))}
            </div>
            
            <div className={styles.modalButtons}>
              <button 
                className={styles.confirmCancelButton}
                onClick={handleCancelBooking}
              >
                Xác nhận hủy
              </button>
              <button 
                className={styles.keepButton}
                onClick={closeModal}
              >
                Giữ nguyên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowHistoryBooking;