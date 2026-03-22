const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Đổi từ PasswordHash
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['ADMIN', 'MEMBER'], default: 'MEMBER' },
  isActive: { type: Boolean, default: true } // Dùng để khóa tài khoản sinh viên vi phạm
}, { timestamps: true }); // Tự động tạo createdAt và updatedAt

module.exports = mongoose.model('User', userSchema);