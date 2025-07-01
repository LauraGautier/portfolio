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
      </div>
    </div>

    <!-- App Content -->
    <div v-else>
      <FloatingParticles />
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useMainStore } from './stores/main'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingParticles from './components/FloatingParticles.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    FloatingParticles
  },
  setup() {
    const store = useMainStore()

    const themeClasses = computed(() => store.themeClasses)
    const isLoading = computed(() => store.isLoading)

    onMounted(async () => {
      // Simulate loading time
      setTimeout(() => {
        store.setLoading(false)
      }, 2000)

      // Initialize data
      await store.fetchWeatherData()
      await store.fetchRegions()
    })

    return {
      themeClasses,
      isLoading
    }
  }
}
</script>