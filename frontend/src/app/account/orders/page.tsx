"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddressTable() {
  return (
    <div>
      <h5>ĐỊA CHỈ CỦA BẠN</h5>
      <button className="btn btn-red mb-3">Thêm địa chỉ</button>

      <table className="table table-bordered table-danger">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Địa chỉ</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>son son</td>
            <td>TP Hồ Chí Minh, Vietnam</td>
            <td className="text-danger">Địa chỉ mặc định</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
