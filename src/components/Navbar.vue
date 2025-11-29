<template>
  <nav class="glass-effect border-b border-neutral-700 sticky top-0 z-40">
    <div class="max-w-full px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="gradient-primary p-2 rounded-lg">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-white">CryptoTrade</h1>
          <p class="text-xs text-neutral-400">Платформа арбитража</p>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <div class="text-right">
          <p class="text-sm text-neutral-400">Баланс</p>
          <p class="text-lg font-bold text-accent">${{ walletStore.totalValue.toFixed(2) }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-neutral-400">Статус смены</p>
          <p :class="['font-bold', shiftsStore.currentShift ? 'text-success' : 'text-neutral-400']">
            {{ shiftsStore.currentShift ? 'Активна' : 'Не активна' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button 
          v-if="!shiftsStore.currentShift"
          @click="startShift"
          class="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-smooth font-medium text-sm"
        >
          Начать смену
        </button>
        <button 
          v-else
          @click="endShift"
          class="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition-smooth font-medium text-sm"
        >
          Завершить смену
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useWalletStore } from '../stores/wallet'
import { useShiftsStore } from '../stores/shifts'

const walletStore = useWalletStore()
const shiftsStore = useShiftsStore()

const startShift = () => {
  shiftsStore.startShift()
}

const endShift = () => {
  shiftsStore.endShift()
}
</script>
