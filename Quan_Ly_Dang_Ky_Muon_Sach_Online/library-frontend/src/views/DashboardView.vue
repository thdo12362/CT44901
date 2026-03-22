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
            <router-link to="/" class="text-blue-600 font-medium">Trang chủ</router-link>
            <a href="#book-catalog" class="text-gray-500 hover:text-blue-600 transition-colors font-medium">Danh sách Sách</a>
            <template v-if="isLoggedIn">
              <router-link to="/my-books" class="text-gray-500 hover:text-blue-600 transition-colors font-medium">My Books</router-link>
            </template>
          </nav>

          <div class="flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <button @click="router.push('/login')" class="hidden md:block text-gray-600 font-medium hover:text-blue-600">Đăng nhập</button>
              <button @click="router.push('/login')" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blue-600/30">Đăng ký</button>
            </template>
            
            <template v-else>
              <div class="relative">
                <button @click="showNotifications = !showNotifications; showDropdown = false" class="p-2 text-gray-400 hover:text-blue-600 transition-colors relative focus:outline-none">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span v-if="userNotifications.length > 0" class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
                <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                  <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                    <span class="font-bold text-gray-700">Thông báo của bạn</span>
                    <span class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">{{ userNotifications.length }}</span>
                  </div>
                  <div class="max-h-[350px] overflow-y-auto">
                    <div v-if="userNotifications.length === 0" class="px-4 py-8 text-center text-gray-400 text-sm">
                      Bạn không có thông báo nào.
                    </div>
                    <div v-for="(notif, index) in userNotifications" :key="index" :class="['px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors', notif.bgClass]" @click="router.push('/my-books')">
                      <p :class="['text-sm font-semibold', notif.titleClass]">{{ notif.title }}</p>
                      <p class="text-xs text-gray-500 mt-1 leading-snug">{{ notif.message }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative">
                <button @click="showDropdown = !showDropdown; showNotifications = false" class="flex items-center space-x-2 focus:outline-none pl-2">
                  <span class="font-medium text-gray-700 hidden md:block">{{ username }}</span>
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                    {{ username.charAt(0).toUpperCase() }}
                  </div>
                </button>
                <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
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

    <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 overflow-hidden text-center">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div class="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">Hệ thống mượn sách <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Online</span></h1>
        <p class="text-xl text-blue-100 max-w-2xl mx-auto mb-10 font-light">Tìm kiếm và mượn sách dễ dàng. Khám phá kho tàng tri thức khổng lồ ngay hôm nay.</p>
        <a href="#book-catalog" class="inline-block bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-black/20">Khám phá sách</a>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
      <div class="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2 border border-gray-100">
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Tìm kiếm tên sách, tác giả..." class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all" />
        </div>
        
        <div class="w-full md:w-56">
          <select v-model="selectedCategory" class="w-full px-4 py-3.5 rounded-xl bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-200 text-gray-600 cursor-pointer">
            <option value="ALL">Tất cả thể loại</option>
            <option value="Văn học">Văn học</option>
            <option value="Khoa học">Khoa học</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Tâm lý">Tâm lý</option>
            <option value="Giáo trình">Giáo trình</option>
          </select>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-colors">Tìm kiếm</button>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-6 flex items-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mr-5 bg-blue-100 text-blue-600">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tổng số sách</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalBooks }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 flex items-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mr-5 bg-purple-100 text-purple-600">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Người dùng</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalUsers }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 flex items-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mr-5 bg-indigo-100 text-indigo-600">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806" /></svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Lượt mượn</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalLoans }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Sách Nổi Bật</h2>
          <p class="text-gray-500 mt-2">Tuyển tập những đầu sách được yêu thích nhất.</p>
        </div>
        <div class="flex space-x-2 mt-4 md:mt-0 bg-gray-100 p-1 rounded-xl w-max">
          <button @click="activeTab = 'NEW'" :class="['px-5 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'NEW' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']">Sách Mới</button>
          <button @click="activeTab = 'HOT'" :class="['px-5 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'HOT' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']">Sách Hot</button>
          <button @click="activeTab = 'TREND'" :class="['px-5 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'TREND' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']">Mượn Nhiều</button>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="book in featuredBooks" :key="'feat-'+book._id" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
          <div class="relative h-48 bg-gray-100 overflow-hidden">
            <img v-if="book.image" :src="'http://localhost:5000/uploads/' + book.image" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" alt="Bìa sách" />
            <div v-else class="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-200">{{ book.title.charAt(0) }}</div>
            <div class="absolute top-2 left-2 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm" v-if="activeTab === 'NEW'">MỚI</div>
            <div class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm" v-if="activeTab === 'HOT'">HOT</div>
          </div>
          <div class="p-4 flex flex-col flex-1">
            <h3 class="font-bold text-gray-900 line-clamp-1 mb-1" :title="book.title">{{ book.title }}</h3>
            <p class="text-xs text-gray-500 mb-1">{{ book.author }}</p>
            
            <p class="text-xs text-blue-600 font-semibold mb-3 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              {{ book.borrowCount || 0 }} lượt mượn
            </p>
            
            <template v-if="getPendingLoan(book._id)">
              <button @click="cancelLoan(getPendingLoan(book._id)._id)" class="mt-auto w-full py-2 rounded-lg text-sm font-medium transition-all bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border border-red-200">
                Đang chờ duyệt (Hủy)
              </button>
            </template>
            <template v-else>
              <button @click="openBorrowModal(book)" :disabled="book.quantity <= 0" class="mt-auto w-full py-2 rounded-lg text-sm font-medium transition-all bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white disabled:bg-gray-100 disabled:text-gray-400">
                {{ book.quantity > 0 ? 'Mượn ngay' : 'Hết sách' }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section id="book-catalog" class="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100 mt-8">
      <div class="mb-8 flex justify-between items-end">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Tất cả danh mục</h2>
          <p class="text-gray-500 mt-1 text-sm">Tìm kiếm và lọc theo nhu cầu của bạn.</p>
        </div>
      </div>

      <div v-if="filteredBooks.length === 0" class="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-xl font-bold text-gray-700">Không tìm thấy sách</h3>
        <p class="text-gray-500 mt-2">Thử tìm kiếm với từ khóa khác nhé!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="book in filteredBooks" :key="book._id" class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col">
          <div class="flex gap-4 mb-4">
            <div class="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
              <img v-if="book.image" :src="'http://localhost:5000/uploads/' + book.image" class="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Bìa" />
              <div v-else class="w-full h-full flex items-center justify-center text-blue-400 font-bold text-xl bg-blue-50">{{ book.title.charAt(0) }}</div>
            </div>
            <div class="flex-1 flex flex-col pt-1">
              <div class="flex justify-start mb-2">
                <span :class="['px-2 py-0.5 text-[10px] font-black rounded text-white', book.quantity > 0 ? 'bg-green-500' : 'bg-red-500']">
                  {{ book.quantity > 0 ? 'CÒN SÁCH' : 'HẾT SÁCH' }}
                </span>
              </div>
              <h3 class="font-bold text-gray-800 text-sm line-clamp-2 leading-snug" :title="book.title">{{ book.title }}</h3>
              <p class="text-xs text-gray-500 mt-1 mb-1">{{ book.author }}</p>
              
              <p class="text-[11px] text-blue-600 font-semibold flex items-center mt-auto">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {{ book.borrowCount || 0 }} lượt mượn
              </p>
            </div>
          </div>
          
          <template v-if="getPendingLoan(book._id)">
            <button @click="cancelLoan(getPendingLoan(book._id)._id)" class="mt-auto w-full py-2.5 rounded-xl font-medium text-sm transition-all bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border border-red-200">
              Đang chờ duyệt (Nhấn để Hủy)
            </button>
          </template>
          <template v-else>
            <button 
              @click="openBorrowModal(book)" 
              :disabled="book.quantity <= 0"
              :class="['mt-auto w-full py-2.5 rounded-xl font-medium text-sm transition-all', 
                       book.quantity > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed']"
            >
              Mượn sách
            </button>
          </template>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 py-12 border-t border-gray-800 mt-10">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h3 class="text-white font-bold text-2xl mb-2 flex items-center justify-center">
          <span class="text-blue-500 mr-2">📚</span> Thư Viện Online
        </h3>
        <p class="text-gray-400 mb-8 text-sm max-w-lg mx-auto">
          Hệ thống quản lý mượn sách trực tuyến nhanh chóng, tiện lợi. Nơi kết nối tri thức và độc giả một cách dễ dàng nhất.
        </p>
        
        <div class="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8 text-sm mb-8 bg-gray-800/50 py-4 px-6 rounded-2xl w-max mx-auto border border-gray-700">
          <p class="text-gray-300 flex items-center">
            <span class="mr-2 text-xl">📧</span> 
            <a href="mailto:doolaam2005@gmail.com" class="hover:text-blue-400 transition-colors">doolaam2005@gmail.com</a>
          </p>
          <div class="hidden md:block w-px h-4 bg-gray-600"></div>
          <p class="text-gray-300 flex items-center">
            <span class="mr-2 text-xl">📞</span> 
            <span class="font-bold text-blue-400 tracking-wide">0774600275</span>
          </p>
        </div>
        
        <div class="border-t border-gray-800 pt-6 text-xs text-gray-500">
          <p class="uppercase tracking-widest font-bold mb-2">Developed by <span class="text-blue-500">LamThanhDo</span></p>
          <p>&copy; 2026 Thư Viện CT449. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <div v-if="showBorrowModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div class="bg-blue-600 p-6 text-white flex justify-between items-center">
          <h3 class="font-bold text-lg">Đăng ký mượn sách</h3>
          <button @click="showBorrowModal = false" class="text-blue-200 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div class="p-6">
          <div class="flex gap-4 mb-6 bg-blue-50 p-4 rounded-xl">
            <img v-if="selectedBook.image" :src="'http://localhost:5000/uploads/' + selectedBook.image" class="w-16 h-24 object-cover rounded shadow-sm" />
            <div v-else class="w-16 h-24 bg-blue-200 rounded flex items-center justify-center text-blue-600 font-bold">{{ selectedBook.title.charAt(0) }}</div>
            <div>
              <p class="font-bold text-gray-900 line-clamp-2">{{ selectedBook.title }}</p>
              <p class="text-sm text-gray-500">{{ selectedBook.author }}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Số ngày mượn (Mặc định 7 ngày)</label>
            <input type="number" v-model="daysToBorrow" min="1" max="30" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <div class="flex gap-3">
            <button @click="showBorrowModal = false" class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Hủy</button>
            <button @click="confirmBorrow" :disabled="isProcessing" class="flex-1 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 flex justify-center items-center">
              {{ isProcessing ? 'Đang gửi...' : 'Xác nhận mượn' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')
const showDropdown = ref(false)
const showNotifications = ref(false)

const searchQuery = ref('')
const selectedCategory = ref('ALL') 
const books = ref([])
const myLoans = ref([]) 
const stats = ref({ totalBooks: 0, totalUsers: 0, totalLoans: 0 }) 

const showBorrowModal = ref(false)
const selectedBook = ref(null)
const daysToBorrow = ref(7)
const isProcessing = ref(false)
const activeTab = ref('NEW')

// ===============================================
// THÊM: LOGIC TÍNH TOÁN THÔNG BÁO ĐỘNG (NOTIFICATIONS)
// ===============================================
const userNotifications = computed(() => {
  const notifs = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Đưa về 0h để tính ngày cho chuẩn

  // Duyệt qua toàn bộ lịch sử mượn để sinh thông báo
  myLoans.value.forEach(loan => {
    const bookTitle = loan.bookId?.title || 'Sách';
    
    // Nếu sách đang mượn (APPROVED)
    if (loan.status === 'APPROVED') {
      const dueDate = new Date(loan.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      // Tính khoảng cách giữa ngày trả và ngày hiện tại
      const timeDiff = dueDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff < 0) {
        notifs.push({ 
          title: '⚠️ Quá hạn trả sách', 
          message: `Bạn đã quá hạn trả sách '${bookTitle}'. Vui lòng hoàn trả ngay để tránh bị phạt!`, 
          titleClass: 'text-red-600', bgClass: 'hover:bg-red-50' 
        });
      } else if (daysDiff <= 2) {
        const dayText = daysDiff === 0 ? 'hôm nay' : daysDiff === 1 ? 'ngày mai' : '2 ngày nữa';
        notifs.push({ 
          title: '⏰ Nhắc hạn trả sách', 
          message: `Sách '${bookTitle}' sẽ đến hạn vào ${dayText}.`, 
          titleClass: 'text-orange-500', bgClass: 'hover:bg-orange-50' 
        });
      } else {
        notifs.push({ 
          title: '✅ Yêu cầu được duyệt', 
          message: `Yêu cầu mượn '${bookTitle}' đã được duyệt. Bạn nhớ trả đúng hạn nhé!`, 
          titleClass: 'text-green-600', bgClass: 'hover:bg-green-50' 
        });
      }
    } 
    // Nếu đơn bị Thủ thư từ chối
    else if (loan.status === 'REJECTED') {
      notifs.push({ 
        title: '❌ Yêu cầu bị từ chối', 
        message: `Yêu cầu mượn '${bookTitle}' đã bị Thủ thư từ chối.`, 
        titleClass: 'text-red-500', bgClass: 'hover:bg-red-50' 
      });
    } 
    // Nếu đã trả sách thành công
    else if (loan.status === 'COMPLETED') {
      notifs.push({ 
        title: '🎉 Xác nhận đã trả', 
        message: `Bạn đã trả sách '${bookTitle}' thành công. Cảm ơn bạn!`, 
        titleClass: 'text-blue-600', bgClass: 'hover:bg-blue-50' 
      });
    }
  });
  
  return notifs;
});

const fetchBooks = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/books');
    const data = await res.json();
    if (data.success) books.value = data.data;
  } catch (e) { console.error("Lỗi lấy sách:", e); }
};

const fetchMyLoans = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  try {
    const res = await fetch(`http://localhost:5000/api/loans/user/${userId}`);
    const data = await res.json();
    if (data.success) myLoans.value = data.data;
  } catch (e) { console.error("Lỗi lấy phiếu mượn:", e); }
};

