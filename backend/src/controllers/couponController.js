const couponServices = require("../services/couponServices");

exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, type, start_date, end_date, quantity } = req.body;
    const newCoupon = await couponServices.createCoupon({
      code,
      discount,
      type,
      start_date,
      end_date,
      quantity,
    });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo mã giảm giá", error });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await couponServices.getCoupons();
    res.status(200).json({ data: coupons });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách mã giảm giá", error });
  }
};

exports.getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await couponServices.getCouponById(id);
    res.status(200).json({ data: coupon });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy mã giảm giá", error });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoupon = await couponServices.updateCoupon(id, req.body);
    res.status(200).json({ success: true, data: updatedCoupon });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật mã giảm giá", error });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await couponServices.deleteCoupon(id);
    res.status(200).json({ message: "Xóa mã giảm giá thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa mã giảm giá", error });
  }
};
