<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div
      v-for="i in 50"
      :key="i"
      class="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
      :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'FloatingParticles'
}
</script>