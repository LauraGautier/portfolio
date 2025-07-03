<template>
  <div class="min-h-screen pt-24 pb-20">
    <div class="container mx-auto px-6">
      <!-- Header avec actions -->
      <div class="text-center mb-12">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 bg-clip-text text-transparent">
          CV à Exporter
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Exportez mon parcours 📊
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <button
            @click="exportToPDF"
            class="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
          >
            <Download :size="18" />
            <span>Export PDF</span>
          </button>
          
          <button
            @click="shareCV"
            class="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
          >
            <Share :size="18" />
            <span>Partager</span>
          </button>
          
          <button
            @click="toggleView"
            class="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
          >
            <component :is="viewMode === 'interactive' ? 'FileText' : 'MousePointer'" :size="18" />
            <span>{{ viewMode === 'interactive' ? 'Vue classique' : 'Vue interactive' }}</span>
          </button>
        </div>
      </div>

      <!-- CV Content -->
      <div class="max-w-6xl mx-auto">
        <!-- Profile Section -->
        <div class="glass rounded-3xl p-8 mb-8 border border-white/10">
          <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div class="relative group">
              <div class="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 p-1">
                <div class="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  LG
                </div>
              </div>
              <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center animate-pulse">
                <span class="text-white font-bold text-lg">✓</span>
              </div>
            </div>
            
            <div class="flex-1 text-center lg:text-left">
              <h2 class="text-4xl font-bold mb-2">Laura Gautier</h2>
              <h3 class="text-2xl text-purple-600 dark:text-purple-400 mb-4">Développeuse Full Stack</h3>
              
              <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="flex items-center justify-center lg:justify-start space-x-2">
                  <Mail :size="18" class="text-blue-500" />
                  <span>lc.gautier@icloud.com</span>
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-2">
                  <Phone :size="18" class="text-green-500" />
                  <span>06.22.99.25.75</span>
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-2">
                  <MapPin :size="18" class="text-red-500" />
                  <span>Tremblay-en-France (93)</span>
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-2">
                  <Calendar :size="18" class="text-purple-500" />
                  <span>{{ yearsOfExperience }} ans d'expérience</span>
                </div>
              </div>
              
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Passionnée par le développement web moderne, je crée des applications innovantes 
                en combinant expertise technique et créativité. Spécialisée en JavaScript, PHP, 
                et frameworks modernes comme Vue.js et Laravel.
              </p>
            </div>
          </div>
        </div>

        <!-- Skills Section with Interactive Charts -->
        <div class="glass rounded-3xl p-8 mb-8 border border-white/10">
          <h3 class="text-3xl font-bold mb-8 text-center">Compétences Techniques</h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="space-y-4"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <component :is="skill.icon" :size="24" :class="skill.color" />
                  <span class="font-semibold">{{ skill.name }}</span>
                </div>
                <span class="text-sm text-gray-500">{{ skill.level }}%</span>
              </div>
              
              <div class="relative">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    :class="skill.gradient"
                    :style="{ width: (viewMode === 'interactive' ? skill.level : 0) + '%' }"
                  ></div>
                </div>
                <div 
                  class="absolute top-0 left-0 h-full bg-white/30 rounded-full animate-pulse"
                  :style="{ width: '3px', left: (viewMode === 'interactive' ? skill.level : 0) + '%' }"
                ></div>
              </div>
              
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in skill.tags"
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-lg"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="glass rounded-3xl p-8 mb-8 border border-white/10">
          <h3 class="text-3xl font-bold mb-8 text-center">Expérience Professionnelle</h3>
          
          <div class="relative">
            <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
            
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              class="relative flex items-start mb-12 last:mb-0"
            >
              <div class="absolute left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {{ index + 1 }}
              </div>
              
              <div class="ml-20 group">
                <div class="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                  <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h4 class="text-xl font-bold text-purple-600 dark:text-purple-400">{{ exp.title }}</h4>
                      <h5 class="text-lg font-semibold mb-2">{{ exp.company }}</h5>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <div class="flex items-center space-x-1">
                        <Calendar :size="14" />
                        <span>{{ exp.period }}</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <MapPin :size="14" />
                        <span>{{ exp.location }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ exp.description }}</p>
                  
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 class="font-semibold mb-2 text-green-600">Réalisations :</h6>
                      <ul class="space-y-1">
                        <li v-for="achievement in exp.achievements" :key="achievement" class="flex items-start space-x-2">
                          <CheckCircle :size="14" class="text-green-500 mt-1 flex-shrink-0" />
                          <span class="text-sm">{{ achievement }}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 class="font-semibold mb-2 text-blue-600">Technologies :</h6>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tech in exp.technologies"
                          :key="tech"
                          class="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="glass rounded-3xl p-8 mb-8 border border-white/10">
          <h3 class="text-3xl font-bold mb-8 text-center">Formation</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="edu in education"
              :key="edu.title"
              class="group"
            >
              <div class="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 h-full">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    <GraduationCap :size="24" />
                  </div>
                  
                  <div class="flex-1">
                    <h4 class="text-xl font-bold mb-2">{{ edu.title }}</h4>
                    <h5 class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">{{ edu.school }}</h5>
                    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div class="flex items-center space-x-1">
                        <Calendar :size="14" />
                        <span>{{ edu.period }}</span>
                      </div>
                      <span :class="edu.status === 'En cours' ? 'text-orange-500' : 'text-green-500'" class="font-medium">
                        {{ edu.status }}
                      </span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300">{{ edu.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="glass rounded-3xl p-8 border border-white/10">
          <h3 class="text-3xl font-bold mb-8 text-center">Statistiques</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center group"
            >
              <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                {{ viewMode === 'interactive' ? animatedStats[stat.label] : stat.value }}
              </div>
              <h4 class="font-bold text-lg text-gray-800 dark:text-white">{{ stat.label }}</h4>
              <p class="text-sm text-gray-500">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue'
