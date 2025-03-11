const Email = require("../models/Email");
const { sendEmail } = require("../services/emailService");

const sendMailController = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        // Gửi email
        await sendEmail(to, subject, message);

        // Lưu vào database
        const email = new Email({ to, subject, message, status: "sent" });
        await email.save();

        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
    }
};

module.exports = { sendMailController };
