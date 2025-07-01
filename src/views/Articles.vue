<template>
  <div class="min-h-screen pt-24 pb-20">
    <div class="container mx-auto px-6">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div class="flex-1">
          <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Articles & Projets
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-100">
            Découvrez mes dernières réalisations et réflexions
          </p>
          <div class="flex items-center space-x-4 mt-4">
            <div class="flex items-center text-sm text-gray-500">
              <FileText :size="16" class="mr-1" />
              {{ articles.length }} article{{ articles.length > 1 ? 's' : '' }}
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <Eye :size="16" class="mr-1" />
              {{ totalViews }} vues au total
            </div>
          </div>
        </div>
        
        <!-- Bouton d'ajout visible seulement pour les utilisateurs connectés -->
        <div class="flex flex-col items-end space-y-4">
          <button
            v-if="canManageArticles"
            @click="openArticleForm"
            class="group bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
          >
            <Plus :size="20" class="group-hover:rotate-90 transition-transform duration-300" />
            <span>Nouvel Article</span>
          </button>
          
          <!-- Message pour les utilisateurs non connectés -->
          <div v-else-if="!isAuthenticated" class="text-right">
            <p class="text-gray-500 dark:text-gray-400 mb-2">Vous souhaitez ajouter un article ?</p>
            <router-link
              to="/login"
              class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            >
              <LogIn :size="18" />
              <span>Se connecter</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Formulaire d'article (visible seulement pour les admins) -->
      <div v-if="showArticleForm && canManageArticles" class="mb-12 glass rounded-3xl p-8 shadow-2xl border border-white/10">
        <h3 class="text-2xl font-bold mb-6 flex items-center">
          <Edit :size="24" class="mr-3 text-purple-500" />
          {{ editingArticle ? 'Modifier l\'article' : 'Créer un nouvel article' }}
        </h3>
        <form @submit.prevent="handleSubmit" class="grid gap-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Titre de l'article *
              </label>
              <input
                v-model="articleForm.title"
                type="text"
                placeholder="Titre accrocheur de votre article"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                Catégorie *
              </label>
              <input
                v-model="articleForm.category"
                type="text"
                placeholder="ex: Projet professionnel, Personnel..."
                required
                class="form-input"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Tags (optionnel)
            </label>
            <input
              v-model="articleForm.tags"
              type="text"
              placeholder="Vue.js, Laravel, API, Design... (séparés par des virgules)"
              class="form-input"
            />
            <p class="text-sm text-gray-500 mt-1">Séparez les tags par des virgules</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Contenu de l'article *
            </label>
            <textarea
              v-model="articleForm.content"
              placeholder="Décrivez votre projet, les technologies utilisées, les défis rencontrés..."
              rows="6"
              required
              class="form-input resize-none"
            />
          </div>
          
          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="!articleForm.title || !articleForm.content || !articleForm.category"
              class="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ editingArticle ? 'Mettre à jour' : 'Publier l\'article' }}
            </button>
            <button
              type="button"
              @click="closeArticleForm"
              class="bg-gray-500 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Message d'erreur pour les actions non autorisées -->
      <div v-if="errorMessage" class="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
        <div class="flex items-center">
          <AlertCircle :size="20" class="text-red-500 mr-2" />
          <span class="text-red-600 dark:text-red-400">{{ errorMessage }}</span>
          <button @click="clearError" class="ml-auto text-red-500 hover:text-red-700">
            <X :size="16" />
          </button>
        </div>
      </div>

      <!-- Filtres et tri -->
      <div v-if="articles.length > 0" class="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = selectedCategory === category ? '' : category"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900'
            ]"
          >
            {{ category }}
          </button>
          <button
            v-if="selectedCategory"
            @click="selectedCategory = ''"
            class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X :size="14" class="inline mr-1" />
            Tout afficher
          </button>
        </div>
        
        <div class="text-sm text-gray-500">
          {{ filteredArticles.length }} article{{ filteredArticles.length > 1 ? 's' : '' }}
          {{ selectedCategory ? `dans "${selectedCategory}"` : 'au total' }}
        </div>
      </div>

      <!-- Liste des articles -->
      <div v-if="filteredArticles.length > 0" class="grid gap-8">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="group glass hover-scale-102 rounded-3xl p-8 transition-all duration-500 shadow-lg hover:shadow-2xl border border-white/10 hover:border-purple-500/20"
        >
          <div class="flex justify-between items-start mb-6">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                  {{ article.category }}
                </span>
                <div class="flex items-center text-gray-500 text-sm">
                  <Eye :size="14" class="mr-1" />
                  <span>{{ article.views }} vues</span>
                </div>
                <div class="flex items-center text-gray-500 text-sm">
                  <Calendar :size="14" class="mr-1" />
                  <time>{{ formatDate(article.date) }}</time>
                </div>
              </div>
              
              <h2 
                :style="{ color: darkMode ? '#ffffff' : '#1f2937' }"
                class="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300 cursor-pointer"
                @click="incrementViews(article.id)"
              >
                {{ article.title }}
              </h2>
              
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                {{ article.content }}
              </p>
              
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Actions d'administration (visibles seulement pour les admins) -->
            <div v-if="canManageArticles" class="flex flex-col space-y-2 ml-6">
              <button
                @click="editArticle(article)"
                class="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                title="Modifier l'article"
              >
                <Edit2 :size="18" />
              </button>
              <button
                @click="confirmDelete(article)"
                class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                title="Supprimer l'article"
              >
                <Trash2 :size="18" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Message si aucun article -->
      <div v-else class="text-center py-20">
        <div class="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <FileText :size="32" class="text-purple-500" />
        </div>
        <h3 class="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">
          {{ selectedCategory ? `Aucun article dans "${selectedCategory}"` : 'Aucun article pour le moment' }}
        </h3>
        <p class="text-gray-400 dark:text-gray-500 mb-4">
          {{ canManageArticles 
            ? (selectedCategory ? 'Essayez une autre catégorie ou créez votre premier article !' : 'Créez votre premier article !') 
            : (selectedCategory ? 'Essayez une autre catégorie.' : 'Revenez bientôt pour découvrir du nouveau contenu.') 
          }}
        </p>
        <button
          v-if="selectedCategory"
          @click="selectedCategory = ''"
          class="bg-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
        >
          Voir tous les articles
        </button>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <AlertCircle :size="32" class="text-red-500" />
          </div>
          <h3 class="text-xl font-bold mb-2">Confirmer la suppression</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-2">
            Êtes-vous sûr de vouloir supprimer cet article ?
          </p>
          <p class="text-sm text-gray-500">
            <strong>"{{ articleToDelete?.title }}"</strong>
          </p>
          <p class="text-xs text-red-500 mt-2">Cette action est irréversible.</p>
        </div>
        <div class="flex space-x-4">
          <button
            @click="deleteArticle"
            class="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 transition-colors duration-200"
          >
            Supprimer
          </button>
          <button
            @click="closeDeleteModal"
            class="flex-1 bg-gray-500 text-white py-3 rounded-2xl font-semibold hover:bg-gray-600 transition-colors duration-200"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useMainStore } from '../stores/main'
