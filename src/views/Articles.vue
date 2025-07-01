<template>
  <div class="min-h-screen pt-24 pb-20">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Articles & Projets
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-100">
            Découvrez mes dernières réalisations et réflexions
          </p>
        </div>
        <button
          @click="openArticleForm"
          class="group bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
        >
          <Plus :size="20" class="group-hover:rotate-90 transition-transform duration-300" />
          <span>Nouvel Article</span>
        </button>
      </div>

      <!-- Formulaire d'article -->
      <div v-if="showArticleForm" class="mb-12 glass rounded-3xl p-8 shadow-2xl">
        <h3 class="text-2xl font-bold mb-6 flex items-center">
          <Edit :size="24" class="mr-3 text-purple-500" />
          {{ editingArticle ? 'Modifier l\'article' : 'Créer un nouvel article' }}
        </h3>
        <form @submit.prevent="handleSubmit" class="grid gap-6">
          <div class="grid md:grid-cols-2 gap-6">
            <input
              v-model="articleForm.title"
              type="text"
              placeholder="Titre de l'article"
              required
              class="form-input"
            />
            <input
              v-model="articleForm.category"
              type="text"
              placeholder="Catégorie"
              required
              class="form-input"
            />
          </div>
          <input
            v-model="articleForm.tags"
            type="text"
            placeholder="Tags (séparés par des virgules)"
            class="form-input"
          />
          <textarea
            v-model="articleForm.content"
            placeholder="Contenu de l'article"
            rows="6"
            required
            class="form-input resize-none"
          />
          <div class="flex space-x-4">
            <button
              type="submit"
              class="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            >
              {{ editingArticle ? 'Mettre à jour' : 'Publier' }}
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

      <!-- Liste des articles -->
      <div class="grid gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="group glass hover-scale-102 rounded-3xl p-8 transition-all duration-500 shadow-lg hover:shadow-2xl"
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
              </div>
                <h2 
                :style="{ color: darkMode ? '#ffffff' : '#1f2937' }"
                class="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors duration-300"
                >
                {{ article.title }}
                </h2>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2 ml-4">
              <button
                @click="editArticle(article)"
                class="p-3 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <Edit :size="18" />
              </button>
              <button
                @click="deleteArticle(article.id)"
                class="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <Trash2 :size="18" />
              </button>
            </div>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
            {{ article.content }}
          </p>
          
          <div class="flex items-center justify-between pt-6 border-t border-gray-200/20">
            <div class="flex items-center text-gray-500">
              <Calendar :size="16" class="mr-2" />
              <span>{{ formatDate(article.date) }}</span>
            </div>
            <button class="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 hover:scale-105 transition-all duration-300">
              <span>Lire plus</span>
              <ChevronRight :size="16" />
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/main'
import { Plus, Edit, Eye, Calendar, ChevronRight, Trash2 } from 'lucide-vue-next'

export default {
  name: 'Articles',
  components: {
    Plus,
    Edit,
    Eye,
    Calendar,
    ChevronRight,
    Trash2
  },
  setup() {
    const store = useMainStore()

    const darkMode = computed(() => store.darkMode)
    
    const showArticleForm = ref(false)
    const editingArticle = ref(null)
    const articleForm = ref({
      title: '',
      content: '',
      category: '',
      tags: ''
    })

    const articles = computed(() => store.articles)

    const openArticleForm = () => {
      showArticleForm.value = true
      editingArticle.value = null
      articleForm.value = { title: '', content: '', category: '', tags: '' }
    }

    const closeArticleForm = () => {
      showArticleForm.value = false
      editingArticle.value = null
      articleForm.value = { title: '', content: '', category: '', tags: '' }
    }

    const editArticle = (article) => {
      editingArticle.value = article
      articleForm.value = {
        title: article.title,
        content: article.content,
        category: article.category,
        tags: Array.isArray(article.tags) ? article.tags.join(', ') : article.tags
      }
      showArticleForm.value = true
    }

    const handleSubmit = () => {
      if (editingArticle.value) {
        store.updateArticle(editingArticle.value.id, articleForm.value)
      } else {
        store.addArticle(articleForm.value)
      }
      closeArticleForm()
    }

    const deleteArticle = (id) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        store.deleteArticle(id)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      articles,
      showArticleForm,
      editingArticle,
      articleForm,
      openArticleForm,
      closeArticleForm,
      editArticle,
      handleSubmit,
      deleteArticle,
      formatDate
    }
  }
}
</script>

<style scoped>
.form-input {
  @apply p-4 rounded-2xl border border-gray-300/20 bg-white/5 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>