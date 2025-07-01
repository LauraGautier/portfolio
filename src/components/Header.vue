<template>
  <header :class="[
    'fixed w-full top-0 z-50 backdrop-blur-lg border-b border-gray-200/20 shadow-xl',
    darkMode ? 'bg-gray-900/80' : 'bg-white/80'
  ]">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300">
              LG
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Laura Gautier
            </h1>
            <p class="text-sm text-gray-500 font-medium">Full Stack Developer ✨</p>
          </div>
        </div>
        
        <nav class="flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'active': $route.name === 'Home' }"
          >
            Accueil
          </router-link>
          <router-link
            to="/articles"
            class="nav-link"
            :class="{ 'active': $route.name === 'Articles' }"
          >
            Articles
          </router-link>
          <button
            @click="toggleDarkMode"
            :class="[
              'p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg',
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
            ]"
          >
            <component :is="darkMode ? 'Sun' : 'Moon'" :size="20" />
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useMainStore } from '../stores/main'
import { Sun, Moon } from 'lucide-vue-next'

export default {
  name: 'Header',
  components: {
    Sun,
    Moon
  },
  setup() {
    const store = useMainStore()

    const darkMode = computed(() => store.darkMode)

    const toggleDarkMode = () => {
      store.toggleDarkMode()
    }

    return {
      darkMode,
      toggleDarkMode
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply relative px-4 py-2 font-medium transition-all duration-300 hover:scale-105 hover:text-purple-500;
}

.nav-link.active {
  @apply text-purple-600;
}

.nav-link.active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500;
}
</style>