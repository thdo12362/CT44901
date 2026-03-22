const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const User = require('../models/User'); // Đã chuyển lên đầu cho chuẩn

// ==========================================
// API DÀNH CHO ĐỘC GIẢ (USER)
// ==========================================

// 1. API: Lấy danh sách toàn bộ sách trong thư viện
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
  }
});

// 2. API: Độc giả đăng ký mượn sách
router.post('/loans', async (req, res) => {
  try {
    const { bookId, userId, daysToBorrow } = req.body;

    // Kiểm tra xem sách có tồn tại và còn hàng không
    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ success: false, message: "Rất tiếc, sách này đã hết!" });
    }

    // Tính toán ngày hẹn trả
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(daysToBorrow || 7));

    // Tạo phiếu mượn mới (Trạng thái PENDING - Chờ thủ thư duyệt)
    const newLoan = new Loan({
      bookId,
      userId,
      dueDate,
      status: 'PENDING' 
    });
    await newLoan.save();

    // CẬP NHẬT KHO SÁCH VÀ LƯỢT MƯỢN
    book.quantity -= 1; // Trừ đi 1 quyển trong kho
    if (book.quantity === 0) book.status = 'OUT_OF_STOCK';
    
    // Tăng số lượt mượn sách lên 1
    book.borrowCount = (book.borrowCount || 0) + 1; 

    await book.save();

    res.json({ success: true, message: "Đăng ký mượn thành công! Vui lòng chờ Thủ thư duyệt." });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
  }
});

// 3. Lấy danh sách mượn sách của một user cụ thể (Cho trang My Books)
router.get('/loans/user/:userId', async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId })
      .populate('bookId') 
      .sort({ createdAt: -1 }); 
    
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Xóa (Hủy) phiếu mượn đang PENDING
router.delete('/loans/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ success: false, message: "Không tìm thấy phiếu mượn" });

    // Hoàn lại sách vào kho (Trừ đi borrowCount vì user đã hủy mượn)
    await Book.findByIdAndUpdate(loan.bookId, { 
      $inc: { quantity: 1, borrowCount: -1 } 
    });
    
    // Xóa phiếu mượn
    await Loan.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Đã hủy yêu cầu mượn thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Lấy số liệu Thống kê cho Trang chủ
router.get('/stats', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'MEMBER' }); 
    const totalLoans = await Loan.countDocuments(); 

    res.json({ 
      success: true, 
      data: { totalBooks, totalUsers, totalLoans } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// API DÀNH CHO ADMIN
// ==========================================

// 1. Lấy TẤT CẢ phiếu mượn của mọi người
router.get('/admin/loans', async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('bookId', 'title image quantity') 
      .populate('userId', 'username email fullName') 
      .sort({ createdAt: -1 }); 
    
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Cập nhật trạng thái phiếu mượn (Duyệt / Từ chối / Đã trả)
router.put('/admin/loans/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findById(req.params.id);
    
    if (!loan) return res.status(404).json({ success: false, message: 'Không tìm thấy phiếu mượn' });

    // LOGIC CỘNG LẠI SÁCH VÀO KHO
    if ((status === 'REJECTED' && loan.status === 'PENDING') || 
        (status === 'COMPLETED' && loan.status === 'APPROVED')) {
      
      // Nếu Admin "Từ chối" đơn, ta trừ đi lượt mượn (vì mượn không thành công)
      const incBorrowCount = status === 'REJECTED' ? -1 : 0;

      await Book.findByIdAndUpdate(loan.bookId, { 
        $inc: { quantity: 1, borrowCount: incBorrowCount } 
      });
    }

    loan.status = status;
    await loan.save();

    res.json({ success: true, message: 'Đã cập nhật trạng thái phiếu mượn!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Đặt ở cuối cùng của file
module.exports = router;