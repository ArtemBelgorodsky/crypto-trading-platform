import { defineStore } from "pinia"
import { ref } from "vue"

export const useExchangesStore = defineStore("exchanges", () => {
  const exchanges = ref([
    { id: 1, name: "Binance", code: "BNCE", rate: 1 },
    { id: 2, name: "Kraken", code: "KRKN", rate: 1.002 },
    { id: 3, name: "Coinbase", code: "COIN", rate: 1.001 },
    { id: 4, name: "Huobi", code: "HUOB", rate: 0.998 },
  ])

  const currencyPairs = ref([
    { from: "USDT", to: "BTC", rate: 0.000023 },
    { from: "USDT", to: "ETH", rate: 0.00043 },
    { from: "BTC", to: "ETH", rate: 18.5 },
    { from: "USDT", to: "XRP", rate: 1.92 },
  ])

  const transactions = ref([
    {
      id: 1,
      from: "USDT",
      to: "BTC",
      amount: 1000,
      received: 0.023,
      fromExchange: "Binance",
      toExchange: "Kraken",
      profit: 23,
      timestamp: new Date(),
      status: "completed",
    },
    {
      id: 2,
      from: "ETH",
      to: "USDT",
      amount: 5,
      received: 11500,
      fromExchange: "Kraken",
      toExchange: "Binance",
      profit: 100,
      timestamp: new Date(Date.now() - 3600000),
      status: "completed",
    },
  ])

  const addExchangeTransaction = (transaction) => {
    const newTx = {
      id: Math.max(...transactions.value.map((t) => t.id), 0) + 1,
      timestamp: new Date(),
      status: "completed",
      ...transaction,
    }
    transactions.value.unshift(newTx)
    return newTx
  }

  return {
    exchanges,
    currencyPairs,
    transactions,
    addExchangeTransaction,
  }
})
