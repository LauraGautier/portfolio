<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Compétences Techniques
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-100">
          Technologies que je maîtrise actuellement.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.title"
          class="group relative glass rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div 
            :class="[
              'absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-10',
              `bg-gradient-to-r ${category.gradient}`
            ]"
          ></div>
          
          <div 
            :class="[
              'inline-flex p-4 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300',
              `bg-gradient-to-r ${category.gradient}`
            ]"
          >
            <component :is="category.icon" :size="32" />
          </div>
          
          <h3 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            {{ category.title }}
          </h3>
          
          <div class="space-y-3">
            <div
              v-for="(skill, skillIndex) in category.skills"
              :key="skill"
              class="flex items-center group-hover:translate-x-2 transition-transform duration-300"
              :style="{ transitionDelay: `${skillIndex * 100}ms` }"
            >
              <ChevronRight 
                :size="16" 
                :class="[
                  'mr-3 text-transparent bg-clip-text',
                  `bg-gradient-to-r ${category.gradient}`
                ]"
              />
              <span class="text-gray-700 dark:text-gray-100 font-medium">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ChevronRight, Code, Star, Globe } from 'lucide-vue-next'

export default {
  name: 'Competences',
  components: {
    ChevronRight,
    Code,
    Star,
    Globe
  },
  setup() {
    const skillCategories = [
      {
        title: "Langages",
        icon: 'Code',
        skills: ["JavaScript", "PHP", "HTML5", "CSS3"],
        gradient: "from-yellow-400 to-orange-500"
      },
      {
        title: "Frameworks",
        icon: 'Star',
        skills: ["Vue.js", "React", "Laravel", "Node.js", "Symfony"],
        gradient: "from-green-400 to-blue-500"
      },
      {
        title: "Outils & Tech",
        icon: 'Globe',
        skills: ["Git", "Docker", "Bootstrap", "MySQL", "PostgreSQL"],
        gradient: "from-purple-400 to-pink-500"
      }
    ]

    return {
      skillCategories
    }
  }
}
</script>