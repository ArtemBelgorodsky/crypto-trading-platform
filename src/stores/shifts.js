import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShiftsStore = defineStore('shifts', () => {
  const currentShift = ref(null);
  const shifts = ref([
    {
      id: 1,
      date: new Date('2025-09-15'),
      startTime: '09:00',
      endTime: '17:00',
      profitLoss: 1250.5,
      operations: 12,
      dealsCount: 5,
      status: 'completed',
    },
    {
      id: 2,
      date: new Date('2025-09-14'),
      startTime: '09:00',
      endTime: '17:00',
      profitLoss: -350.2,
      operations: 8,
      dealsCount: 3,
      status: 'completed',
    },
  ]);

  const shiftOperations = ref([]);

  const startShift = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    currentShift.value = {
      id: Math.max(...shifts.value.map((s) => s.id), 0) + 1,
      date: now,
      startTime: `${hours}:${minutes}`,
      endTime: null,
      profitLoss: 0,
      operations: 0,
      dealsCount: 0,
      status: 'active',
    };
    shiftOperations.value = [];
  };

  const endShift = () => {
    if (currentShift.value) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      currentShift.value.endTime = `${hours}:${minutes}`;
      currentShift.value.status = 'completed';
      shifts.value.unshift(currentShift.value);
      currentShift.value = null;
    }
  };

  const addOperation = (operation) => {
    if (currentShift.value) {
      const op = {
        id: Math.max(...shiftOperations.value.map((o) => o.id), 0) + 1,
        timestamp: new Date(),
        ...operation,
      };
      shiftOperations.value.push(op);
      currentShift.value.operations += 1;
      return op;
    }
  };

  return {
    currentShift,
    shifts,
    shiftOperations,
    startShift,
    endShift,
    addOperation,
  };
});
