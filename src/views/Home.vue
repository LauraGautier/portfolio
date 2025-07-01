<template>
  <main>
    <HeroSection />
    <Competences />
    <Experiences />
    <Formations />
    <ApiDemo />
  </main>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import Competences from '../components/Competences.vue'
import Experiences from '../components/Experiences.vue'
import Formations from '../components/Formations.vue'
import ApiDemo from '../components/ApiDemo.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    Competences,
    Experiences,
    Formations,
    ApiDemo
  }
}
</script>