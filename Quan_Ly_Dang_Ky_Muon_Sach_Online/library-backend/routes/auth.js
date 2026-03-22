const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Bạn đang dùng bcrypt chuẩn, rất tốt!
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==========================================
// 1. API Đăng ký tài khoản mới
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { username, password, fullName, email } = req.body;

    // Kiểm tra tài khoản hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Tên đăng nhập hoặc Email đã tồn tại!' });
    }

    // Mã hóa mật khẩu (bảo mật hơn so với việc lưu mật khẩu thô)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu vào Database (Mặc định cấp quyền MEMBER - Độc giả)
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      email,
      role: 'MEMBER' 
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Đăng ký tài khoản thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi Server: ' + error.message });
  }
});

// ==========================================
// 2. API Đăng nhập
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm người dùng trong DB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }

    // Kiểm tra xem tài khoản có bị thủ thư khóa không
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Thủ thư!' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }

    // Tạo mã Token (Phiên đăng nhập)
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token hết hạn sau 1 ngày
    );

    // Trả về dữ liệu cho Vue.js
    res.json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi Server: ' + error.message });
  }
});

// ==========================================
// 3. API: Lấy thông tin User hiện tại
// ==========================================
router.get('/users/:id', async (req, res) => {
  try {
    // Tìm user bằng ID, dùng .select('-password') để không trả về mật khẩu mã hóa cho an toàn
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản!' });
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. API: Cập nhật thông tin cá nhân
// ==========================================
router.put('/users/:id', async (req, res) => {
  try {
    const { username, email } = req.body;

    // Kiểm tra xem Tên hoặc Email mới có bị trùng với người khác không
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.params.id } // Bỏ qua chính bản thân mình
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Tên đăng nhập hoặc Email này đã có người sử dụng!' });
    }

    // Tiến hành cập nhật
    await User.findByIdAndUpdate(req.params.id, { username, email });
    res.json({ success: true, message: 'Đã cập nhật thông tin thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. API: Đổi mật khẩu
// ==========================================
router.put('/users/:id/password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản!' });

    // So sánh mật khẩu cũ người dùng nhập vào với mật khẩu trong Database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng!' });
    }

    // Băm (Hash) mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Lưu mật khẩu mới vào DB
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;