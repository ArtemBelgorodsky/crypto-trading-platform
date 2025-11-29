<template>
  <aside class="w-64 glass-effect border-r border-neutral-700 h-screen sticky top-0 overflow-y-auto">
    <div class="p-6">
      <div class="mb-8">
        <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-4">Главное</h2>
        <nav class="space-y-2">
          <RouterLink 
            v-for="item in mainMenu"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-smooth"
            :class="{ 'bg-primary text-white': isActive(item.path) }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <div class="mb-8">
        <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-4">Операции</h2>
        <nav class="space-y-2">
          <RouterLink 
            v-for="item in operationsMenu"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-smooth"
            :class="{ 'bg-primary text-white': isActive(item.path) }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <div class="mb-8">
        <h2 class="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-4">Отчеты</h2>
        <nav class="space-y-2">
          <RouterLink
            v-for="item in reportsMenu"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-smooth"
            :class="{ 'bg-primary text-white': isActive(item.path) }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <div class="border-t border-neutral-700 pt-4">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-red-600 hover:text-white transition-smooth w-full text-left"
        >
          <LogOut class="w-5 h-5" />
          <span class="text-sm font-medium">Выход</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import {
  Home,
  Wallet,
  TrendingUp,
  ArrowRightLeft,
  BarChart3,
  History,
  Clock,
  LogOut,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mainMenu = [
  { path: '/', label: 'Дашборд', icon: Home },
]

const operationsMenu = [
  { path: '/wallet', label: 'Кошелек', icon: Wallet },
  { path: '/deals', label: 'Сделки', icon: TrendingUp },
  { path: '/shifts', label: 'Смены', icon: Clock },
]

const reportsMenu = [
  { path: '/analytics', label: 'Аналитика', icon: BarChart3 },
  { path: '/history', label: 'История', icon: History },
]

const isActive = (path) => route.path === path

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
