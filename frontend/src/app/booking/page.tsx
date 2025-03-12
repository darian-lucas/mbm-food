"use client";
import Breadcrum from "@/components/common/Breadcrum";
import BookingServices from "@/services/Booking";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Table {
  _id: string;
  name: string;
  position: string;
}

const Page = () => {
  // const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dataTable, setDataTable] = useState<Table[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const handleLogin = () => {
    if (!token) {
      // return router.push("/login");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await BookingServices.getAllTables();
      setDataTable(result);
    };
    fetchData();
  }, []);
  return (
    <section className="w-full">
      <Breadcrum></Breadcrum>
      <div className="heading max-w-[1300px] mx-auto py-3 text-center">
        <h2 className="text-[36px] font-semibold text-[#006a31] mb-[40px] mt-2">
          Đặt bàn
        </h2>
      </div>
      <div className="content bg-[url(https://bizweb.dktcdn.net/100/510/571/themes/941527/assets/datlich.png?1727255430829)] bg-cover py-[100px] h-[657px]">
        <div className="row-item flex max-w-[1300px] mx-auto gap-x-8">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <div className="thumb-time rounded-lg bg-[#fff] p-4 h-full">
              <div className="font-[lobster] text-[30px] text-[#e31837] pb-[10px] text-center mb-[20px] border-b-2 border-b-[#e31837]">
                Thời gian mở cửa
              </div>
              <ul className="list-time ">
                <li className="flex items-center justify-between py-[10px] border-b-2 border-b-[#d4cece] font-semibold">
                  <span>Thứ 2 - Thứ 6</span>
                  <span>08:00 - 21:30</span>
                </li>
                <li className="flex items-center justify-between py-[10px] border-b-2 border-b-[#d4cece] font-semibold">
                  <span>Thứ 7 - Chủ nhật</span>
                  <span>09:00 - 22:30</span>
                </li>
                <li className="flex items-center justify-between py-[10px] border-b-2 border-b-[#d4cece] font-semibold">
                  <span>Ngày lễ</span>
                  <span>09:00 - 22:30</span>
                </li>
              </ul>
              <div className="font-[lobster] text-[30px] text-[#e31837] pb-[10px] text-center mb-[20px] border-b-2 border-b-[#e31837]">
                Gọi ngay
              </div>
              <div className="text-center  text-[#006a31] text-[36px] font-semibold">
                1900 6750
              </div>
            </div>
          </div>
          <div className="flex-[0_0_50%] max-w-[50%]">
            <div className="thumb-time rounded-lg bg-[#006a31] p-4 h-full">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      placeholder="Họ và tên..."
                      className="w-full p-2 rounded-md bg-white text-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 rounded-md bg-white text-black outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Số điện thoại:
                    </label>
                    <input
                      type="text"
                      placeholder="Số điện thoại..."
                      className="w-full p-2 rounded-md bg-white text-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Chọn ngày:
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 rounded-md bg-white text-black outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 justify-center mt-4">
                  {dataTable.map((name, index) => (
                    <button
                      key={index}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:bg-red-600"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {hoveredIndex === index ? "Đặt bàn" : name.name}
                    </button>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="bg-[#e31837] text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-all"
                  >
                    Xác nhận đặt bàn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
