const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Email của ngài
            pass: process.env.EMAIL_PASS  // Mật khẩu ứng dụng
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: message
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
