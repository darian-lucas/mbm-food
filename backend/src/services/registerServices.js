const Register = require('../models/RegisterModel');
const User = require('../models/User');
const Table = require('../models/TableModel');

exports.createRegister = async (registerData) => {
  try {
    const user = await User.findById(registerData.id_user);
    if (!user) {
      throw new Error('User không tồn tại');
    }

    const table = await Table.findById(registerData.id_table);
    if (!table) {
      throw new Error('Bàn không tồn tại');
    }
    
    if (table.status !== 'available') {
      throw new Error('Bàn này đã được đặt');
    }

    // Kiểm tra nếu bàn đã được đặt vào thời gian này
    const existingRegistration = await Register.findOne({
      id_table: registerData.id_table,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingRegistration) {
      throw new Error('Bàn này đã được đặt và chưa hoàn thành');
    }

    // Tạo đơn đăng ký mới
    const newRegister = new Register({
      id_user: registerData.id_user,
      id_table: registerData.id_table,
      create_at: new Date(),
      start_time: registerData.start_time,
      status: 'pending' // Mặc định là pending, sau đó có thể là confirmed, cancelled, completed
    });

    // Lưu vào database
    await newRegister.save();

    // Cập nhật trạng thái của bàn
    await Table.findByIdAndUpdate(registerData.id_table, { status: 'reserved' });

    return newRegister;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả đơn đăng ký
exports.getAllRegisters = async () => {
  try {
    const registers = await Register.find()
      .populate('id_user', 'username email avatar')
      .populate('id_table', 'position name img status');
    return registers;
  } catch (error) {
    throw error;
  }
};

// Lấy đơn đăng ký theo ID
exports.getRegisterById = async (id) => {
  try {
    const register = await Register.findById(id)
      .populate('id_user', 'username email avatar')
      .populate('id_table', 'position name img status');
    
    if (!register) {
      throw new Error('Không tìm thấy đơn đăng ký');
    }
    
    return register;
  } catch (error) {
    throw error;
  }
};

// Lấy đơn đăng ký theo user ID
exports.getRegistersByUserId = async (userId) => {
  try {
    const registers = await Register.find({ id_user: userId })
      .populate('id_user', 'username email avatar')
      .populate('id_table', 'position name img status');
    return registers;
  } catch (error) {
    throw error;
  }
};

// Cập nhật đơn đăng ký
exports.updateRegister = async (id, updateData) => {
  try {
    // Kiểm tra nếu đang thay đổi bàn
    if (updateData.id_table) {
      const table = await Table.findById(updateData.id_table);
      if (!table) {
        throw new Error('Bàn không tồn tại');
      }
      
      if (table.status !== 'available') {
        throw new Error('Bàn này đã được đặt');
      }
    }

    // Tìm đơn đăng ký cũ
    const existingRegister = await Register.findById(id);
    if (!existingRegister) {
      throw new Error('Không tìm thấy đơn đăng ký');
    }

    // Nếu đổi bàn, cập nhật trạng thái bàn cũ
    if (updateData.id_table && updateData.id_table !== existingRegister.id_table.toString()) {
      await Table.findByIdAndUpdate(existingRegister.id_table, { status: 'available' });
      await Table.findByIdAndUpdate(updateData.id_table, { status: 'reserved' });
    }

    // Cập nhật đơn đăng ký
    const updatedRegister = await Register.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    ).populate('id_user', 'username email avatar')
      .populate('id_table', 'position name img status');

    return updatedRegister;
  } catch (error) {
    throw error;
  }
};

// Hủy đơn đăng ký
exports.cancelRegister = async (id) => {
  try {
    const register = await Register.findById(id);
    if (!register) {
      throw new Error('Không tìm thấy đơn đăng ký');
    }

    // Cập nhật trạng thái đơn đăng ký
    register.status = 'cancelled';
    await register.save();

    // Cập nhật trạng thái bàn
    await Table.findByIdAndUpdate(register.id_table, { status: 'available' });

    return register;
  } catch (error) {
    throw error;
  }
};

// Hoàn thành đơn đăng ký (khách hàng đã dùng xong)
exports.completeRegister = async (id) => {
  try {
    const register = await Register.findById(id);
    if (!register) {
      throw new Error('Không tìm thấy đơn đăng ký');
    }

    // Cập nhật trạng thái đơn đăng ký
    register.status = 'completed';
    await register.save();

    // Cập nhật trạng thái bàn
    await Table.findByIdAndUpdate(register.id_table, { status: 'available' });

    return register;
  } catch (error) {
    throw error;
  }
};

// Xóa đơn đăng ký
exports.deleteRegister = async (id) => {
  try {
    const register = await Register.findById(id);
    if (!register) {
      throw new Error('Không tìm thấy đơn đăng ký');
    }

    // Cập nhật trạng thái bàn nếu đơn đăng ký còn hiệu lực
    if (register.status === 'pending' || register.status === 'confirmed') {
      await Table.findByIdAndUpdate(register.id_table, { status: 'available' });
    }

    await Register.findByIdAndDelete(id);
    return { message: 'Đã xóa đơn đăng ký thành công' };
  } catch (error) {
    throw error;
  }
};