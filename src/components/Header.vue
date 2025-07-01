<template>
  <header :class="[
    'fixed w-full top-0 z-50 backdrop-blur-lg border-b border-gray-200/20 shadow-xl',
    darkMode ? 'bg-gray-900/80' : 'bg-white/80'
  ]">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
                 @click="$router.push('/')">
              LG
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
                @click="$router.push('/')">
              Laura Gautier
            </h1>
            <p class="text-sm text-gray-500 font-medium">
              Full Stack Developer ✨
              <span v-if="isAuthenticated" class="text-green-500 ml-2">• Connectée</span>
            </p>
          </div>
        </div>
        
        <nav class="flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'active': $route.name === 'Home' }"
          >
            <Home :size="18" class="mr-1" />
            Accueil
          </router-link>
          
          <router-link
            to="/articles"
            class="nav-link"
            :class="{ 'active': $route.name === 'Articles' }"
          >
            <FileText :size="18" class="mr-1" />
            Articles
            <span v-if="articles.length > 0" class="ml-1 text-xs bg-purple-500 text-white rounded-full px-2 py-0.5">
              {{ articles.length }}
            </span>
          </router-link>

          <router-link
            to="/cv"
            class="nav-link"
            :class="{ 'active': $route.name === 'CreativeCV' }"
          >
            <FileDown :size="18" class="mr-1" />
            Export CV
          </router-link>

          <!-- Menu utilisateur -->
          <div class="flex items-center space-x-4">
            <!-- Bouton dark mode -->
            <button
              @click="toggleDarkMode"
              :class="[
                'p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg',
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
              ]"
              :title="darkMode ? 'Mode clair' : 'Mode sombre'"
            >
              <component :is="darkMode ? 'Sun' : 'Moon'" :size="20" />
            </button>

            <!-- Menu utilisateur connecté -->
            <div v-if="isAuthenticated" class="relative" ref="userMenuRef">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-3 p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition-all duration-300 shadow-lg"
                :title="`Connecté en tant que ${user?.name}`"
              >
                <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User :size="18" />
                </div>
                <div class="hidden md:block text-left">
                  <div class="text-sm font-medium">{{ user?.name }}</div>
                  <div class="text-xs opacity-75">{{ user?.role }}</div>
                </div>
                <ChevronDown :size="16" :class="{ 'rotate-180': showUserMenu }" class="transition-transform duration-200" />
              </button>

              <!-- Menu déroulant -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div v-if="showUserMenu" class="absolute right-0 top-full mt-2 w-64 glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  <div class="p-4 border-b border-white/10">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {{ user?.name?.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">{{ user?.name }}</p>
                        <p class="text-sm text-gray-500">{{ user?.email }}</p>
                        <p class="text-xs text-purple-600 dark:text-purple-400 capitalize">{{ user?.role }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-2">
                    <router-link
                      to="/articles"
                      @click="closeUserMenu"
                      class="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-purple-500/10 rounded-xl transition-all duration-200"
                    >
                      <Settings :size="18" />
                      <span>Gérer les articles</span>
                    </router-link>
                    
                    <button
                      @click="toggleDarkMode"
                      class="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 rounded-xl transition-all duration-200"
                    >
                      <component :is="darkMode ? 'Sun' : 'Moon'" :size="18" />
                      <span>{{ darkMode ? 'Mode clair' : 'Mode sombre' }}</span>
                    </button>
                    
                    <div class="border-t border-white/10 my-2"></div>
                    
                    <button
                      @click="handleLogout"
                      class="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                    >
                      <LogOut :size="18" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Bouton de connexion pour les utilisateurs non connectés -->
            <router-link
              v-else
              to="/login"
              class="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <LogIn :size="18" />
              <span class="hidden sm:block">Connexion</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../stores/main'
import { 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LogIn, 
  ChevronDown, 
  Home, 
  FileText, 
  Settings,
  FileDown 
} from 'lucide-vue-next'

export default {
  name: 'Header',
  components: {
    Sun,
    Moon,
    User,
    LogOut,
    LogIn,
    ChevronDown,
    Home,
    FileText,
    Settings,
    FileDown
  },
  setup() {
    const store = useMainStore()
    const router = useRouter()
    
    const darkMode = computed(() => store.darkMode)
    const isAuthenticated = computed(() => store.isAuthenticated)
    const user = computed(() => store.user)
    const articles = computed(() => store.articles)
    
    const showUserMenu = ref(false)
    const userMenuRef = ref(null)

    const toggleDarkMode = () => {
      store.toggleDarkMode()
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const closeUserMenu = () => {
      showUserMenu.value = false
    }

    const handleLogout = () => {
      store.logout()
      showUserMenu.value = false
      router.push('/')
      
      // Notification de déconnexion
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('Vous avez été déconnecté', 'info')
        }
      }, 100)
    }

    // Fermer le menu utilisateur quand on clique ailleurs
    const handleClickOutside = (event) => {
      if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
        showUserMenu.value = false
      }
    }

    // Fermer le menu quand on navigue
    const handleRouteChange = () => {
      showUserMenu.value = false
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      router.afterEach(handleRouteChange)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      darkMode,
      isAuthenticated,
      user,
      articles,
      showUserMenu,
      userMenuRef,
      toggleDarkMode,
      toggleUserMenu,
      closeUserMenu,
      handleLogout
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply relative px-4 py-2 font-medium transition-all duration-300 hover:scale-105 hover:text-purple-500 flex items-center;
}

.nav-link.active {
  @apply text-purple-600;
}

.nav-link.active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>