const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User'); // ĐÃ THÊM: Phải có dòng này thì mới quản lý User được

// ==============================================
// CÁC API DÀNH RIÊNG CHO QUẢN TRỊ VIÊN (ADMIN)
// ==============================================

// 1. Lấy danh sách tất cả phiếu mượn (Dùng cho Admin)
router.get('/admin/loans', async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('userId', 'fullName username email') // Lấy thêm email để hiện lên bảng
      .populate('bookId', 'title image quantity')    // Lấy thêm ảnh bìa sách
      .sort({ createdAt: -1 });                      // Mới nhất hiện lên đầu
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Cập nhật trạng thái phiếu mượn (Duyệt mượn / Từ chối / Thu hồi sách)
router.put('/admin/loans/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findById(req.params.id);

    if (!loan) return res.status(404).json({ success: false, message: "Không tìm thấy phiếu mượn" });

    // LOGIC HOÀN TRẢ SÁCH VÀO KHO:
    // Chỉ cộng lại sách khi Admin "Từ chối" đơn (từ PENDING -> REJECTED)
    // HOẶC Admin xác nhận "Đã trả sách" (từ APPROVED -> COMPLETED)
    if ((status === 'REJECTED' && loan.status === 'PENDING') || 
        (status === 'COMPLETED' && loan.status === 'APPROVED')) {
      await Book.findByIdAndUpdate(loan.bookId, { $inc: { quantity: 1 } });
    }

    loan.status = status;
    await loan.save();

    res.json({ success: true, message: "Cập nhật trạng thái thành công!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Thêm sách mới
router.post('/admin/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ success: true, message: 'Thêm sách thành công' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 4. Sửa thông tin sách
router.put('/admin/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: 'Cập nhật thành công' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 5. Xóa sách
router.delete('/admin/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Xóa thành công' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 6. Quản lý Người dùng (Chỉ lấy tài khoản Sinh viên/Độc giả)
router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'MEMBER' }).select('-password');
    res.json({ success: true, data: users });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 7. Khóa / Mở khóa tài khoản người dùng
router.put('/admin/users/:id/toggle-lock', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isActive = !user.isActive; // Đảo ngược trạng thái (True thành False và ngược lại)
    await user.save();
    res.json({ success: true, message: 'Đã thay đổi trạng thái tài khoản' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 8. Lấy Thống kê chi tiết
router.get('/admin/stats', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'MEMBER' });
    const totalLoans = await Loan.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: 'APPROVED' }); // Số sách ĐANG MƯỢN

    res.json({ 
      success: true, 
      data: { totalBooks, totalUsers, totalLoans, activeLoans } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;