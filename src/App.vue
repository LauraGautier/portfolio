<template>
  <div :class="[themeClasses, 'min-h-screen transition-all duration-300 relative overflow-x-hidden']">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="relative">
          <div class="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <div class="absolute inset-0 w-32 h-32 border-4 border-blue-500 border-b-transparent rounded-full animate-spin animation-delay-150 mx-auto"></div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4 animate-pulse">Laura Gautier</h2>
        <p class="text-purple-300 text-lg">Chargement du portfolio...</p>
        <div class="mt-4 flex justify-center space-x-2">
          <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-150"></div>
          <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>
    </div>

    <!-- App Content -->
    <div v-else>
      <FloatingParticles />
      <Header />
      <router-view />
      <Footer />
    </div>

    <!-- Toast de notification -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-full"
    >
      <div v-if="notification.show" 
           :class="[
             'fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg max-w-sm',
             notification.type === 'success' ? 'bg-green-500/20 border-green-500/30' : '',
             notification.type === 'error' ? 'bg-red-500/20 border-red-500/30' : '',
             notification.type === 'info' ? 'bg-blue-500/20 border-blue-500/30' : '',
             notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30' : ''
           ]">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <component 
              :is="getNotificationIcon()" 
              :size="20" 
              :class="[
                notification.type === 'success' ? 'text-green-500' : '',
                notification.type === 'error' ? 'text-red-500' : '',
                notification.type === 'info' ? 'text-blue-500' : '',
                notification.type === 'warning' ? 'text-yellow-500' : ''
              ]"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p :class="[
              'font-medium text-sm',
              notification.type === 'success' ? 'text-green-700 dark:text-green-300' : '',
              notification.type === 'error' ? 'text-red-700 dark:text-red-300' : '',
              notification.type === 'info' ? 'text-blue-700 dark:text-blue-300' : '',
              notification.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' : ''
            ]">
              {{ notification.message }}
            </p>
          </div>
          <button 
            @click="hideNotification" 
            class="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X :size="16" />
          </button>
        </div>
        
        <!-- Barre de progression -->
        <div class="mt-2 w-full bg-gray-200/20 rounded-full h-1 overflow-hidden">
          <div 
            class="h-full transition-all duration-100 ease-linear"
            :class="[
              notification.type === 'success' ? 'bg-green-500' : '',
              notification.type === 'error' ? 'bg-red-500' : '',
              notification.type === 'info' ? 'bg-blue-500' : '',
              notification.type === 'warning' ? 'bg-yellow-500' : ''
            ]"
            :style="{ width: progressWidth + '%' }"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, onUnmounted } from 'vue'
import { useMainStore } from './stores/main'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingParticles from './components/FloatingParticles.vue'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    FloatingParticles,
    CheckCircle,
    AlertCircle,
    Info,
    AlertTriangle,
    X
  },
  setup() {
    const store = useMainStore()

    const themeClasses = computed(() => store.themeClasses)
    const isLoading = computed(() => store.isLoading)

    // Système de notifications
    const notification = reactive({
      show: false,
      message: '',
      type: 'info', // success, error, info, warning
      timeout: null,
      duration: 4000
    })

    const progressWidth = ref(100)
    const progressInterval = ref(null)

    const showNotification = (message, type = 'info', duration = 4000) => {
      // Effacer les timeouts précédents
      if (notification.timeout) {
        clearTimeout(notification.timeout)
      }
      if (progressInterval.value) {
        clearInterval(progressInterval.value)
      }

      notification.message = message
      notification.type = type
      notification.duration = duration
      notification.show = true
      progressWidth.value = 100

      // Animation de la barre de progression
      let elapsed = 0
      const updateInterval = 50
      progressInterval.value = setInterval(() => {
        elapsed += updateInterval
        progressWidth.value = Math.max(0, 100 - (elapsed / duration) * 100)
        
        if (elapsed >= duration) {
          hideNotification()
        }
      }, updateInterval)

      // Backup timeout au cas où
      notification.timeout = setTimeout(() => {
        hideNotification()
      }, duration + 100)
    }

    const hideNotification = () => {
      notification.show = false
      progressWidth.value = 0
      
      if (notification.timeout) {
        clearTimeout(notification.timeout)
        notification.timeout = null
      }
      if (progressInterval.value) {
        clearInterval(progressInterval.value)
        progressInterval.value = null
      }
    }

    const getNotificationIcon = () => {
      switch (notification.type) {
        case 'success':
          return 'CheckCircle'
        case 'error':
          return 'AlertCircle'
        case 'warning':
          return 'AlertTriangle'
        default:
          return 'Info'
      }
    }

    onMounted(async () => {
      try {
        // Vérifier l'authentification au démarrage
        store.checkAuth()
        
        // Charger les articles sauvegardés
        store.loadArticles()

        // Simulate loading time
        setTimeout(() => {
          store.setLoading(false)
          
          // Notification de bienvenue si connecté
          if (store.isAuthenticated) {
            setTimeout(() => {
              showNotification(`Bon retour ${store.user?.name} ! 👋`, 'success', 3000)
            }, 500)
          }
        }, 2000)

        // Initialize external APIs
        await Promise.all([
          store.fetchWeatherData(),
          store.fetchRegions()
        ])

      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error)
        showNotification('Erreur lors du chargement de certaines données', 'warning')
        store.setLoading(false)
      }
    })

    onUnmounted(() => {
      if (notification.timeout) {
        clearTimeout(notification.timeout)
      }
      if (progressInterval.value) {
        clearInterval(progressInterval.value)
      }
    })

    // Exposer la fonction de notification globalement
    window.showNotification = showNotification

    return {
      themeClasses,
      isLoading,
      notification,
      progressWidth,
      showNotification,
      hideNotification,
      getNotificationIcon
    }
  }
}
</script>

<style>
/* Animation pour les particles */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Animation delays */
.animation-delay-150 {
  animation-delay: 150ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

/* Amélioration du scroll */
html {
  scroll-behavior: smooth;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Dark mode pour les scrollbars */
.dark ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

/* Focus states améliorés */
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* Transitions globales */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>