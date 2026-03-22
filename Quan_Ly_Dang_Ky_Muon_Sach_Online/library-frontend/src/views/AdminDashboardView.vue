<template>
  <div class="min-h-screen bg-slate-900 flex font-sans text-slate-200 scroll-smooth">
    
    <aside class="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 fixed h-full z-20">
      <div class="p-8 cursor-pointer" @click="router.push('/')">
        <h2 class="text-xl font-black text-emerald-500 tracking-tighter">ADMIN PANEL</h2>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Thủ thư hệ thống</p>
      </div>

      <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
        <button @click="activeModule = 'DASHBOARD'" :class="['w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all hover:bg-slate-900', activeModule === 'DASHBOARD' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-400 border border-transparent']">
           <img src="/chart.png" class="w-6 h-6" alt="Icon Thống Kê" />
          <span>Thống kê</span>
        </button>
        <button @click="activeModule = 'BOOKS'" :class="['w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all hover:bg-slate-900', activeModule === 'BOOKS' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-400 border border-transparent']">
           <img src="/sach.png" class="w-6 h-6" alt="Icon Quản lý sách" />
            <span>Quản lý Sách</span>
        </button>
        <button @click="activeModule = 'LOANS'" :class="['w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all hover:bg-slate-900', activeModule === 'LOANS' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-400 border border-transparent']">
          <img src="/muontra.png" class="w-6 h-6" alt="Icon Mượn Trả" /> 
          <span>Mượn / Trả</span>
        </button>
        <button @click="activeModule = 'USERS'" :class="['w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all hover:bg-slate-900', activeModule === 'USERS' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-400 border border-transparent']">
          <img src="/people.png" class="w-6 h-6" alt="Icon Người Dùng" /> 
          <span>Người dùng</span>
        </button>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3 mb-4 px-2">
          <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-500 border border-slate-700">{{ adminName.charAt(0) }}</div>
          <div>
            <p class="text-sm font-bold text-slate-200">{{ adminName }}</p>
            <p class="text-xs text-slate-500">Quyền Admin</p>
          </div>
        </div>
        <button @click="handleLogout" class="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold text-sm transition-all border border-red-500/20">
          Đăng xuất Admin
        </button>
      </div>
    </aside>

    <div class="w-64 shrink-0 hidden md:block"></div>

    <main class="flex-1 p-10 overflow-x-hidden min-h-screen bg-slate-900">
      
      <div v-if="activeModule === 'DASHBOARD'" class="animate-[fadeIn_0.3s_ease-out]">
        <h1 class="text-3xl font-extrabold text-white mb-8">Tổng quan Hệ thống</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div class="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between h-40 shadow-lg">
            <div class="flex justify-between items-start">
              <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Sách</p>
              <div class="p-2 bg-blue-500/20 text-blue-400 rounded-lg text-xl"><img src="/book.png" class="w-6 h-6" /></div>
            </div>
            <p class="text-4xl font-black text-white">{{ stats.totalBooks }}</p>
          </div>
          <div class="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between h-40 shadow-lg">
            <div class="flex justify-between items-start">
              <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Lượt mượn</p>
              <div class="p-2 bg-purple-500/20 text-purple-400 rounded-lg text-xl"><img src="/muontra.png" class="w-6 h-6" /></div>
            </div>
            <p class="text-4xl font-black text-white">{{ stats.totalLoans }}</p>
          </div>
          <div class="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between h-40 shadow-lg">
            <div class="flex justify-between items-start">
              <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Đang mượn</p>
              <div class="p-2 bg-orange-500/20 text-orange-400 rounded-lg text-xl"><img src="/book.png" class="w-6 h-6" /></div>
            </div>
            <p class="text-4xl font-black text-white">{{ stats.activeLoans }}</p>
          </div>
          <div class="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between h-40 shadow-lg">
            <div class="flex justify-between items-start">
              <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Độc giả</p>
              <div class="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xl"><img src="/people.png" class="w-6 h-6" /></div>
            </div>
            <p class="text-4xl font-black text-white">{{ stats.totalUsers }}</p>
          </div>
          
          <div class="bg-slate-800 rounded-3xl p-6 border border-red-500/30 flex flex-col justify-between h-40 shadow-[0_0_15px_rgba(239,68,68,0.1)] relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-16 h-16 bg-red-500/10 rounded-full blur-xl"></div>
            <div class="flex justify-between items-start relative z-10">
              <p class="text-sm font-bold text-red-400 uppercase tracking-wider">Quá hạn</p>
              <div class="p-2 bg-red-500/20 text-red-400 rounded-lg text-xl"><img src="/canhbao.png" class="w-6 h-6" /></div>
            </div>
            <p class="text-4xl font-black text-red-400 relative z-10">{{ overdueLoans.length }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="activeModule === 'BOOKS'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-extrabold text-white">Quản lý Sách</h1>
            <p class="text-slate-400 mt-1">Thêm, sửa, xóa và theo dõi kho sách.</p>
          </div>
          
          <div class="flex items-center gap-3 w-full lg:w-auto">
            <div class="relative flex-1 lg:w-64">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input v-model="bookSearchQuery" type="text" placeholder="Tìm tên sách..." class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <button @click="openBookModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 shrink-0">
              <span>+</span> <span class="hidden sm:inline">Thêm sách</span>
            </button>
          </div>
        </div>

        <div class="bg-slate-800 rounded-3xl shadow-lg border border-slate-700 overflow-hidden">
          <table class="w-full text-left">
            <thead class="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-5 font-bold">Sách</th>
                <th class="p-5 font-bold">Thể loại</th>
                <th class="p-5 font-bold text-center">Trong kho</th>
                <th class="p-5 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50 text-sm">
              <tr v-if="filteredBooksList.length === 0">
                <td colspan="4" class="p-8 text-center text-slate-500">Không tìm thấy cuốn sách nào!</td>
              </tr>
              <tr v-for="book in filteredBooksList" :key="book._id" class="hover:bg-slate-700/30 transition-colors">
                <td class="p-5">
                  <div class="flex items-center gap-4">
                    <img v-if="book.image" :src="'http://localhost:5000/uploads/' + book.image" class="w-12 h-16 object-cover rounded shadow-sm border border-slate-600" />
                    <div v-else class="w-12 h-16 bg-slate-700 rounded flex items-center justify-center font-bold text-slate-500 border border-slate-600">Ảnh</div>
                    <div>
                      <p class="font-bold text-slate-200 text-base">{{ book.title }}</p>
                      <p class="text-xs text-slate-400">{{ book.author }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-5"><span class="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{{ book.category }}</span></td>
                <td class="p-5 text-center">
                  <span :class="['font-bold text-lg', book.quantity > 0 ? 'text-emerald-400' : 'text-red-400']">{{ book.quantity }}</span>
                </td>
                <td class="p-5 text-right">
                  <button @click="openBookModal(book)" class="text-blue-400 hover:text-blue-300 font-bold mr-4 transition-colors">Sửa</button>
                  <button @click="deleteBook(book._id)" class="text-red-400 hover:text-red-300 font-bold transition-colors">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="activeModule === 'LOANS'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-extrabold text-white">Mượn / Trả Sách</h1>
            <p class="text-slate-400 mt-1">Duyệt đơn và thu hồi sách.</p>
          </div>
          <div class="flex space-x-2 bg-slate-800 p-1.5 rounded-xl w-max border border-slate-700 overflow-x-auto max-w-full">
            <button @click="loanTab = 'PENDING'" :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap', loanTab === 'PENDING' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200']">Chờ duyệt ({{ pendingLoans.length }})</button>
            <button @click="loanTab = 'APPROVED'" :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap', loanTab === 'APPROVED' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200']">Đang mượn ({{ activeLoans.length }})</button>
            <button @click="loanTab = 'OVERDUE'" :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap', loanTab === 'OVERDUE' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200']">Quá hạn ({{ overdueLoans.length }})</button>
            <button @click="loanTab = 'HISTORY'" :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap', loanTab === 'HISTORY' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200']">Lịch sử</button>
          </div>
        </div>

        <div class="bg-slate-800 rounded-3xl shadow-lg border border-slate-700 overflow-hidden">
          <table class="w-full text-left">
            <thead class="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-5 font-bold">Độc giả</th>
                <th class="p-5 font-bold">Sách</th>
                <th class="p-5 font-bold">Thời gian</th>
                <th class="p-5 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50 text-sm">
              <tr v-if="filteredLoans.length === 0"><td colspan="4" class="p-10 text-center text-slate-500">Không có dữ liệu trong mục này.</td></tr>
              <tr v-for="loan in filteredLoans" :key="loan._id" class="hover:bg-slate-700/30 transition-colors">
                <td class="p-5">
                  <p class="font-bold text-slate-200">{{ loan.userId?.username || 'Đã xóa' }}</p>
                  <p class="text-xs text-slate-400">{{ loan.userId?.email }}</p>
                </td>
                <td class="p-5">
                  <p class="font-bold text-emerald-400 max-w-[200px] truncate" :title="loan.bookId?.title">{{ loan.bookId?.title || 'Sách đã xóa' }}</p>
                </td>
                <td class="p-5">
                  <p class="text-xs text-slate-400">Tạo: {{ formatDate(loan.createdAt) }}</p>
                  <p :class="['text-sm font-bold mt-0.5', (loan.status === 'APPROVED' && isOverdue(loan.dueDate)) ? 'text-red-400' : 'text-slate-200']">
                    Hạn: {{ formatDate(loan.dueDate) }}
                    <span v-if="loan.status === 'APPROVED' && isOverdue(loan.dueDate)" class="text-xs ml-1 bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">Trễ</span>
                  </p>
                </td>
                <td class="p-5 text-right">
                  <template v-if="loan.status === 'PENDING'">
                    <button @click="updateLoan(loan._id, 'APPROVED')" class="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold mr-2 hover:bg-blue-500 transition-colors">Duyệt</button>
                    <button @click="updateLoan(loan._id, 'REJECTED')" class="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">Từ chối</button>
                  </template>
                  <template v-else-if="loan.status === 'APPROVED'">
                    <button @click="updateLoan(loan._id, 'COMPLETED')" class="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500 shadow-sm transition-colors">Đã nhận lại sách</button>
                  </template>
                  <span v-else-if="loan.status === 'COMPLETED'" class="text-xs font-bold text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded">Hoàn thành</span>
                  <span v-else class="text-xs font-bold text-red-500 border border-red-500/30 px-2 py-1 rounded">Đã từ chối</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="activeModule === 'USERS'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="mb-8">
          <h1 class="text-3xl font-extrabold text-white">Quản lý Độc giả</h1>
          <p class="text-slate-400 mt-1">Danh sách người dùng và trạng thái tài khoản.</p>
        </div>

        <div class="bg-slate-800 rounded-3xl shadow-lg border border-slate-700 overflow-hidden">
          <table class="w-full text-left">
            <thead class="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th class="p-5 font-bold">Tài khoản</th>
                <th class="p-5 font-bold">Email</th>
                <th class="p-5 font-bold text-center">Trạng thái</th>
                <th class="p-5 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50 text-sm">
              <tr v-for="user in users" :key="user._id" class="hover:bg-slate-700/30 transition-colors">
                <td class="p-5 font-bold text-emerald-400">{{ user.username }}</td>
                <td class="p-5 text-slate-300">{{ user.email }}</td>
                <td class="p-5 text-center">
                  <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider', user.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20']">
                    {{ user.isActive ? 'Hoạt động' : 'Bị khóa' }}
                  </span>
                </td>
                <td class="p-5 text-right">
                  <button @click="toggleUserStatus(user)" :class="['px-4 py-2 rounded-xl text-xs font-bold transition-all border', user.isActive ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border-emerald-500/30']">
                    {{ user.isActive ? 'Khóa tài khoản' : 'Mở khóa' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <div v-if="showBookModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-700 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div class="bg-slate-900 p-6 text-white flex justify-between items-center border-b border-slate-700">
          <h3 class="font-bold text-xl text-emerald-400">{{ isEditing ? 'Sửa thông tin sách' : 'Thêm sách mới' }}</h3>
          <button @click="showBookModal = false" class="text-slate-500 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <form @submit.prevent="saveBook" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-slate-300 mb-1">Tên sách <span class="text-red-500">*</span></label>
            <input v-model="bookForm.title" type="text" required class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-1">Tác giả <span class="text-red-500">*</span></label>
              <input v-model="bookForm.author" type="text" required class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-1">Thể loại <span class="text-red-500">*</span></label>
              <select v-model="bookForm.category" required class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all">
                <option value="Văn học">Văn học</option>
                <option value="Khoa học">Khoa học</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Tâm lý">Tâm lý</option>
                <option value="Giáo trình">Giáo trình</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-1">Số lượng <span class="text-red-500">*</span></label>
              <input v-model="bookForm.quantity" type="number" min="0" required class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-300 mb-1">Tên file ảnh</label>
              <input v-model="bookForm.image" type="text" placeholder="VD: sach1.jpg" class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-300 mb-1">Mô tả ngắn</label>
            <textarea v-model="bookForm.description" rows="2" class="w-full px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-700 mt-4">
            <button type="button" @click="showBookModal = false" class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors">Hủy</button>
            <button type="submit" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors">Lưu sách</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const adminName = ref('');

// Điều khiển Giao diện
const activeModule = ref('DASHBOARD');
const loanTab = ref('PENDING');

// Dữ liệu Hệ thống
const stats = ref({ totalBooks: 0, totalLoans: 0, activeLoans: 0, totalUsers: 0 });
const books = ref([]);
const loans = ref([]);
const users = ref([]);

// Quản lý Modal Sách
const showBookModal = ref(false);
const isEditing = ref(false);
const bookForm = ref({ title: '', author: '', category: 'Công nghệ', quantity: 1, image: '', description: '' });
let currentBookId = null;

// BIẾN CHO TÌM KIẾM SÁCH
const bookSearchQuery = ref('');

// ==========================================
// FETCH DỮ LIỆU
// ==========================================
const fetchData = async () => {
  try {
    const resB = await fetch('http://localhost:5000/api/books');
    const dataB = await resB.json();
    if(dataB.success) books.value = dataB.data;
  } catch (e) { console.error(e); }

  try {
    const resL = await fetch('http://localhost:5000/api/admin/loans');
    const dataL = await resL.json();
    if(dataL.success) loans.value = dataL.data;
  } catch (e) { console.error(e); }

  try {
    const resU = await fetch('http://localhost:5000/api/admin/users');
    const dataU = await resU.json();
    if(dataU.success) users.value = dataU.data;
  } catch (e) { console.error(e); }

  try {
    const resS = await fetch('http://localhost:5000/api/admin/stats');
    const dataS = await resS.json();
    if(dataS.success) stats.value = dataS.data;
  } catch (e) { console.error(e); }
};

// ==========================================
// LOGIC QUẢN LÝ SÁCH (CRUD)
// ==========================================
const openBookModal = (book = null) => {
  if (book) {
    isEditing.value = true;
    currentBookId = book._id;
    bookForm.value = { ...book };
  } else {
    isEditing.value = false;
    currentBookId = null;
    bookForm.value = { title: '', author: '', category: 'Công nghệ', quantity: 1, image: '', description: '' };
  }
  showBookModal.value = true;
};

const saveBook = async () => {
  const method = isEditing.value ? 'PUT' : 'POST';
  const url = isEditing.value ? `http://localhost:5000/api/admin/books/${currentBookId}` : 'http://localhost:5000/api/admin/books';
  
  try {
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookForm.value)
    });
    const data = await res.json();
    if(data.success) {
      alert(isEditing.value ? 'Cập nhật thành công!' : 'Thêm sách thành công!');
      showBookModal.value = false;
      fetchData(); 
    } else { alert(data.message); }
  } catch (e) { alert("Lỗi kết nối"); }
};

