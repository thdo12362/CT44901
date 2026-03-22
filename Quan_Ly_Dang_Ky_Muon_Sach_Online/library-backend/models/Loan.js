const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true }, // Ngày hẹn trả
  status: { 
    type: String, 
    // ĐÃ CẬP NHẬT: Cho khớp 100% với giao diện Frontend MyBooks
    enum: ['PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'], 
    default: 'PENDING' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);