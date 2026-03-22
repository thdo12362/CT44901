<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800 scroll-smooth">
    
    <header class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          
          <div class="flex items-center cursor-pointer" @click="router.push('/')">
            <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-2 rounded-xl mr-3 shadow-lg shadow-blue-500/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 uppercase tracking-tighter">Thư Viện Online</span>
          </div>

          <nav class="hidden md:flex space-x-8">
            <router-link to="/" class="text-gray-500 hover:text-blue-600 transition-colors font-medium">Trang chủ</router-link>
            <a href="/#book-catalog" class="text-gray-500 hover:text-blue-600 transition-colors font-medium">Danh sách Sách</a>
            <template v-if="isLoggedIn">
              <router-link to="/my-books" class="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">My Books</router-link>
            </template>
          </nav>

          <div class="flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <button @click="router.push('/login')" class="hidden md:block text-gray-600 font-medium hover:text-blue-600">Đăng nhập</button>
              <button @click="router.push('/login')" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blue-600/30">Đăng ký</button>
            </template>
            
            <template v-else>
              <div class="relative z-50">
                <button @click="showNotifications = !showNotifications; showDropdown = false" class="p-2 text-gray-400 hover:text-blue-600 transition-colors relative focus:outline-none">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span v-if="userNotifications.length > 0" class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
                <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                  <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
                    <span class="font-bold text-gray-700">Thông báo của bạn</span>
                    <span class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">{{ userNotifications.length }}</span>
                  </div>
                  <div class="max-h-[350px] overflow-y-auto">
                    <div v-if="userNotifications.length === 0" class="px-4 py-8 text-center text-gray-400 text-sm">
                      Bạn không có thông báo nào.
                    </div>
                    <div v-for="(notif, index) in userNotifications" :key="index" :class="['px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors', notif.bgClass]" @click="showNotifications = false">
                      <p :class="['text-sm font-semibold flex items-center', notif.titleClass]">
                        <span class="mr-2">{{ notif.icon }}</span> {{ notif.title }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1 leading-snug">{{ notif.message }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative z-50">
                <button @click="showDropdown = !showDropdown; showNotifications = false" class="flex items-center space-x-2 focus:outline-none pl-2">
                  <span class="font-medium text-gray-700 hidden md:block">{{ username }}</span>
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                    {{ username.charAt(0).toUpperCase() }}
                  </div>
                </button>
                <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                  <div class="px-4 py-2 text-xs text-gray-400 font-bold uppercase tracking-wider">Tài khoản</div>
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Sửa thông tin</router-link>
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Đổi mật khẩu</router-link>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Đăng xuất</button>
                </div>
              </div>
            </template>
          </div>
          
        </div>
      </div>
    </header>

    <main class="pt-28 pb-12 max-w-5xl mx-auto px-4 z-10 relative">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Quản lý sách của tôi</h1>
        <p class="text-gray-500 mt-2">Theo dõi tiến độ mượn, trả và lịch sử đọc sách của bạn.</p>
      </div>

      <div class="flex space-x-2 bg-gray-100 p-1.5 rounded-2xl mb-8 w-full md:w-max overflow-x-auto max-w-full">
        <button @click="activeTab = 'BORROWING'" :class="['px-6 md:px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap', activeTab === 'BORROWING' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']">
          <img src="/dangmuon.png" class="w-6 h-6" />Đang mượn ({{ borrowingList.length }})
        </button>
        <button @click="activeTab = 'PENDING'" :class="['px-6 md:px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap', activeTab === 'PENDING' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-700']">
          <img src="/hourglass.png" class="w-6 h-6" /> Chờ duyệt ({{ pendingList.length }})
        </button>
        <button @click="activeTab = 'HISTORY'" :class="['px-6 md:px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap', activeTab === 'HISTORY' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700']">
          <img src="/clock.png" class="w-6 h-6" /> Lịch sử
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-gray-400 font-medium">Đang tải dữ liệu...</div>
      
      <div v-else-if="currentList.length === 0" class="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
        <div class="text-5xl mb-4 grayscale opacity-50">📚</div>
        <h3 class="text-lg font-bold text-gray-600">Danh sách trống</h3>
        <p class="text-gray-400 mt-1 text-sm">Bạn chưa có cuốn sách nào trong mục này.</p>
        <button @click="router.push('/')" class="mt-6 bg-blue-50 text-blue-600 font-bold px-6 py-2.5 rounded-full hover:bg-blue-100 transition-colors">Khám phá sách ngay</button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="loan in currentList" :key="loan._id" :class="['bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow flex flex-col justify-between', (loan.status === 'APPROVED' && isOverdue(loan.dueDate)) ? 'border-red-200 bg-red-50/10' : 'border-gray-100']">
          
          <div class="flex gap-5 items-start">
            <div class="w-20 h-28 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 relative">
              <img v-if="loan.bookId?.image" :src="'http://localhost:5000/uploads/' + loan.bookId.image" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-blue-300 font-bold text-xl">{{ loan.bookId?.title?.charAt(0) || '?' }}</div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="mb-2">
                <span v-if="loan.status === 'PENDING'" class="bg-orange-100 text-orange-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Đang chờ duyệt</span>
                <span v-else-if="loan.status === 'APPROVED'" class="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Đang giữ sách</span>
                <span v-else-if="loan.status === 'COMPLETED'" class="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Đã trả xong</span>
                <span v-else-if="loan.status === 'REJECTED'" class="bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Bị từ chối</span>
              </div>

              <h3 class="font-bold text-gray-800 text-lg leading-tight truncate mb-1" :title="loan.bookId?.title">{{ loan.bookId?.title || 'Sách đã bị xóa' }}</h3>
              
              <div class="text-sm space-y-1 mt-3">
                <p class="flex justify-between border-b border-gray-50 pb-1 text-gray-500">
                  <span>Ngày gửi đơn:</span> 
                  <span class="font-medium text-gray-700">{{ formatDate(loan.createdAt) }}</span>
                </p>
                <p :class="['flex justify-between pt-1', (loan.status === 'APPROVED' && isOverdue(loan.dueDate)) ? 'text-red-500 font-bold' : 'text-gray-500']">
                  <span>Ngày trả dự kiến:</span> 
                  <span :class="(loan.status === 'APPROVED' && isOverdue(loan.dueDate)) ? 'text-red-600' : 'font-medium text-gray-700'">{{ formatDate(loan.dueDate) }}</span>
                </p>
                
                <p v-if="loan.status === 'APPROVED' && isOverdue(loan.dueDate)" class="mt-3 pt-2 text-xs font-bold text-red-600 flex items-center bg-red-100 p-2 rounded-lg border border-red-200">
                  ⚠️ Đã quá hạn trả sách! Vui lòng hoàn trả ngay.
                </p>
                <p v-else-if="loan.status === 'APPROVED'" class="mt-3 pt-2 text-xs font-bold text-orange-500 flex items-center bg-orange-50 p-2 rounded-lg border border-orange-100">
                  ⚠️ Nhớ trả sách đúng hạn bạn nhé!
                </p>
              </div>
            </div>
          </div>

          <div v-if="loan.status === 'PENDING'" class="mt-4 pt-4 border-t border-gray-100">
            <button @click="cancelLoan(loan._id)" class="w-full py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-sm font-bold transition-colors border border-red-100 shadow-sm">
              Hủy yêu cầu mượn
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dữ liệu User & Header
const isLoggedIn = ref(false);
const username = ref('');
const showDropdown = ref(false);
const showNotifications = ref(false);

// Dữ liệu My Books
const myLoans = ref([]);
const activeTab = ref('BORROWING');
const isLoading = ref(true);

const fetchMyLoans = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    router.push('/login');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/loans/user/${userId}`);
    const data = await res.json();
    if (data.success) {
      myLoans.value = data.data;
    }
  } catch (error) {
    console.error("Lỗi khi tải lịch sử:", error);
  } finally {
    isLoading.value = false;
  }
};

// ===============================================
// LOGIC TÍNH TOÁN THÔNG BÁO ĐỘNG
// ===============================================
const userNotifications = computed(() => {
  const notifs = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  myLoans.value.forEach(loan => {
    const bookTitle = loan.bookId?.title || 'Sách';
    
    if (loan.status === 'APPROVED') {
      const dueDate = new Date(loan.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const timeDiff = dueDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff < 0) {
        notifs.push({ 
          icon: '⚠️', title: 'Quá hạn trả sách', 
          message: `Bạn đã quá hạn trả sách '${bookTitle}'. Vui lòng hoàn trả ngay!`, 
          titleClass: 'text-red-600', bgClass: 'hover:bg-red-50 bg-red-50/30' 
        });
      } else if (daysDiff <= 2) {
        const dayText = daysDiff === 0 ? 'hôm nay' : daysDiff === 1 ? 'ngày mai' : '2 ngày nữa';
        notifs.push({ 
          icon: '⏰', title: 'Nhắc hạn trả sách', 
          message: `Sách '${bookTitle}' sẽ đến hạn vào ${dayText}.`, 
          titleClass: 'text-orange-500', bgClass: 'hover:bg-orange-50 bg-orange-50/30' 
        });
      } else {
        notifs.push({ 
          icon: '✅', title: 'Yêu cầu được duyệt', 
          message: `Yêu cầu mượn '${bookTitle}' đã được duyệt.`, 
          titleClass: 'text-blue-600', bgClass: 'hover:bg-blue-50' 
        });
      }
    } 
    else if (loan.status === 'REJECTED') {
      notifs.push({ 
        icon: '❌', title: 'Yêu cầu bị từ chối', 
        message: `Yêu cầu mượn '${bookTitle}' đã bị Thủ thư từ chối.`, 
        titleClass: 'text-gray-600', bgClass: 'hover:bg-gray-100' 
      });
    } 
    else if (loan.status === 'COMPLETED') {
      notifs.push({ 
        icon: '🎉', title: 'Xác nhận đã trả', 
        message: `Bạn đã trả sách '${bookTitle}' thành công. Cảm ơn bạn!`, 
        titleClass: 'text-green-600', bgClass: 'hover:bg-green-50' 
      });
    }
  });
  
  // Ưu tiên hiển thị thông báo quá hạn và nhắc hạn lên đầu danh sách
  return notifs.sort((a, b) => {
    if (a.titleClass.includes('red')) return -1;
    if (b.titleClass.includes('red')) return 1;
    if (a.titleClass.includes('orange')) return -1;
    if (b.titleClass.includes('orange')) return 1;
    return 0;
  });
});

// Kiểm tra xem cuốn sách cụ thể có quá hạn hay không
const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// Chức năng Hủy đơn mượn
const cancelLoan = async (loanId) => {
  if(!confirm("Bạn có chắc chắn muốn hủy yêu cầu mượn cuốn sách này?")) return;
  try {
    const response = await fetch(`http://localhost:5000/api/loans/${loanId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if(data.success) {
      alert("Đã hủy yêu cầu mượn sách thành công!");
      fetchMyLoans(); 
    } else { alert(data.message); }
  } catch (error) { alert("Lỗi khi hủy!"); }
};

// Chức năng Đăng xuất
const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  router.push('/');
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  username.value = localStorage.getItem('username') || '';
  if (isLoggedIn.value) {
    fetchMyLoans();
  }
});

// Phân loại danh sách theo Tab
const pendingList = computed(() => myLoans.value.filter(loan => loan.status === 'PENDING'));
const borrowingList = computed(() => myLoans.value.filter(loan => loan.status === 'APPROVED'));
const historyList = computed(() => myLoans.value.filter(loan => ['COMPLETED', 'REJECTED'].includes(loan.status)));

const currentList = computed(() => {
  if (activeTab.value === 'BORROWING') return borrowingList.value;
  if (activeTab.value === 'PENDING') return pendingList.value;
  return historyList.value;
});

// Hàm format ngày tháng cho đẹp
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
</script>