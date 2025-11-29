<template>
  <div class="min-h-screen bg-neutral-900">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style scoped>
</style>