const deleteBook = async (id) => {
  if(!confirm("Bạn có chắc chắn muốn xóa cuốn sách này khỏi hệ thống?")) return;
  try {
    const res = await fetch(`http://localhost:5000/api/admin/books/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if(data.success) { alert("Xóa thành công!"); fetchData(); }
  } catch (e) { alert("Lỗi kết nối"); }
};

// ==========================================
// LOGIC MƯỢN TRẢ & ĐỘC GIẢ
// ==========================================
const updateLoan = async (loanId, newStatus) => {
  let actionName = newStatus === 'APPROVED' ? 'Duyệt' : newStatus === 'REJECTED' ? 'Từ chối' : 'Xác nhận thu hồi';
  if(!confirm(`Xác nhận ${actionName} đơn này?`)) return;
  try {
    const res = await fetch(`http://localhost:5000/api/admin/loans/${loanId}/status`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus })
    });
    if(res.ok) fetchData();
  } catch (e) { alert("Lỗi kết nối"); }
};

const toggleUserStatus = async (user) => {
  const action = user.isActive ? "KHÓA" : "MỞ KHÓA";
  if(!confirm(`Xác nhận ${action} tài khoản này?`)) return;
  try {
    const res = await fetch(`http://localhost:5000/api/admin/users/${user._id}/toggle-lock`, { method: 'PUT' });
    if(res.ok) fetchData();
  } catch (e) { alert("Lỗi kết nối"); }
};

