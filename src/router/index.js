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
      requiresGuest: true,
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

router.beforeEach((to, from, next) => {
  const store = useMainStore()
  
  store.checkAuth()
  
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  if (to.meta.requiresGuest && store.isAuthenticated) {
    next('/articles')
    return
  }
  
  next()
})

router.afterEach((to, from) => {
  const store = useMainStore()
  
  if (to.name === 'Articles' && from.name === 'Login' && store.isAuthenticated) {
    setTimeout(() => {
      if (window.showNotification) {
        window.showNotification(`Bienvenue ${store.user?.name} !`, 'success')
      }
    }, 500)
  }
  
  if (to.name === 'Articles') {
    store.loadArticles()
  }
})

export default router