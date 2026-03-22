<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4 font-sans">
    <div class="bg-white rounded-3xl shadow-2xl flex w-full max-w-4xl overflow-hidden relative">
      
      <div class="hidden md:flex w-1/2 bg-blue-50 p-12 flex-col justify-center items-center relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/40 to-purple-100/40"></div>
        <div class="relative z-10 text-center">
          <div class="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Thư Viện Số</h2>
          <p class="text-gray-600">Khám phá hàng ngàn đầu sách hấp dẫn và đăng ký mượn hoàn toàn trực tuyến.</p>
        </div>
      </div>

      <div class="w-full md:w-1/2 p-8 md:p-12 transition-all duration-300">
        <transition name="fade" mode="out-in">
          
          <div v-if="isLogin" key="login" class="w-full">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h3>
            <p class="text-gray-500 mb-8 text-sm">Chào mừng bạn quay lại hệ thống mượn sách.</p>

            <form @submit.prevent="handleLogin" class="space-y-5">
              <div v-if="loginError" class="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                {{ loginError }}
              </div>

              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
                <input v-model="loginForm.username" type="text" placeholder="Tên đăng nhập" required
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
              </div>

              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu" required
                  class="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>

              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center text-gray-600 cursor-pointer">
                  <input type="checkbox" v-model="loginForm.rememberMe" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2" />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">Quên mật khẩu?</a>
              </div>

              <button type="submit" :disabled="isLoading"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex justify-center items-center shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
              </button>
            </form>

            <p class="mt-8 text-center text-sm text-gray-600">
              Chưa có tài khoản? 
              <button @click="toggleView" class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Đăng ký ngay</button>
            </p>
          </div>

          <div v-else key="register" class="w-full">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Tạo tài khoản</h3>
            <p class="text-gray-500 mb-6 text-sm">Điền thông tin bên dưới để tham gia mượn sách.</p>

            <form @submit.prevent="handleRegister" class="space-y-4">
              
              <div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input v-model="registerForm.fullName" type="text" placeholder="Họ và Tên" @input="validateRegister"
                    :class="['w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 transition-all outline-none', errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200']" />
                </div>
                <p v-if="errors.fullName" class="text-red-500 text-xs mt-1 ml-1">{{ errors.fullName }}</p>
              </div>

              <div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <input v-model="registerForm.username" type="text" placeholder="Tên đăng nhập" @input="validateRegister"
                    :class="['w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 transition-all outline-none', errors.username ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200']" />
                </div>
                <p v-if="errors.username" class="text-red-500 text-xs mt-1 ml-1">{{ errors.username }}</p>
              </div>

              <div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                  <input v-model="registerForm.email" type="email" placeholder="Email" @input="validateRegister"
                    :class="['w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 transition-all outline-none', errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200']" />
                </div>
                <p v-if="errors.email" class="text-red-500 text-xs mt-1 ml-1">{{ errors.email }}</p>
              </div>

              <div class="flex gap-4">
                <div class="w-1/2">
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <input v-model="registerForm.password" :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu" @input="validateRegister"
                      :class="['w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 transition-all outline-none', errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200']" />
                  </div>
                  <p v-if="errors.password" class="text-red-500 text-xs mt-1 ml-1">{{ errors.password }}</p>
                </div>

                <div class="w-1/2">
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <input v-model="registerForm.confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Nhập lại MK" @input="validateRegister"
                      :class="['w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 transition-all outline-none', errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200']" />
                  </div>
                  <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1 ml-1">{{ errors.confirmPassword }}</p>
                </div>
              </div>

              <button type="submit" :disabled="isLoading || hasErrors"
                class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all flex justify-center items-center shadow-lg shadow-purple-600/30 disabled:opacity-70 disabled:cursor-not-allowed">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Đang thiết lập...' : 'Đăng ký' }}
              </button>
            </form>

            <p class="mt-8 text-center text-sm text-gray-600">
              Đã có tài khoản? 
              <button @click="toggleView" class="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Đăng nhập</button>
            </p>
          </div>

        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Toggles & States
const isLogin = ref(true)
const isLoading = ref(false)
const showPassword = ref(false)
const loginError = ref('')

const toggleView = () => {
  isLogin.value = !isLogin.value
  loginError.value = ''
  // Reset forms when toggling
  if(isLogin.value) {
    registerForm.fullName = ''
    registerForm.username = ''
    registerForm.email = ''
    registerForm.password = ''
    registerForm.confirmPassword = ''
    Object.keys(errors).forEach(k => errors[k] = '')
  } else {
    loginForm.username = ''
    loginForm.password = ''
  }
}

// --- LOGIN LOGIC ---
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const handleLogin = async () => {
  loginError.value = ''
  isLoading.value = true
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: loginForm.username, 
        password: loginForm.password 
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.clear();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('token', data.token);

      // Điều hướng dựa trên quyền hạn
      if (data.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      loginError.value = data.message;
    }
  } catch (error) {
    loginError.value = "Không thể kết nối đến Máy chủ Backend!";
  } finally {
    isLoading.value = false;
  }
}

// --- REGISTER LOGIC ---
const registerForm = reactive({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateRegister = () => {
  if (!registerForm.fullName) errors.fullName = 'Không được để trống.'
  else errors.fullName = ''

  if (!registerForm.username) errors.username = 'Không được để trống.'
  else errors.username = ''

  if (!registerForm.email) errors.email = 'Không được để trống.'
  else if (!isValidEmail(registerForm.email)) errors.email = 'Email không hợp lệ.'
  else errors.email = ''

  if (!registerForm.password) errors.password = 'Không được để trống.'
  else if (registerForm.password.length < 6) errors.password = 'Mật khẩu phải từ 6 ký tự.'
  else errors.password = ''

  if (!registerForm.confirmPassword) errors.confirmPassword = 'Vui lòng xác nhận.'
  else if (registerForm.confirmPassword !== registerForm.password) errors.confirmPassword = 'Mật khẩu không khớp.'
  else errors.confirmPassword = ''
}

const hasErrors = computed(() => {
  return Object.values(errors).some(err => err !== '') || 
         !registerForm.fullName || !registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword
})

const handleRegister = async () => {
  validateRegister()
  if (hasErrors.value) return

  isLoading.value = true
  
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerForm.username,
        password: registerForm.password,
        fullName: registerForm.fullName,
        email: registerForm.email
      })
    });

    const data = await response.json();

    if (data.success) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      toggleView(); // Tự động chuyển về trang đăng nhập
    } else {
      alert("Lỗi: " + data.message);
    }
  } catch (error) {
    alert("Lỗi kết nối đến máy chủ Backend!");
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Hiệu ứng chuyển cảnh giữa Login và Register */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>