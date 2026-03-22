<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800">
    
    <header class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <div class="flex items-center cursor-pointer" @click="router.push('/')">
          <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-2 rounded-xl mr-3 shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 uppercase tracking-tighter">Thư Viện Online</span>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="router.push('/')" class="text-gray-500 hover:text-blue-600 font-medium bg-gray-100 px-4 py-2 rounded-full transition-colors">Về Trang chủ</button>
        </div>
      </div>
    </header>

    <main class="pt-28 pb-12 max-w-4xl mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Tài khoản cá nhân</h1>
        <p class="text-gray-500 mt-2">Quản lý thông tin và bảo mật tài khoản của bạn.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="col-span-1">
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
            <div class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl mx-auto mb-4 border-4 border-white shadow-md">
              {{ profile.username?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <h2 class="text-xl font-bold text-gray-800">{{ profile.username }}</h2>
            <p class="text-sm text-gray-500 mb-6">{{ profile.email }}</p>
            
            <div class="flex flex-col space-y-2">
              <button @click="activeTab = 'INFO'" :class="['px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left flex items-center', activeTab === 'INFO' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                <span class="mr-3 text-lg">📝</span> Thông tin cá nhân
              </button>
              <button @click="activeTab = 'PASSWORD'" :class="['px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left flex items-center', activeTab === 'PASSWORD' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50']">
                <span class="mr-3 text-lg">🔒</span> Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>

        <div class="col-span-1 md:col-span-2">
          
          <div v-if="activeTab === 'INFO'" class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Cập nhật thông tin</h3>
            <form @submit.prevent="updateProfile" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tên hiển thị</label>
                <input v-model="profile.username" type="text" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ Email</label>
                <input v-model="profile.email" type="email" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" required />
              </div>
              <div class="pt-4">
                <button type="submit" :disabled="isSavingInfo" class="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-200 disabled:opacity-70">
                  {{ isSavingInfo ? 'Đang lưu...' : 'Lưu thay đổi' }}
                </button>
              </div>
            </form>
          </div>

          <div v-if="activeTab === 'PASSWORD'" class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <h3 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Đổi mật khẩu</h3>
            <form @submit.prevent="updatePassword" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu hiện tại</label>
                <input v-model="passwords.oldPassword" type="password" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" required />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu mới</label>
                <input v-model="passwords.newPassword" type="password" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" required minlength="6" />
                <p class="text-xs text-gray-500 mt-2">Mật khẩu phải có ít nhất 6 ký tự.</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                <input v-model="passwords.confirmPassword" type="password" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" required />
              </div>
              <div class="pt-4">
                <button type="submit" :disabled="isSavingPassword" class="px-8 py-3.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-bold transition-all shadow-md disabled:opacity-70">
                  {{ isSavingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu' }}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('INFO');

// State thông tin
const profile = ref({ username: '', email: '' });
const isSavingInfo = ref(false);

// State mật khẩu
const passwords = ref({ oldPassword: '', newPassword: '', confirmPassword: '' });
const isSavingPassword = ref(false);

// Lấy thông tin user hiện tại từ DB
const fetchProfile = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    router.push('/login');
    return;
  }
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`);
    const data = await res.json();
    if (data.success) {
      profile.value.username = data.data.username;
      profile.value.email = data.data.email;
    }
  } catch (error) {
    console.error('Lỗi tải thông tin:', error);
  }
};

// Hàm cập nhật thông tin
const updateProfile = async () => {
  isSavingInfo.value = true;
  try {
    const res = await fetch(`http://localhost:5000/api/users/${localStorage.getItem('userId')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile.value)
    });
    const data = await res.json();
    if (data.success) {
      alert('Cập nhật thông tin thành công!');
      localStorage.setItem('username', profile.value.username); // Cập nhật lại tên trên LocalStorage
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Lỗi kết nối đến máy chủ');
  } finally {
    isSavingInfo.value = false;
  }
};

// Hàm cập nhật mật khẩu
const updatePassword = async () => {
  if (passwords.value.newPassword !== passwords.value.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  isSavingPassword.value = true;
  try {
    const res = await fetch(`http://localhost:5000/api/users/${localStorage.getItem('userId')}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldPassword: passwords.value.oldPassword,
        newPassword: passwords.value.newPassword
      })
    });
    const data = await res.json();
    if (data.success) {
      alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
      localStorage.clear();
      router.push('/login');
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Lỗi kết nối đến máy chủ');
  } finally {
    isSavingPassword.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>