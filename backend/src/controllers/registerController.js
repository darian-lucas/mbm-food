
const registerService = require('../services/registerServices');

// Tạo đơn đăng ký đặt bàn mới
exports.createRegister = async (req, res) => {
  try {
    const registerData = req.body;
    
    // Thêm id của người dùng hiện tại nếu không được cung cấp
    if (!registerData.id_user && req.user) {
      registerData.id_user = req.user.id;
    }
    
    const newRegister = await registerService.createRegister(registerData);
    
    return res.status(201).json({
      success: true,
      message: 'Đăng ký đặt bàn thành công',
      data: newRegister
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy tất cả đơn đăng ký
exports.getAllRegisters = async (req, res) => {
  try {
    const registers = await registerService.getAllRegisters();
    
    return res.status(200).json({
      success: true,
      count: registers.length,
      data: registers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách đăng ký',
      error: error.message
    });
  }
};

// Lấy đơn đăng ký theo ID
exports.getRegisterById = async (req, res) => {
  try {
    const register = await registerService.getRegisterById(req.params.id);
    
    return res.status(200).json({
      success: true,
      data: register
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy đơn đăng ký theo user ID
exports.getRegistersByUser = async (req, res) => {
  try {
    // Sử dụng ID từ params hoặc từ user đã xác thực
    const userId = req.params.userId || (req.user && req.user.id);
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Không có ID người dùng'
      });
    }
    
    const registers = await registerService.getRegistersByUserId(userId);
    
    return res.status(200).json({
      success: true,
      count: registers.length,
      data: registers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách đăng ký',
      error: error.message
    });
  }
};

// Cập nhật đơn đăng ký
exports.updateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedRegister = await registerService.updateRegister(id, updateData);
    
    return res.status(200).json({
      success: true,
      message: 'Cập nhật đăng ký thành công',
      data: updatedRegister
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Hủy đơn đăng ký
exports.cancelRegister = async (req, res) => {
  try {
    const { id } = req.params;
    
    const cancelledRegister = await registerService.cancelRegister(id);
    
    return res.status(200).json({
      success: true,
      message: 'Hủy đăng ký thành công',
      data: cancelledRegister
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Hoàn thành đơn đăng ký (khách hàng đã dùng xong)
exports.completeRegister = async (req, res) => {
  try {
    const { id } = req.params;
    
    const completedRegister = await registerService.completeRegister(id);
    
    return res.status(200).json({
      success: true,
      message: 'Hoàn thành đăng ký thành công, bàn đã được giải phóng',
      data: completedRegister
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Xóa đơn đăng ký
exports.deleteRegister = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await registerService.deleteRegister(id);
    
    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};