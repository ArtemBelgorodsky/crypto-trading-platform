<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Дашборд</h1>
      <p class="text-neutral-400">Обзор ваших торговых операций</p>
    </div>

    <!-- Shift Status Card -->
    <div class="mb-8">
      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-white mb-2">Статус текущей смены</h2>
            <p :class="['text-sm', shiftsStore.currentShift ? 'text-success' : 'text-neutral-400']">
              {{ shiftsStore.currentShift ? `Активна с ${shiftsStore.currentShift.startTime}` : 'Смена не начата' }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-neutral-400 mb-1">Прибыль/убыток</p>
            <p class="text-2xl font-bold gradient-accent text-transparent bg-clip-text">
              {{ shiftsStore.currentShift?.profitLoss || '0' }} $
            </p>
          </div>
        </div>

        <div v-if="shiftsStore.currentShift" class="grid grid-cols-3 gap-4">
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-sm text-neutral-400">Операций</p>
            <p class="text-2xl font-bold text-white">{{ shiftsStore.currentShift.operations }}</p>
          </div>
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-sm text-neutral-400">Сделок</p>
            <p class="text-2xl font-bold text-white">{{ shiftsStore.currentShift.dealsCount }}</p>
          </div>
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-sm text-neutral-400">Время</p>
            <p class="text-2xl font-bold text-white">{{ calculateShiftTime }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-neutral-400">Общий баланс</p>
          <Wallet class="w-5 h-5 text-accent" />
        </div>
        <p class="text-2xl font-bold text-white">${{ walletStore.totalValue.toFixed(2) }}</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-neutral-400">Активных сделок</p>
          <TrendingUp class="w-5 h-5 text-accent" />
        </div>
        <p class="text-2xl font-bold text-white">{{ activeDealsCount }}</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-neutral-400">Общая прибыль</p>
          <TrendingUp class="w-5 h-5 text-success" />
        </div>
        <p class="text-2xl font-bold text-success">+${{ totalProfit.toFixed(2) }}</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-neutral-400">Всего сделок</p>
          <BarChart3 class="w-5 h-5 text-accent" />
        </div>
        <p class="text-2xl font-bold text-white">{{ dealsStore.deals.length }}</p>
      </div>
    </div>

    <!-- Latest Deals -->
    <div class="glass-effect rounded-xl p-6 border border-neutral-700">
      <h3 class="text-xl font-bold text-white mb-6">Последние сделки</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-neutral-700">
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Пара</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Тип</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Объем</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Цена</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Прибыль</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-neutral-400">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="deal in dealsStore.deals.slice(0, 5)" :key="deal.id" class="border-b border-neutral-800 hover:bg-neutral-800 transition-smooth">
              <td class="py-4 px-4 font-bold text-white">{{ deal.pair }}</td>
              <td class="py-4 px-4">
                <span :class="['px-3 py-1 rounded-lg text-xs font-bold', deal.type === 'buy' ? 'bg-green-500/20 text-success' : 'bg-red-500/20 text-danger']">
                  {{ deal.type === 'buy' ? 'Покупка' : 'Продажа' }}
                </span>
              </td>
              <td class="py-4 px-4 text-neutral-300">{{ deal.amount }}</td>
              <td class="py-4 px-4 text-neutral-300">${{ deal.price }}</td>
              <td class="py-4 px-4">
                <span :class="deal.profit >= 0 ? 'text-success' : 'text-danger'" class="font-bold">
                  {{ deal.profit >= 0 ? '+' : '' }}${{ deal.profit }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span :class="['px-3 py-1 rounded-lg text-xs font-bold', deal.status === 'completed' ? 'bg-blue-500/20 text-accent' : 'bg-yellow-500/20 text-warning']">
                  {{ deal.status === 'completed' ? 'Завершена' : 'В ожидании' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWalletStore } from '../stores/wallet'
import { useDealsStore } from '../stores/deals'
import { useShiftsStore } from '../stores/shifts'
import { computed } from 'vue'
import { Wallet, TrendingUp, BarChart3 } from 'lucide-vue-next'

const walletStore = useWalletStore()
const dealsStore = useDealsStore()
const shiftsStore = useShiftsStore()

const activeDealsCount = computed(() => {
  return dealsStore.deals.filter(d => d.status === 'pending').length
})

const totalProfit = computed(() => {
  return dealsStore.deals.reduce((sum, deal) => sum + deal.profit, 0)
})

const calculateShiftTime = computed(() => {
  if (!shiftsStore.currentShift) return '0ч'
  
  const [startH, startM] = shiftsStore.currentShift.startTime.split(':').map(Number)
  const now = new Date()
  const currentH = now.getHours()
  const currentM = now.getMinutes()
  
  let hours = currentH - startH
  let minutes = currentM - startM
  
  if (minutes < 0) {
    hours--
    minutes += 60
  }
  
  return `${hours}ч ${minutes}м`
})
</script>
