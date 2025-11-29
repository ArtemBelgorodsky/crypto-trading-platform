<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Аналитика</h1>
      <p class="text-neutral-400">Анализ вашей торговой активности</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <p class="text-sm text-neutral-400 mb-2">Общая прибыль</p>
        <p class="text-3xl font-bold text-success">+${{ totalProfit.toFixed(2) }}</p>
        <p class="text-xs text-neutral-400 mt-2">за все время</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <p class="text-sm text-neutral-400 mb-2">Процент успеха</p>
        <p class="text-3xl font-bold text-accent">{{ successRate }}%</p>
        <p class="text-xs text-neutral-400 mt-2">прибыльных сделок</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <p class="text-sm text-neutral-400 mb-2">Среднее значение</p>
        <p class="text-3xl font-bold text-white">${{ averageProfit.toFixed(2) }}</p>
        <p class="text-xs text-neutral-400 mt-2">за сделку</p>
      </div>

      <div class="glass-effect rounded-xl p-6 border border-neutral-700">
        <p class="text-sm text-neutral-400 mb-2">Лучшая пара</p>
        <p class="text-3xl font-bold text-accent">{{ bestPair }}</p>
        <p class="text-xs text-neutral-400 mt-2">по прибыльности</p>
      </div>
    </div>

    <!-- Deals Distribution -->
    <div class="glass-effect rounded-xl p-6 border border-neutral-700 mb-8">
      <h3 class="text-xl font-bold text-white mb-6">Распределение сделок по парам</h3>
      <div class="space-y-4">
        <div v-for="(pair, index) in pairStats" :key="index">
          <div class="flex items-center justify-between mb-2">
            <p class="font-bold text-white">{{ pair.name }}</p>
            <p class="text-sm text-neutral-400">{{ pair.count }} сделок</p>
          </div>
          <div class="w-full bg-neutral-800 rounded-lg h-2">
            <div :style="{ width: pair.percentage + '%' }" class="gradient-primary h-2 rounded-lg transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Shifts Performance -->
    <div class="glass-effect rounded-xl p-6 border border-neutral-700">
      <h3 class="text-xl font-bold text-white mb-6">Производительность смен</h3>
      <div class="space-y-4">
        <div v-for="shift in shiftsStore.shifts.slice(0, 5)" :key="shift.id" class="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
          <div>
            <p class="font-bold text-white">{{ formatDateOnly(shift.date) }}</p>
            <p class="text-sm text-neutral-400">{{ shift.startTime }} - {{ shift.endTime }}</p>
          </div>
          <div class="text-right">
            <p :class="['font-bold text-lg', shift.profitLoss >= 0 ? 'text-success' : 'text-danger']">
              {{ shift.profitLoss >= 0 ? '+' : '' }}${{ shift.profitLoss }}
            </p>
            <p class="text-sm text-neutral-400">{{ shift.operations }} операций</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDealsStore } from '../stores/deals'
import { useShiftsStore } from '../stores/shifts'
import { computed } from 'vue'

const dealsStore = useDealsStore()
const shiftsStore = useShiftsStore()

const totalProfit = computed(() => {
  return dealsStore.deals.reduce((sum, deal) => sum + deal.profit, 0)
})

const successRate = computed(() => {
  const profitableDeals = dealsStore.deals.filter(d => d.profit > 0).length
  return dealsStore.deals.length > 0 ? Math.round((profitableDeals / dealsStore.deals.length) * 100) : 0
})

const averageProfit = computed(() => {
  return dealsStore.deals.length > 0 ? totalProfit.value / dealsStore.deals.length : 0
})

const pairStats = computed(() => {
  const pairs = {}
  dealsStore.deals.forEach(deal => {
    pairs[deal.pair] = (pairs[deal.pair] || 0) + 1
  })
  const total = dealsStore.deals.length
  return Object.entries(pairs).map(([name, count]) => ({
    name,
    count,
    percentage: (count / total) * 100,
  })).sort((a, b) => b.count - a.count)
})

const bestPair = computed(() => {
  if (pairStats.value.length === 0) return 'N/A'
  return pairStats.value[0].name
})

const formatDateOnly = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
  })
}
</script>