import { 
  Download, 
  Share, 
  MousePointer, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Code,
  Palette,
  Database,
  Server,
  Smartphone,
  Globe,
  CheckCircle,
  GraduationCap
} from 'lucide-vue-next'

export default {
  name: 'CreativeCV',
  components: {
    Download, Share, MousePointer, FileText, Mail, Phone, MapPin, Calendar,
    Code, Palette, Database, Server, Smartphone, Globe, CheckCircle, GraduationCap
  },
  setup() {
    const viewMode = ref('interactive')
    const animatedStats = reactive({})

    const yearsOfExperience = computed(() => {
      const startDate = new Date('2023-10-01')
      const now = new Date()
      return Math.floor((now - startDate) / (1000 * 60 * 60 * 24 * 365))
    })

    const skills = [
      {
        name: 'JavaScript',
        level: 90,
        icon: 'Code',
        color: 'text-yellow-500',
        gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        tags: ['ES6+', 'Async/Await', 'DOM']
      },
      {
        name: 'Vue.js',
        level: 85,
        icon: 'Code',
        color: 'text-green-500',
        gradient: 'bg-gradient-to-r from-green-400 to-emerald-500',
        tags: ['Vue 3', 'Composition API', 'Pinia']
      },
      {
        name: 'PHP',
        level: 80,
        icon: 'Server',
        color: 'text-purple-500',
        gradient: 'bg-gradient-to-r from-purple-400 to-indigo-500',
        tags: ['Laravel', 'POO', 'API']
      },
      {
        name: 'CSS/Sass',
        level: 88,
        icon: 'Palette',
        color: 'text-blue-500',
        gradient: 'bg-gradient-to-r from-blue-400 to-cyan-500',
        tags: ['Flexbox', 'Grid', 'Animations']
      },
      {
        name: 'Bases de données',
        level: 75,
        icon: 'Database',
        color: 'text-red-500',
        gradient: 'bg-gradient-to-r from-red-400 to-pink-500',
        tags: ['MySQL', 'PostgreSQL', 'Requêtes']
      },
      {
        name: 'Mobile',
        level: 70,
        icon: 'Smartphone',
        color: 'text-indigo-500',
        gradient: 'bg-gradient-to-r from-indigo-400 to-purple-500',
        tags: ['Responsive', 'PWA', 'Mobile-first']
      }
    ]

    const experiences = [
      {
        title: 'Développeuse Web Full Stack',
        company: 'Conservatoire d\'Espaces Naturels de Lorraine',
        period: 'Oct 2024 - Oct 2025',
        location: 'Metz, France',
        description: 'Développement et maintenance d\'applications web pour la gestion des espaces naturels.',
        achievements: [
          'Développement du requêteur de taxons (600k+ données)',
          'Refonte de la plateforme EEE Grand-Est',
          'Optimisation des performances de 40%',
          'Formation de l\'équipe aux nouvelles technologies'
        ],
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'Git', 'Docker']
      }
    ]

    const education = [
      {
        title: 'Bachelor Développeur Web Full Stack',
        school: 'Metz Numeric School',
        period: 'Oct 2024 - Oct 2025',
        status: 'En cours',
        description: 'Formation complète en développement web avec spécialisation Full Stack'
      },
      {
        title: 'Titre Professionnel Développeur Web & Web Mobile',
        school: 'O\'Clock, Paris',
        period: 'Oct 2023 - Juil 2024',
        status: 'Obtenu',
        description: 'Formation intensive en développement web moderne et technologies actuelles'
      }
    ]

    const stats = [
      {
        label: 'Projets',
        value: 15,
        description: 'Projets réalisés'
      },
      {
        label: 'Clients',
        value: 3,
        description: 'Clients satisfaits'
      },
      {
        label: 'Technos',
        value: 12,
        description: 'Technologies maîtrisées'
      },
      {
        label: 'Café',
        value: 999,
        description: 'Tasses consommées ☕'
      }
    ]

    const toggleView = () => {
      viewMode.value = viewMode.value === 'interactive' ? 'classic' : 'interactive'
      
      if (viewMode.value === 'interactive') {
        animateStats()
      }
    }

    const animateStats = () => {
      stats.forEach(stat => {
        let current = 0
        const target = stat.value
        const increment = target / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            animatedStats[stat.label] = target
            clearInterval(timer)
          } else {
            animatedStats[stat.label] = Math.floor(current)
          }
        }, 50)
      })
    }

    const exportToPDF = () => {
      if (window.showNotification) {
        window.showNotification('Export PDF en cours... 📄', 'info')
        setTimeout(() => {
          window.showNotification('CV exporté avec succès!', 'success')
        }, 2000)
      }
    }

    const shareCV = async () => {
      const url = window.location.href
      try {
        await navigator.clipboard.writeText(url)
        if (window.showNotification) {
          window.showNotification('Lien copié dans le presse-papier!', 'success')
        }
      } catch (err) {
        if (window.showNotification) {
          window.showNotification('Erreur lors de la copie', 'error')
        }
      }
    }

    onMounted(() => {
      // Initialiser les stats
      stats.forEach(stat => {
        animatedStats[stat.label] = 0
      })
      
      // Animer automatiquement après un délai
      setTimeout(() => {
        animateStats()
      }, 1000)
    })

    return {
      viewMode,
      yearsOfExperience,
      skills,
      experiences,
      education,
      stats,
      animatedStats,
      toggleView,
      exportToPDF,
      shareCV
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