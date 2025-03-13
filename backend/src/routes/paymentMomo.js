const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

router.post("/momo", async (req, res) => {
  try {
    const { amount, orderId, orderInfo } = req.body;

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const requestId = orderId;
    const returnUrl = "http://localhost:3000/payment-success";
    const notifyUrl = "http://localhost:3000/api/payment/momo-notify";

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      returnUrl,
      notifyUrl,
      requestType: "captureWallet",
      extraData: "",
      lang: "vi",
    };

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${requestBody.extraData}&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestBody.requestType}`;

    requestBody.signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const response = await axios.post(process.env.MOMO_API_ENDPOINT, requestBody);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Payment request failed" });
  }
});

module.exports = router;
