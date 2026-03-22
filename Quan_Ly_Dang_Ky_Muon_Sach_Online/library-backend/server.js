const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // Thêm để mã hóa mật khẩu admin
const connectDB = require('./config/db');
const User = require('./models/User'); // Import model User để check admin

// Load file .env
dotenv.config();

// Kết nối Database
connectDB().then(() => {
  // Sau khi kết nối DB thành công, tiến hành tạo Admin mặc định
  seedAdmin();
});

const app = express();
app.use(cors());
app.use(express.json());

// --- CẤU HÌNH ROUTES ---
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const adminRoutes = require('./routes/admin');

app.use('/api', adminRoutes);
app.use('/api', bookRoutes);
app.use('/api', authRoutes); 

// Cho phép truy cập công khai thư mục public/uploads
app.use('/uploads', express.static('public/uploads'));

// --- HÀM TỰ ĐỘNG TẠO ADMIN (SEEDING) ---
async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'ADMIN' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new User({
        username: 'admin',
        password: hashedPassword,
        fullName: 'Thủ thư hệ thống',
        email: 'admin@library.com',
        role: 'ADMIN',
        isActive: true
      });
      
      await defaultAdmin.save();
      console.log('--------------------------------------------------');
      console.log('✅ ĐÃ TẠO TÀI KHOẢN ADMIN MẶC ĐỊNH THÀNH CÔNG!');
      console.log('👉 Tài khoản: admin');
      console.log('👉 Mật khẩu:  admin123');
      console.log('--------------------------------------------------');
    }
  } catch (error) {
    console.error('❌ Lỗi khi tạo Admin mặc định:', error);
  }
}

// Đường dẫn test
app.get('/', (req, res) => {
  res.send('API Hệ thống Quản lý mượn sách đang hoạt động...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});