// ==========================================
// TIỆN ÍCH, LỌC & VÒNG ĐỜI
// ==========================================
// Hàm tính toán quá hạn:
const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

// Lọc Sách theo tìm kiếm
const filteredBooksList = computed(() => {
  if (!bookSearchQuery.value) return books.value;
  const query = bookSearchQuery.value.toLowerCase();
  return books.value.filter(b => b.title.toLowerCase().includes(query));
});

// Lọc Phiếu mượn theo Tab
const pendingLoans = computed(() => loans.value.filter(l => l.status === 'PENDING'));
const activeLoans = computed(() => loans.value.filter(l => l.status === 'APPROVED'));
const historyLoans = computed(() => loans.value.filter(l => ['COMPLETED', 'REJECTED'].includes(l.status)));
const overdueLoans = computed(() => loans.value.filter(l => l.status === 'APPROVED' && isOverdue(l.dueDate)));

const filteredLoans = computed(() => {
  if (loanTab.value === 'PENDING') return pendingLoans.value;
  if (loanTab.value === 'APPROVED') return activeLoans.value;
  if (loanTab.value === 'OVERDUE') return overdueLoans.value; // Lấy danh sách quá hạn
  return historyLoans.value;
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(() => {
  if(localStorage.getItem('role') !== 'ADMIN') {
    alert("Khu vực cấm!");
    router.push('/');
    return;
  }
  adminName.value = localStorage.getItem('username') || 'Admin';
  fetchData();
});
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
aside nav::-webkit-scrollbar { width: 4px; }
aside nav::-webkit-scrollbar-thumb { background-color: #1e293b; border-radius: 4px; }
</style>