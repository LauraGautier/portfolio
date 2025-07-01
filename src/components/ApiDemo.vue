<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choses diverses et variées
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Météo -->
        <div class="group glass rounded-3xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl mr-4">
              <Globe :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold">La météo par chez moi</h3>
          </div>
          
          <div v-if="weatherData" class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
              <span class="flex items-center">
                <MapPin :size="20" class="text-blue-500 mr-2" />
                Localisation
              </span>
              <span class="font-semibold">{{ weatherData.location }}</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20">
              <span class="flex items-center">
                <span class="text-2xl mr-2">🌡️</span>
                Température
              </span>
              <span class="font-semibold text-2xl">{{ weatherData.temperature }}°C</span>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-2xl border border-gray-500/20">
              <span class="flex items-center">
                <span class="text-2xl mr-2">☁️</span>
                Conditions
              </span>
              <span class="font-semibold">{{ weatherData.description }}</span>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 text-center">
                <Droplets :size="24" class="text-cyan-500 mx-auto mb-2" />
                <p class="text-sm text-gray-500">Humidité</p>
                <p class="font-semibold text-lg">{{ weatherData.humidity }}%</p>
              </div>
              
              <div class="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 text-center">
                <Wind :size="24" class="text-green-500 mx-auto mb-2" />
                <p class="text-sm text-gray-500">Vent</p>
                <p class="font-semibold text-lg">{{ weatherData.windSpeed }} km/h</p>
              </div>
            </div>
            
            <div class="text-center pt-4 border-t border-gray-200/20">
              <p class="text-sm text-gray-500">
                📡 Données fournies par Open-Meteo API
              </p>
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="i in 4"
              :key="i"
              class="h-16 bg-gradient-to-r from-gray-200/20 to-gray-300/20 rounded-2xl animate-pulse"
            ></div>
          </div>
        </div>

        <!-- Régions/Départements -->
        <div class="group glass rounded-3xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:scale-105">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl mr-4">
              <MapPin :size="32" class="text-white" />
            </div>
            <h3 class="text-2xl font-bold">Un peu de géographie</h3>
          </div>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-3 text-gray-600 dark:text-gray-300">
                Sélectionner une région
              </label>
              <select 
                :value="selectedRegion" 
                @change="handleRegionChange"
                class="w-full p-4 rounded-2xl border border-gray-300/20 glass focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
              >
                <option value="">Choisir une région...</option>
                <option
                  v-for="region in regions"
                  :key="region.code"
                  :value="region.code"
                  class="bg-gray-800 text-white"
                >
                  {{ region.nom }}
                </option>
              </select>
            </div>
            
            <div v-if="departements.length > 0" class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 max-h-80 overflow-y-auto">
              <h4 class="font-semibold mb-4 text-green-600 dark:text-green-400 flex items-center">
                <Award :size="20" class="mr-2" />
                Départements ({{ departements.length }})
              </h4>
              <div class="grid grid-cols-1 gap-2">
                <div
                  v-for="dept in departements"
                  :key="dept.code"
                  class="flex items-center justify-between p-3 glass rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-102"
                >
                  <span class="font-medium">{{ dept.nom }}</span>
                  <span class="text-sm text-gray-500 bg-green-500/20 px-2 py-1 rounded-full">{{ dept.code }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useMainStore } from '../stores/main'
import { Globe, MapPin, Droplets, Wind, Award } from 'lucide-vue-next'

export default {
  name: 'ApiDemo',
  components: {
    Globe,
    MapPin,
    Droplets,
    Wind,
    Award
  },
  setup() {
    const store = useMainStore()

    const weatherData = computed(() => store.weatherData)
    const regions = computed(() => store.regions)
    const departements = computed(() => store.departements)
    const selectedRegion = computed(() => store.selectedRegion)

    const handleRegionChange = (event) => {
      store.setSelectedRegion(event.target.value)
    }

    return {
      weatherData,
      regions,
      departements,
      selectedRegion,
      handleRegionChange
    }
  }
}
</script>