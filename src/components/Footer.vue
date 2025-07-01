<template>
  <footer class="relative mt-20 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="relative z-10 container mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              LG
            </div>
            <h3 class="text-xl font-bold">Laura Gautier</h3>
          </div>
          <p class="text-gray-300 mb-4">
            Développeuse Full Stack passionnée, créatrice d'expériences web modernes et performantes.
          </p>
            <div class="flex space-x-4">
            <a 
                href="https://linkedin.com/in/lcgautier" 
                target="_blank" 
                rel="noopener noreferrer"
                class="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-110"
            >
                <Linkedin :size="20" />
            </a>
            <a 
                href="https://github.com/LauraGautier" 
                target="_blank" 
                rel="noopener noreferrer"
                class="p-3 bg-gray-700 hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
            >
                <Github :size="20" />
            </a>
            </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Technologies</h4>
          <ul class="space-y-2 text-gray-300">
            <li>JavaScript & PHP</li>
            <li>Vue.js & React</li>
            <li>Laravel & Node.js</li>
            <li>MySQL & PostgreSQL</li>
          </ul>
        </div>
        
        <div class="flex flex-wrap justify-center gap-6 mb-12">
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Phone :size="20" class="text-purple-500" />
            <a href="tel:+33622992575" class="hover:text-purple-300 transition-colors">
            06.00.00.00.00
            </a>
        </div>
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Mail :size="20" class="text-blue-500" />
            <a href="mailto:lc.gautier@icloud.com" class="hover:text-blue-300 transition-colors">
            lc.gautier@icloud.com
            </a>
        </div>
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <MapPin :size="20" class="text-green-500" />
            <span>Tremblay-en-France</span>
        </div>
        </div>
      </div>
      
      <div class="border-t border-gray-700 pt-8 text-center">
        <p class="text-gray-400 mb-2">
          © 2025 Laura Gautier
        </p>
        <p class="text-sm text-gray-500">
          Portfolio réalisé avec Vue.js, Vue Router, Pinia et amour du code ❤️
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    Linkedin,
    Github,
    Mail,
    Phone,
    MapPin
  }
}
</script>