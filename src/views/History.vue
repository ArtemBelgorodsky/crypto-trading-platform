<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">История операций</h1>
      <p class="text-neutral-400">Полная история всех ваших действий</p>
    </div>

    <!-- Filters -->
    <div class="glass-effect rounded-xl p-6 border border-neutral-700 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="text-sm font-bold text-neutral-300 block mb-2">Тип</label>
          <select v-model="filterType" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary">
            <option value="">Все</option>
            <option value="deal">Сделки</option>
            <option value="exchange">Обмены</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-bold text-neutral-300 block mb-2">Статус</label>
          <select v-model="filterStatus" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary">
            <option value="">Все</option>
            <option value="completed">Завершено</option>
            <option value="pending">В ожидании</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-bold text-neutral-300 block mb-2">Поиск</label>
          <input v-model="searchQuery" type="text" placeholder="Поиск..." class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"/>
        </div>
      </div>
    </div>

    <!-- Operations Timeline -->
    <div class="space-y-4">
      <div v-for="operation in filteredOperations" :key="operation.id" class="glass-effect rounded-xl p-6 border border-neutral-700 hover:border-primary transition-smooth">
        <div class="flex items-start justify-between">
          <div class="flex items-start gap-4">
            <div :class="['p-3 rounded-lg', operation.type === 'deal' ? 'gradient-primary' : 'gradient-accent']">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="operation.type === 'deal'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5 6.67 11 7.5 11z"/>
                <path v-else d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-white text-lg">{{ operation.title }}</p>
              <p class="text-sm text-neutral-400 mt-2">{{ operation.description }}</p>
              <p class="text-xs text-neutral-500 mt-2">{{ formatDateTime(operation.timestamp) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p :class="['text-lg font-bold', operation.profit >= 0 ? 'text-success' : 'text-danger']">
              {{ operation.profit >= 0 ? '+' : '' }}${{ operation.profit }}
            </p>
            <span :class="['px-3 py-1 rounded text-xs font-bold mt-2 inline-block', operation.status === 'completed' ? 'bg-blue-500/20 text-accent' : 'bg-yellow-500/20 text-warning']">
              {{ operation.status === 'completed' ? 'Завершено' : 'В ожидании' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDealsStore } from '../stores/deals'
import { useExchangesStore } from '../stores/exchanges'
import { ref, computed } from 'vue'

const dealsStore = useDealsStore()
const exchangesStore = useExchangesStore()

const filterType = ref('')
const filterStatus = ref('')
const searchQuery = ref('')

const allOperations = computed(() => {
  const deals = dealsStore.deals.map(deal => ({
    id: `deal-${deal.id}`,
    type: 'deal',
    title: deal.pair,
    description: `${deal.type === 'buy' ? 'Покупка' : 'Продажа'} ${deal.amount} ${deal.pair.split('/')[0]}`,
    profit: deal.profit,
    timestamp: deal.date,
    status: deal.status,
  }))

  const exchanges = exchangesStore.transactions.map(tx => ({
    id: `exchange-${tx.id}`,
    type: 'exchange',
    title: `${tx.from} → ${tx.to}`,
    description: `Обмен ${tx.amount} ${tx.from} на ${tx.received} ${tx.to}`,
    profit: tx.profit,
    timestamp: tx.timestamp,
    status: tx.status,
  }))

  return [...deals, ...exchanges].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

const filteredOperations = computed(() => {
  return allOperations.value.filter(op => {
    const typeMatch = !filterType.value || op.type === filterType.value
    const statusMatch = !filterStatus.value || op.status === filterStatus.value
    const searchMatch = !searchQuery.value || 
      op.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return typeMatch && statusMatch && searchMatch
  })
})

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