const fetchStats = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/stats');
    const data = await res.json();
    if (data.success) stats.value = data.data;
  } catch (e) { console.error("Lỗi lấy thống kê:", e); }
};

const filteredBooks = computed(() => {
  let result = books.value;
  if (selectedCategory.value !== 'ALL') {
    result = result.filter(b => b.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    result = result.filter(b => 
      b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      b.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return result;
});

const featuredBooks = computed(() => {
  let list = [...books.value];
  if(activeTab.value === 'HOT') list.reverse();
  if(activeTab.value === 'TREND') list = list.sort(() => 0.5 - Math.random());
  return list.slice(0, 4); 
});

const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  window.location.reload(); 
};

const getPendingLoan = (bookId) => {
  return myLoans.value.find(loan => 
    (loan.bookId?._id === bookId || loan.bookId === bookId) && loan.status === 'PENDING'
  );
};

const openBorrowModal = (book) => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  if (localStorage.getItem('role') === 'ADMIN') {
    alert('Tài khoản Admin không được phép mượn sách!');
    return;
  }
  selectedBook.value = book;
  daysToBorrow.value = 7; 
  showBorrowModal.value = true;
};

const confirmBorrow = async () => {
  isProcessing.value = true;
  try {
    const response = await fetch('http://localhost:5000/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: selectedBook.value._id,
        userId: localStorage.getItem('userId'),
        daysToBorrow: daysToBorrow.value
      })
    });
    const data = await response.json();
    if (data.success) {
      alert("Gửi yêu cầu mượn thành công!");
      showBorrowModal.value = false;
      fetchBooks(); 
      fetchMyLoans(); 
      fetchStats();   
    } else { alert("Lỗi: " + data.message); }
  } catch (error) { alert("Lỗi hệ thống!"); } 
  finally { isProcessing.value = false; }
};

const cancelLoan = async (loanId) => {
  if(!confirm("Bạn có chắc chắn muốn hủy yêu cầu mượn cuốn sách này?")) return;
  try {
    const response = await fetch(`http://localhost:5000/api/loans/${loanId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if(data.success) {
      alert("Đã hủy yêu cầu mượn sách thành công!");
      fetchBooks(); 
      fetchMyLoans(); 
      fetchStats();
    } else { alert(data.message); }
  } catch (error) { alert("Lỗi khi hủy!"); }
};

onMounted(() => {
  fetchBooks();
  fetchStats();
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  username.value = localStorage.getItem('username') || '';
  if (isLoggedIn.value) {
    fetchMyLoans();
  }
});
</script>

<style scoped>
html { scroll-behavior: smooth; }
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>