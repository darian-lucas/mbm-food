const express = require("express");
const router = express.Router();
const { getBreadcrumbName } = require("../controllers/breadcrumbController");

router.get("/", getBreadcrumbName);

module.exports = router;
