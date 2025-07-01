<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Formation & Certifications
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div
          v-for="(formation, index) in formations"
          :key="index"
          class="group relative glass rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
        >
          <div 
            :class="[
              'absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-5',
              `bg-gradient-to-r ${formation.gradient}`
            ]"
          ></div>
          
          <div 
            :class="[
              'inline-flex p-4 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300',
              `bg-gradient-to-r ${formation.gradient}`
            ]"
          >
            <component :is="formation.icon" :size="32" />
          </div>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {{ formation.title }}
              </h3>
              <p :class="[
                'font-semibold bg-clip-text text-transparent',
                `bg-gradient-to-r ${formation.gradient}`
              ]">
                {{ formation.school }}
              </p>
            </div>
            
            <div class="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar :size="16" class="mr-2" />
              <span>{{ formation.period }}</span>
            </div>
            
            <div class="flex justify-end">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                formation.status === 'En cours' 
                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              ]">
                {{ formation.status === 'En cours' ? '🔄' : '✅' }} {{ formation.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { GraduationCap, Award, Calendar } from 'lucide-vue-next'

export default {
  name: 'Formations',
  components: {
    GraduationCap,
    Award,
    Calendar
  },
  setup() {
    const formations = [
      {
        title: "Bachelor Développeur Web Full Stack",
        school: "Metz Numeric School, Metz",
        period: "Octobre 2024 - Octobre 2025",
        status: "En cours",
        gradient: "from-purple-500 to-indigo-600",
        icon: 'GraduationCap'
      },
      {
        title: "Titre Professionnel Développeur Web & Web Mobile",
        school: "O'Clock, Paris",
        period: "Octobre 2023 - Juillet 2024",
        status: "Obtenu",
        gradient: "from-blue-500 to-cyan-600",
        icon: 'Award'
      }
    ]

    return {
      formations
    }
  }
}
</script>