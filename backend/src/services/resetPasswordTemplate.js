const resetPasswordTemplate = (resetLink) => {
  return `
    <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link sau để tiếp tục:</p>
    <a href="${resetLink}">Đặt lại mật khẩu</a>
    <p>Link có hiệu lực trong 5 phút.</p>
  `;
};

module.exports = resetPasswordTemplate;