import { 
  Plus, 
  Edit, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  FileText, 
  LogIn, 
  AlertCircle,
  X
} from 'lucide-vue-next'

export default {
  name: 'Articles',
  components: {
    Plus,
    Edit,
    Edit2,
    Trash2,
    Eye,
    Calendar,
    FileText,
    LogIn,
    AlertCircle,
    X
  },
  setup() {
    const store = useMainStore()
    
    const articles = computed(() => store.sortedArticles)
    const darkMode = computed(() => store.darkMode)
    const isAuthenticated = computed(() => store.isAuthenticated)
    const canManageArticles = computed(() => store.canManageArticles)
    const categories = computed(() => store.categories)
    
    const showArticleForm = ref(false)
    const editingArticle = ref(null)
    const showDeleteModal = ref(false)
    const articleToDelete = ref(null)
    const errorMessage = ref('')
    const selectedCategory = ref('')
    
    const articleForm = reactive({
      title: '',
      content: '',
      category: '',
      tags: ''
    })

    // Articles filtrés par catégorie
    const filteredArticles = computed(() => {
      if (!selectedCategory.value) return articles.value
      return articles.value.filter(article => article.category === selectedCategory.value)
    })

    // Total des vues
    const totalViews = computed(() => {
      return articles.value.reduce((sum, article) => sum + article.views, 0)
    })

    const openArticleForm = () => {
      if (!canManageArticles.value) {
        showError('Vous devez être connecté en tant qu\'administrateur pour ajouter un article')
        return
      }
      showArticleForm.value = true
      resetForm()
    }

    const closeArticleForm = () => {
      showArticleForm.value = false
      editingArticle.value = null
      resetForm()
    }

    const resetForm = () => {
      articleForm.title = ''
      articleForm.content = ''
      articleForm.category = ''
      articleForm.tags = ''
    }

    const handleSubmit = () => {
      try {
        if (editingArticle.value) {
          store.updateArticle(editingArticle.value.id, articleForm)
          if (window.showNotification) {
            window.showNotification('Article modifié avec succès !', 'success')
          }
        } else {
          store.addArticle(articleForm)
          if (window.showNotification) {
            window.showNotification('Article publié avec succès !', 'success')
          }
        }
        closeArticleForm()
        clearError()
      } catch (error) {
        showError(error.message)
      }
    }

    const editArticle = (article) => {
      if (!canManageArticles.value) {
        showError('Vous devez être connecté en tant qu\'administrateur pour modifier un article')
        return
      }
      
      editingArticle.value = article
      articleForm.title = article.title
      articleForm.content = article.content
      articleForm.category = article.category
      articleForm.tags = Array.isArray(article.tags) ? article.tags.join(', ') : article.tags
      showArticleForm.value = true
    }

    const confirmDelete = (article) => {
      if (!canManageArticles.value) {
        showError('Vous devez être connecté en tant qu\'administrateur pour supprimer un article')
        return
      }
      
      articleToDelete.value = article
      showDeleteModal.value = true
    }

    const deleteArticle = () => {
      try {
        store.deleteArticle(articleToDelete.value.id)
        closeDeleteModal()
        clearError()
        if (window.showNotification) {
          window.showNotification('Article supprimé avec succès', 'success')
        }
      } catch (error) {
        showError(error.message)
      }
    }

    const closeDeleteModal = () => {
      showDeleteModal.value = false
      articleToDelete.value = null
    }

    const incrementViews = (articleId) => {
      store.incrementViews(articleId)
    }

    const showError = (message) => {
      errorMessage.value = message
      setTimeout(() => {
        clearError()
      }, 5000)
    }

    const clearError = () => {
      errorMessage.value = ''
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      articles,
      filteredArticles,
      totalViews,
      categories,
      selectedCategory,
      darkMode,
      isAuthenticated,
      canManageArticles,
      showArticleForm,
      editingArticle,
      showDeleteModal,
      articleToDelete,
      errorMessage,
      articleForm,
      openArticleForm,
      closeArticleForm,
      handleSubmit,
      editArticle,
      confirmDelete,
      deleteArticle,
      closeDeleteModal,
      incrementViews,
      clearError,
      formatDate
    }
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 rounded-2xl border border-gray-300/20 glass focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.hover-scale-102:hover {
  transform: scale(1.02);
}
</style>