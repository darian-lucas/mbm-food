const breadcrumbService = require("../services/breadcrumbService");

const getBreadcrumbName = async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Thiếu slug" });
  }

  try {
    const name = await breadcrumbService.getNameBySlug(slug);
    if (!name) return res.status(404).json({ error: "Không tìm thấy tên" });

    res.json({ name });
  } catch (err) {
    console.error("Lỗi khi lấy breadcrumb:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

module.exports = {
  getBreadcrumbName,
};
