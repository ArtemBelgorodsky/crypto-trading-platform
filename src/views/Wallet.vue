<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Кошелек</h1>
      <p class="text-neutral-400">Управление вашими средствами</p>
    </div>

    <!-- Total Balance -->
    <div class="glass-effect rounded-xl p-8 border border-neutral-700 mb-8">
      <p class="text-sm text-neutral-400 mb-2">Общий баланс кошелька</p>
      <h2 class="text-5xl font-bold text-white mb-4">${{ walletStore.totalValue.toFixed(2) }}</h2>
      <div class="flex gap-4">
        <button @click="showDepositModal = true" class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-smooth font-medium">
          Пополнить
        </button>
        <button @click="showWithdrawModal = true" class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-smooth font-medium">
          Вывести
        </button>
      </div>
    </div>

    <!-- Currency Holdings -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div v-for="currency in walletStore.currencies" :key="currency.code" class="glass-effect rounded-xl p-6 border border-neutral-700">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="gradient-primary p-3 rounded-lg">
              <span class="font-bold text-white text-sm">{{ currency.code.charAt(0) }}</span>
            </div>
            <div>
              <p class="font-bold text-white">{{ currency.name }}</p>
              <p class="text-sm text-neutral-400">{{ currency.code }}</p>
            </div>
          </div>
          <ArrowRightLeft class="w-5 h-5 text-accent cursor-pointer hover:text-primary transition-smooth" />
        </div>
        <div class="bg-neutral-800 rounded-lg p-4 mb-4">
          <p class="text-sm text-neutral-400 mb-1">Количество</p>
          <p class="text-2xl font-bold text-white">{{ currency.amount }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-neutral-400 mb-1">Цена за единицу</p>
            <p class="font-bold text-white">${{ currency.price }}</p>
          </div>
          <div>
            <p class="text-xs text-neutral-400 mb-1">Стоимость</p>
            <p class="font-bold text-accent">${{ (currency.amount * currency.price).toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Exchange Operations -->
    <div class="glass-effect rounded-xl p-6 border border-neutral-700">
      <h3 class="text-xl font-bold text-white mb-6">История операций обмена</h3>
      <div class="space-y-4">
        <div v-for="tx in exchangesStore.transactions" :key="tx.id" class="flex items-center justify-between p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-smooth">
          <div class="flex items-center gap-4">
            <div class="gradient-primary p-3 rounded-lg">
              <ArrowRightLeft class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="font-bold text-white">{{ tx.from }} → {{ tx.to }}</p>
              <p class="text-sm text-neutral-400">{{ formatDate(tx.timestamp) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-white">{{ tx.amount }} {{ tx.from }}</p>
            <p class="text-sm text-success">+{{ tx.profit }} $</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Deposit Modal -->
    <transition name="modal">
      <div v-if="showDepositModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 border border-neutral-700 w-96">
        <h3 class="text-xl font-bold text-white mb-4">Пополнить кошелек</h3>
        <div class="mb-4">
          <label class="block text-sm text-neutral-400 mb-2">Сумма (USD)</label>
          <input v-model="depositAmount" type="number" step="0.01" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary" placeholder="Введите сумму">
        </div>
        <div class="flex gap-4">
          <button @click="showDepositModal = false" class="flex-1 px-4 py-2 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition-smooth">Отмена</button>
          <button @click="deposit" class="flex-1 px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-smooth">Пополнить</button>
        </div>
      </div>
    </div>
    </transition>

    <!-- Withdraw Modal -->
    <transition name="modal">
      <div v-if="showWithdrawModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 border border-neutral-700 w-96">
        <h3 class="text-xl font-bold text-white mb-4">Вывести средства</h3>
        <div class="mb-4">
          <label class="block text-sm text-neutral-400 mb-2">Сумма (USD)</label>
          <input v-model="withdrawAmount" type="number" step="0.01" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary" placeholder="Введите сумму">
        </div>
        <div class="flex gap-4">
          <button @click="showWithdrawModal = false" class="flex-1 px-4 py-2 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition-smooth">Отмена</button>
          <button @click="withdraw" class="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-smooth">Вывести</button>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWalletStore } from '../stores/wallet'
import { useExchangesStore } from '../stores/exchanges'
import { ArrowRightLeft  } from 'lucide-vue-next'

const walletStore = useWalletStore()
const exchangesStore = useExchangesStore()

const showDepositModal = ref(false)
const showWithdrawModal = ref(false)
const depositAmount = ref('')
const withdrawAmount = ref('')

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const deposit = () => {
  const amount = parseFloat(depositAmount.value)
  if (amount > 0) {
    walletStore.updateCurrencyAmount('USDT', amount)
    depositAmount.value = ''
    showDepositModal.value = false
  }
}

const withdraw = () => {
  const amount = parseFloat(withdrawAmount.value)
  const usdt = walletStore.currencies.find(c => c.code === 'USDT')
  if (amount > 0 && usdt && amount <= usdt.amount) {
    walletStore.updateCurrencyAmount('USDT', -amount)
    withdrawAmount.value = ''
    showWithdrawModal.value = false
  } else {
    alert('Недостаточно средств для вывода')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
