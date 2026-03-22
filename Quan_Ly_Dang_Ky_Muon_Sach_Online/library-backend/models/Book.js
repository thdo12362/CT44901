const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  author: { type: String, required: true }, 
  description: { type: String }, 
  // Thêm trường ảnh bìa
  image: { type: String }, 
  // Thêm trường thể loại (Khớp 100% với Frontend)
  category: { 
    type: String, 
    enum: ['Văn học', 'Khoa học', 'Công nghệ', 'Kinh tế', 'Tâm lý', 'Giáo trình'],
    required: true 
  },
  quantity: { type: Number, default: 1 }, 
  status: { type: String, enum: ['AVAILABLE', 'OUT_OF_STOCK'], default: 'AVAILABLE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // 👉 ĐÃ THÊM TRƯỜNG NÀY ĐỂ THEO DÕI SỐ LƯỢT MƯỢN
  borrowCount: { type: Number, default: 0 } 

}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);