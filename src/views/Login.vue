<template>
  <div class="min-h-screen pt-24 pb-20 flex items-center justify-center">
    <div class="container mx-auto px-6">
      <div class="max-w-md mx-auto">
        <div class="glass rounded-3xl p-8 shadow-2xl border border-white/10">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              <LogIn :size="32" />
            </div>
            <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Connexion
            </h1>
            <p class="text-gray-600 dark:text-gray-300">
              Accédez à l'espace administrateur
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Email
              </label>
              <div class="relative">
                <Mail :size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  v-model="loginForm.email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  class="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300/20 glass focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Mot de passe
              </label>
              <div class="relative">
                <Lock :size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  class="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-300/20 glass focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <component :is="showPassword ? 'EyeOff' : 'Eye'" :size="20" />
                </button>
              </div>
            </div>

            <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div class="flex items-center">
                <AlertCircle :size="20" class="text-red-500 mr-2" />
                <span class="text-red-600 dark:text-red-400">{{ errorMessage }}</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <div v-if="isLoading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <LogIn v-else :size="20" class="mr-2" />
              {{ isLoading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500 mb-4">
              💡 Compte de démonstration :
            </p>
            <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
              <div class="space-y-2 text-sm">
                <div class="font-mono">
                  <strong>Email :</strong> admin@admin.com
                </div>
                <div class="font-mono">
                  <strong>Mot de passe :</strong> password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../stores/main'
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-vue-next'

export default {
  name: 'Login',
  components: {
    LogIn,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle
  },
  setup() {
    const router = useRouter()
    const store = useMainStore()
    
    const loginForm = ref({
      email: '',
      password: ''
    })
    
    const showPassword = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      isLoading.value = true
      errorMessage.value = ''

      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Vérification des identifiants (pour la démo)
        if (loginForm.value.email === 'admin@admin.com' && loginForm.value.password === 'password') {
          store.login({
            id: 1,
            name: 'Laura Gautier',
            email: 'admin@admin.com',
            role: 'admin'
          })
          
          // Redirection vers les articles
          router.push('/articles')
        } else {
          errorMessage.value = 'Email ou mot de passe incorrect'
        }
      } catch (error) {
        errorMessage.value = 'Une erreur est survenue lors de la connexion'
      } finally {
        isLoading.value = false
      }
    }

    return {
      loginForm,
      showPassword,
      isLoading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>