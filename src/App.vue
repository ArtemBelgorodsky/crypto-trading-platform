<template>
  <div class="min-h-screen bg-neutral-900">
    <Navbar v-if="authStore.isLoggedIn" />
    <div class="flex">
      <Sidebar v-if="authStore.isLoggedIn" />
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
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
</style>
