import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '../stores/main'
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import Login from '../views/Login.vue'
import CreativeCV from '../views/CreativeCV.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil - Laura Gautier'
    }
  },
  {
    path: '/cv',
    name: 'CreativeCV',
    component: CreativeCV,
    meta: {
      title: 'CV - Laura Gautier'
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      title: 'Articles & Projets - Laura Gautier'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true, // Seuls les utilisateurs non connectés peuvent accéder
      title: 'Connexion - Laura Gautier'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Garde de navigation pour l'authentification et les métadonnées
router.beforeEach((to, from, next) => {
  const store = useMainStore()
  
  // Vérifier l'authentification au démarrage
  store.checkAuth()
  
  // Mettre à jour le titre de la page
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Si la route nécessite d'être invité (non connecté)
  if (to.meta.requiresGuest && store.isAuthenticated) {
    // Rediriger vers les articles si déjà connecté
    next('/articles')
    return
  }
  
  next()
})

// Garde après navigation pour les notifications
router.afterEach((to, from) => {
  const store = useMainStore()
  
  // Notification de bienvenue après connexion
  if (to.name === 'Articles' && from.name === 'Login' && store.isAuthenticated) {
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification(`Bienvenue ${store.user?.name} !`, 'success')
      }
    }, 500)
  }
  
  // Charger les articles depuis localStorage si on arrive sur la page articles
  if (to.name === 'Articles') {
    store.loadArticles()
  }
})

export default router