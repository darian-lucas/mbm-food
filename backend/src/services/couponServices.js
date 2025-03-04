const couponModel = require("../models/CouponModel");

exports.createCoupon = async ({
  code,
  discount,
  type,
  start_date,
  end_date,
  quantity,
}) => {
  const coupon = new couponModel({
    code,
    discount,
    type,
    start_date,
    end_date,
    quantity,
  });

  await coupon.save();
  return coupon;
};

exports.getCoupons = async () => {
  const coupon = await couponModel.find({});
  return coupon;
};

exports.getCouponById = async (id) => {
  return await couponModel.findById(id );
};

exports.updateCoupon = async (
  id,
  { code, discount, type, start_date, end_date, quantity }
) => {
  const coupon = await couponModel.findByIdAndUpdate(
    id,
    { code, discount, type, start_date, end_date, quantity },
    { new: true }
  );
  return coupon;
};

exports.deleteCoupon = async (id) => {
  const coupon = await Coupon.findByIdAndDelete(id);
  return coupon;
};
