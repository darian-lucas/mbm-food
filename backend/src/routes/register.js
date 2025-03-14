const express = require("express");
const router = express.Router();
const {
  createRegister,
  getAllRegisters,
  getRegisterById,
  getRegistersByUser,
  updateRegister,
  cancelRegister,
  completeRegister,
  deleteRegister,
} = require("../controllers/registerController");

router.post("/", createRegister);

router.get("/", getAllRegisters);

router.get("/:id", getRegisterById);

router.get("/user/me", getRegistersByUser);

router.get("/user/:userId", getRegistersByUser);

router.put("/:id", updateRegister);

router.patch("/:id/cancel", cancelRegister);

router.patch("/:id/complete", completeRegister);

router.delete("/:id", deleteRegister);

module.exports = router;
