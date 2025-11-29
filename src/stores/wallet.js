import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useWalletStore = defineStore("wallet", () => {
  const balance = ref(10000)
  const currencies = ref([
    { code: "USDT", name: "Tether", amount: 5000, price: 1 },
    { code: "BTC", name: "Bitcoin", amount: 0.5, price: 43500 },
    { code: "ETH", name: "Ethereum", amount: 5, price: 2300 },
    { code: "XRP", name: "Ripple", amount: 1000, price: 0.52 },
  ])

  const totalValue = computed(() => {
    return currencies.value.reduce((sum, curr) => sum + curr.amount * curr.price, 0)
  })

  const addTransaction = (transaction) => {
    balance.value += transaction.amount
  }

  const updateCurrencyAmount = (code, amount) => {
    const currency = currencies.value.find((c) => c.code === code)
    if (currency) {
      currency.amount += amount
    }
  }

  return {
    balance,
    currencies,
    totalValue,
    addTransaction,
    updateCurrencyAmount,
  }
})
