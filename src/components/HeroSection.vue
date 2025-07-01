<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
    
    <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
      <div class="mb-8">
        <div class="relative inline-block">
          <div class="w-40 h-40 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-4xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-500 animate-pulse">
            LG
          </div>
          <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-green-400 rounded-full border-4 border-white flex items-center justify-center animate-bounce">
            <span class="text-white font-bold">✓</span>
          </div>
        </div>
      </div>

      <h1 class="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
        Laura Gautier
      </h1>
      
      <div class="text-2xl md:text-3xl font-light mb-8 text-gray-600 dark:text-gray-300">
        <span class="inline-block animate-typewriter">Développeuse Full Stack</span>
        <span class="ml-2 text-purple-500 animate-blink">|</span>
      </div>

      <p class="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Spécialisée en <span class="text-purple-600 font-semibold">JavaScript</span> et 
        <span class="text-blue-600 font-semibold">PHP</span>, je crée des applications web 
        modernes et performantes qui transforment les idées en réalité digitale.
      </p>

      <div class="flex flex-wrap justify-center gap-6 mb-12">
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <Phone :size="20" class="text-purple-500" />
          <span>06.00.00.00.00</span>
        </div>
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <Mail :size="20" class="text-blue-500" />
          <span>lc.gautier@icloud.com</span>
        </div>
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <MapPin :size="20" class="text-green-500" />
          <span>Tremblay-en-France</span>
        </div>
      </div>

      <div class="flex justify-center space-x-6">
        <a 
          href="https://linkedin.com/in/lcgautier" 
          target="_blank" 
          rel="noopener noreferrer"
          class="group bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <Linkedin :size="20" />
          <span>LinkedIn</span>
          <ExternalLink :size="16" class="group-hover:translate-x-1 transition-transform" />
        </a>
        
        <a 
          href="https://github.com/LauraGautier" 
          target="_blank" 
          rel="noopener noreferrer"
          class="group bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-gray-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <Github :size="20" />
          <span>GitHub</span>
          <ExternalLink :size="16" class="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { Phone, Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-vue-next'

export default {
  name: 'HeroSection',
  components: {
    Phone,
    Mail,
    MapPin,
    Linkedin,
    Github,
    ExternalLink
  }
  // Retiré tout le JavaScript du parallax
}
</script>