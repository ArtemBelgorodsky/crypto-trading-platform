<template>
  <div class="p-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">Сделки</h1>
        <p class="text-neutral-400">Управление вашими торговыми сделками</p>
      </div>
      <button @click="showModal = true" class="px-6 py-3 gradient-primary text-white rounded-lg hover:opacity-90 transition-smooth font-bold">
        + Новая сделка
      </button>
    </div>

    <!-- Active Deals Tab -->
    <div class="mb-6 flex gap-4">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="['px-6 py-2 rounded-lg font-medium transition-smooth', activeTab === tab.value ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700']"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Deals List -->
    <div class="space-y-4">
      <div v-for="deal in filteredDeals" :key="deal.id" class="glass-effect rounded-xl p-6 border border-neutral-700 hover:border-primary transition-smooth">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <div :class="['gradient-primary p-4 rounded-lg', deal.type === 'sell' && 'gradient-accent']">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5 6.67 11 7.5 11z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-white text-lg">{{ deal.pair }}</p>
              <p class="text-sm text-neutral-400">{{ formatDate(deal.date) }}</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="editDeal(deal)" class="p-2 hover:bg-neutral-700 rounded transition-smooth">
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
            <button @click="deleteDeal(deal.id)" class="p-2 hover:bg-neutral-700 rounded transition-smooth">
              <svg class="w-5 h-5 text-danger" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-4">
          <div>
            <p class="text-xs text-neutral-400 mb-1">Тип</p>
            <span :class="['px-2 py-1 rounded text-xs font-bold', deal.type === 'buy' ? 'bg-green-500/20 text-success' : 'bg-red-500/20 text-danger']">
              {{ deal.type === 'buy' ? 'Покупка' : 'Продажа' }}
            </span>
          </div>
          <div>
            <p class="text-xs text-neutral-400 mb-1">Объем</p>
            <p class="font-bold text-white">{{ deal.amount }}</p>
          </div>
          <div>
            <p class="text-xs text-neutral-400 mb-1">Цена за единицу</p>
            <p class="font-bold text-white">${{ deal.price }}</p>
          </div>
          <div>
            <p class="text-xs text-neutral-400 mb-1">Статус</p>
            <span :class="['px-2 py-1 rounded text-xs font-bold', deal.status === 'completed' ? 'bg-blue-500/20 text-accent' : 'bg-yellow-500/20 text-warning']">
              {{ deal.status === 'completed' ? 'Завершена' : 'В ожидании' }}
            </span>
          </div>
        </div>
        <div class="pt-4 border-t border-neutral-700 flex items-center justify-between">
          <p class="text-neutral-400">Прибыль/убыток</p>
          <p :class="deal.profit >= 0 ? 'text-success' : 'text-danger'" class="text-lg font-bold">
            {{ deal.profit >= 0 ? '+' : '' }}${{ deal.profit }}
          </p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Deal Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div class="glass-effect rounded-xl p-8 border border-neutral-700 max-w-md w-full mx-4">
        <h3 class="text-2xl font-bold text-white mb-6">{{ editingDeal ? 'Редактировать' : 'Новая' }} сделка</h3>
        
        <form @submit.prevent="saveDeal" class="space-y-4">
          <div>
            <label class="text-sm font-bold text-neutral-300 block mb-2">Пара валют</label>
            <input v-model="formData.pair" type="text" placeholder="BTC/USDT" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"/>
          </div>
          
          <div>
            <label class="text-sm font-bold text-neutral-300 block mb-2">Тип сделки</label>
            <select v-model="formData.type" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary">
              <option value="buy">Покупка</option>
              <option value="sell">Продажа</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-bold text-neutral-300 block mb-2">Объем</label>
            <input v-model="formData.amount" type="number" step="0.01" placeholder="0.00" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="text-sm font-bold text-neutral-300 block mb-2">Цена</label>
            <input v-model="formData.price" type="number" step="0.01" placeholder="0.00" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"/>
          </div>

          <div>
            <label class="text-sm font-bold text-neutral-300 block mb-2">Прибыль/убыток ($)</label>
            <input v-model="formData.profit" type="number" step="0.01" placeholder="0.00" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"/>
          </div>

          <div class="flex gap-4 pt-4">
            <button type="button" @click="closeModal" class="flex-1 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-smooth font-medium">
              Отмена
            </button>
            <button type="submit" class="flex-1 px-4 py-2 gradient-primary text-white rounded-lg hover:opacity-90 transition-smooth font-medium">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDealsStore } from '../stores/deals'
import { useShiftsStore } from '../stores/shifts'
import { ref, computed } from 'vue'

const dealsStore = useDealsStore()
const shiftsStore = useShiftsStore()

const showModal = ref(false)
const activeTab = ref('all')
const editingDeal = ref(null)
const formData = ref({
  pair: '',
  type: 'buy',
  amount: 0,
  price: 0,
  profit: 0,
})

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Завершенные', value: 'completed' },
]

const filteredDeals = computed(() => {
  if (activeTab.value === 'active') {
    return dealsStore.deals.filter(d => d.status === 'pending')
  } else if (activeTab.value === 'completed') {
    return dealsStore.deals.filter(d => d.status === 'completed')
  }
  return dealsStore.deals
})

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const editDeal = (deal) => {
  editingDeal.value = deal
  formData.value = { ...deal }
  showModal.value = true
}

const deleteDeal = (id) => {
  if (confirm('Вы уверены, что хотите удалить эту сделку?')) {
    dealsStore.deleteDeal(id)
  }
}

const saveDeal = () => {
  if (editingDeal.value) {
    dealsStore.updateDeal(editingDeal.value.id, formData.value)
  } else {
    const newDeal = dealsStore.addDeal(formData.value)
    shiftsStore.addOperation({
      type: 'deal',
      description: `Сделка ${formData.value.type === 'buy' ? 'покупки' : 'продажи'} ${formData.value.pair}`,
      amount: formData.value.amount,
    })
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  editingDeal.value = null
  formData.value = {
    pair: '',
    type: 'buy',
    amount: 0,
    price: 0,
    profit: 0,
  }
}
</script>
