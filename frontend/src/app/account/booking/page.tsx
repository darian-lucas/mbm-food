"use client";
import BookingServices from "@/services/Booking";
import React, { useEffect, useState } from "react";

interface Register {
  _id: string;
  id_table: {
    name: string;
    position: string;
  };
  start_time: string;
  create_at: string;
  status: string;
}

const ShowHistoryBooking = () => {
  const [registers, setRegisters] = useState<Register[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await BookingServices.getAllRegisters();
      setRegisters(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Đơn đặt bàn của bạn</h2>
      <table>
        <thead>
          <tr>
            <th>Bàn</th>
            <th>Vị trí</th>
            <th>Thời gian bắt đầu</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {registers.map((register) => (
            <tr key={register._id}>
              <td>{register.id_table.name}</td>
              <td>{register.id_table.position}</td>
              <td>{register.start_time}</td>
              <td>{register.create_at}</td>
              <td>{register.status}</td>
              <td>
                <button>Hủy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowHistoryBooking;
