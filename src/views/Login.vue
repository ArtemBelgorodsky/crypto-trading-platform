<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
    <div class="glass-effect rounded-xl p-8 border border-neutral-700 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Вход для трейдера</h1>
        <p class="text-neutral-400">Войдите в свою учетную запись</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-neutral-300 mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
            placeholder="trader@crypto.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-neutral-300 mb-2">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
            placeholder="securepass123"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-accent hover:bg-accent/80 text-white font-bold py-3 px-4 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          Войти
        </button>
      </form>

      <div class="mt-8 p-4 bg-neutral-800 rounded-lg border border-neutral-600">
        <h3 class="text-sm font-semibold text-neutral-300 mb-2">Данные для входа:</h3>
        <p class="text-xs text-neutral-400">Логин: trader@crypto.com</p>
        <p class="text-xs text-neutral-400">Пароль: securepass123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = () => {
  // Простая проверка для демонстрации
  if (form.email === 'trader@crypto.com' && form.password === 'securepass123') {
    // В реальном приложении здесь была бы аутентификация
    authStore.login()
    router.push('/')
  } else {
    alert('Неверные данные для входа')
  }
}
</script>