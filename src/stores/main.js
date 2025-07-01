import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    darkMode: false,
    articles: [
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
    },

    addArticle(article) {
      const newArticle = {
        id: Date.now(),
        ...article,
        date: new Date().toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100),
        tags: typeof article.tags === 'string' 
          ? article.tags.split(',').map(tag => tag.trim())
          : article.tags
      }
      this.articles.unshift(newArticle)
    },

    updateArticle(id, updatedArticle) {
      const index = this.articles.findIndex(article => article.id === id)
      if (index !== -1) {
        this.articles[index] = {
          ...this.articles[index],
          ...updatedArticle,
          tags: typeof updatedArticle.tags === 'string' 
            ? updatedArticle.tags.split(',').map(tag => tag.trim())
            : updatedArticle.tags
        }
      }
    },

    deleteArticle(id) {
      this.articles = this.articles.filter(article => article.id !== id)
    },

    async fetchWeatherData() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=48.9606&longitude=2.5102&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=Europe%2FParis'
        )
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
          humidity: '--'
        }
      }
    },

    async fetchRegions() {
      try {
        const response = await fetch('https://geo.api.gouv.fr/regions')
        this.regions = await response.json()
      } catch (error) {
        console.error('Erreur API régions:', error)
      }
    },

    async fetchDepartements(regionCode) {
      try {
        const response = await fetch(`https://geo.api.gouv.fr/regions/${regionCode}/departements`)
        this.departements = await response.json()
      } catch (error) {
        console.error('Erreur API départements:', error)
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
    }
  },

  getters: {
    themeClasses: (state) => {
      return state.darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    }
  }
})