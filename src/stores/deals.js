import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDealsStore = defineStore('deals', () => {
  const deals = ref([
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'buy',
      amount: 0.5,
      price: 43000,
      date: new Date('2025-10-15'),
      status: 'completed',
      profit: 250,
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'sell',
      amount: 2,
      price: 2350,
      date: new Date('2025-10-14'),
      status: 'completed',
      profit: 100,
    },
    {
      id: 3,
      pair: 'XRP/USDT',
      type: 'buy',
      amount: 500,
      price: 0.51,
      date: new Date('2025-10-13'),
      status: 'pending',
      profit: 0,
    },
  ]);

  const addDeal = (deal) => {
    const newDeal = {
      id: Math.max(...deals.value.map((d) => d.id), 0) + 1,
      ...deal,
      date: new Date(),
      status: 'pending',
    };
    deals.value.unshift(newDeal);
    return newDeal;
  };

  const updateDeal = (id, updatedDeal) => {
    const index = deals.value.findIndex((d) => d.id === id);
    if (index !== -1) {
      deals.value[index] = { ...deals.value[index], ...updatedDeal };
    }
  };

  const deleteDeal = (id) => {
    deals.value = deals.value.filter((d) => d.id !== id);
  };

  const completeDeal = (id) => {
    const deal = deals.value.find((d) => d.id === id);
    if (deal) {
      deal.status = 'completed';
    }
  };

  return {
    deals,
    addDeal,
    updateDeal,
    deleteDeal,
    completeDeal,
  };
});
