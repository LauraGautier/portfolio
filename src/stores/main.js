import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    darkMode: false,
    user: null,
    isAuthenticated: false,
    
    articles: [
      {
        id: 1,
        title: "Développement d'un Requêteur de Taxons",
        content: "Application web développée en PHP Laravel et Vue.js pour trier et extraire des espèces animales parmi plus de 600k données. Ce projet m'a permis de travailler avec de gros volumes de données et d'optimiser les requêtes pour offrir une expérience utilisateur fluide.",
        date: "2024-10-15",
        category: "Projet professionnel",
        tags: ["Laravel", "Vue.js", "Base de données", "API"],
        views: 127
      },
      {
        id: 2,
        title: "Refonte Plateforme EEE Grand-Est",
        content: "Refonte complète du design et du front-end en collaboration avec une graphiste rennaise. Modernisation de l'interface utilisateur avec Vue.js et implémentation d'un design system cohérent.",
        date: "2024-09-20",
        category: "Design & Développement",
        tags: ["UI/UX", "Frontend", "Collaboration", "Vue.js"],
        views: 89
      },
      {
        id: 3,
        title: "Portfolio Personnel avec Vue.js",
        content: "Création de mon portfolio personnel utilisant Vue.js 3, Pinia pour la gestion d'état, et Tailwind CSS pour le design. Intégration d'APIs externes pour la météo et les données géographiques.",
        date: "2024-11-01",
        category: "Projet personnel",
        tags: ["Vue.js", "Pinia", "Tailwind CSS", "Portfolio"],
        views: 56
      }
    ],
    
    weatherData: null,
    regions: [],
    departements: [],
    selectedRegion: '',
    isLoading: true
  }),

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
    },

    login(userData) {
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    checkAuth() {
      const savedUser = localStorage.getItem('user')
      const savedAuth = localStorage.getItem('isAuthenticated')
      const savedDarkMode = localStorage.getItem('darkMode')
      
      if (savedUser && savedAuth === 'true') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
      
      if (savedDarkMode !== null) {
        this.darkMode = JSON.parse(savedDarkMode)
      }
    },

    addArticle(article) {
      if (!this.isAuthenticated) {
        throw new Error('Vous devez être connecté pour ajouter un article')
      }

      const newArticle = {
        id: Date.now(),
        ...article,
        date: new Date().toISOString().split('T')[0],
        views: Math.floor(Math.random() * 50) + 1,
        tags: typeof article.tags === 'string' 
          ? article.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          : article.tags
      }
      this.articles.unshift(newArticle)
      
      this.saveArticles()
    },

    updateArticle(id, updatedArticle) {
      if (!this.isAuthenticated) {
        throw new Error('Vous devez être connecté pour modifier un article')
      }

      const index = this.articles.findIndex(article => article.id === id)
      if (index !== -1) {
        this.articles[index] = {
          ...this.articles[index],
          ...updatedArticle,
          tags: typeof updatedArticle.tags === 'string' 
            ? updatedArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : updatedArticle.tags
        }
        
        this.saveArticles()
      }
    },

    deleteArticle(id) {
      if (!this.isAuthenticated) {
        throw new Error('Vous devez être connecté pour supprimer un article')
      }

      this.articles = this.articles.filter(article => article.id !== id)
      
      this.saveArticles()
    },

    saveArticles() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },

    loadArticles() {
      const savedArticles = localStorage.getItem('articles')
      if (savedArticles) {
        this.articles = JSON.parse(savedArticles)
      }
    },

    incrementViews(articleId) {
      const article = this.articles.find(a => a.id === articleId)
      if (article) {
        article.views += 1
        this.saveArticles()
      }
    },

    async fetchWeatherData() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=48.9606&longitude=2.5102&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=Europe%2FParis'
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        this.weatherData = {
          location: "Tremblay-en-France",
          temperature: Math.round(data.current_weather.temperature),
          description: this.getWeatherDescription(data.current_weather.weathercode),
          humidity: data.hourly.relative_humidity_2m[0] || 'N/A',
          windSpeed: data.current_weather.windspeed
        }
      } catch (error) {
        console.error('Erreur météo:', error)
        this.weatherData = {
          location: "Tremblay-en-France",
          temperature: '--',
          description: "Données indisponibles",
          humidity: '--',
          windSpeed: '--'
        }
      }
    },

    async fetchRegions() {
      try {
        const response = await fetch('https://geo.api.gouv.fr/regions')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        this.regions = await response.json()
      } catch (error) {
        console.error('Erreur API régions:', error)
        this.regions = []
      }
    },

    async fetchDepartements(regionCode) {
      try {
        const response = await fetch(`https://geo.api.gouv.fr/regions/${regionCode}/departements`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        this.departements = await response.json()
      } catch (error) {
        console.error('Erreur API départements:', error)
        this.departements = []
      }
    },

    setSelectedRegion(regionCode) {
      this.selectedRegion = regionCode
      if (regionCode) {
        this.fetchDepartements(regionCode)
      } else {
        this.departements = []
      }
    },

    getWeatherDescription(code) {
      const weatherCodes = {
        0: 'Ciel dégagé',
        1: 'Principalement dégagé',
        2: 'Partiellement nuageux',
        3: 'Couvert',
        45: 'Brouillard',
        48: 'Brouillard givrant',
        51: 'Bruine légère',
        53: 'Bruine modérée',
        55: 'Bruine dense',
        61: 'Pluie légère',
        63: 'Pluie modérée',
        65: 'Pluie forte',
        71: 'Neige légère',
        73: 'Neige modérée',
        75: 'Neige forte',
        95: 'Orage'
      }
      return weatherCodes[code] || 'Conditions inconnues'
    },

    setLoading(status) {
      this.isLoading = status
    },

    resetAllData() {
      localStorage.clear()
      this.user = null
      this.isAuthenticated = false
      this.darkMode = false
      this.articles = [
        {
          id: 1,
          title: "Développement d'un Requêteur de Taxons",
          content: "Application web développée en PHP Laravel et Vue.js pour trier et extraire des espèces animales parmi plus de 600k données.",
          date: "2024-10-15",
          category: "Projet professionnel",
          tags: ["Laravel", "Vue.js", "Base de données", "API"],
          views: 127
        },
        {
          id: 2,
          title: "Refonte Plateforme EEE Grand-Est",
          content: "Refonte complète du design et du front-end en collaboration avec une graphiste rennaise.",
          date: "2024-09-20",
          category: "Design & Développement",
          tags: ["UI/UX", "Frontend", "Collaboration"],
          views: 89
        }
      ]
    }
  },

  getters: {
    themeClasses: (state) => {
      return state.darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    },

    canManageArticles: (state) => {
      return state.isAuthenticated && state.user?.role === 'admin'
    },

    sortedArticles: (state) => {
      return [...state.articles].sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    categories: (state) => {
      const cats = state.articles.map(article => article.category)
      return [...new Set(cats)]
    },

    allTags: (state) => {
      const tags = state.articles.flatMap(article => article.tags || [])
      return [...new Set(tags)]
    }
  }
})