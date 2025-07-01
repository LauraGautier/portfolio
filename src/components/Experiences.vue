<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Expérience Professionnelle
        </h2>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
        
        <div class="relative glass rounded-3xl p-12 border border-white/10 hover:border-white/20 transition-all duration-500 ml-20">
          <div class="absolute -left-6 top-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Briefcase :size="24" class="text-white" />
          </div>
          
          <div class="mb-4">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Développeuse Web Full Stack
            </h3>
            <p class="text-purple-600 font-semibold text-lg">
              Conservatoire d'Espaces Naturels de Lorraine
            </p>
            <div class="flex items-center text-gray-500 mt-2">
              <Calendar :size="16" class="mr-2" />
              <span>Octobre 2024 - Octobre 2025</span>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="flex items-start space-x-3 p-4 glass rounded-2xl border border-white/10"
            >
              <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span class="text-gray-700 dark:text-gray-300">{{ task }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Briefcase, Calendar } from 'lucide-vue-next'

export default {
  name: 'Experiences',
  components: {
    Briefcase,
    Calendar
  },
  setup() {
    const tasks = [
      "Conception et développement d'applications web accessibles",
      "Maintien et mise à jour des applications existantes",
      "Collaboration avec les équipes internes",
      "Veille technologique et innovations"
    ]

    return {
      tasks
    }
  }
}
</script>