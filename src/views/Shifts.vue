<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Смены</h1>
      <p class="text-neutral-400">История и детали ваших смен</p>
    </div>

    <!-- Current Shift Activity -->
    <div v-if="shiftsStore.currentShift" class="glass-effect rounded-xl p-6 border border-primary mb-8">
      <h2 class="text-xl font-bold text-white mb-6">Активность текущей смены</h2>
      <div class="space-y-4">
        <div v-for="op in shiftsStore.shiftOperations" :key="op.id" class="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
          <div>
            <p class="font-bold text-white">{{ op.description }}</p>
            <p class="text-sm text-neutral-400">{{ formatTime(op.timestamp) }}</p>
          </div>
          <div class="text-right">
            <p :class="['font-bold', op.type === 'deposit' ? 'text-success' : 'text-neutral-300']">
              {{ op.type === 'deposit' ? '+' : '' }}{{ op.amount }}
            </p>
          </div>
        </div>
        <div v-if="shiftsStore.shiftOperations.length === 0" class="text-center py-8 text-neutral-400">
          Нет операций в текущей смене
        </div>
      </div>
    </div>

    <!-- Previous Shifts -->
    <h2 class="text-2xl font-bold text-white mb-6">Предыдущие смены</h2>
    <div class="space-y-4">
      <div v-for="shift in shiftsStore.shifts" :key="shift.id" class="glass-effect rounded-xl p-6 border border-neutral-700 hover:border-primary transition-smooth">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="font-bold text-white text-lg">{{ formatDateOnly(shift.date) }}</p>
            <p class="text-sm text-neutral-400">{{ shift.startTime }} - {{ shift.endTime }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-neutral-400 mb-1">Итого</p>
            <p :class="['text-2xl font-bold', shift.profitLoss >= 0 ? 'text-success' : 'text-danger']">
              {{ shift.profitLoss >= 0 ? '+' : '' }}${{ shift.profitLoss }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-xs text-neutral-400 mb-1">Операций</p>
            <p class="text-xl font-bold text-white">{{ shift.operations }}</p>
          </div>
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-xs text-neutral-400 mb-1">Сделок</p>
            <p class="text-xl font-bold text-white">{{ shift.dealsCount }}</p>
          </div>
          <div class="bg-neutral-800 rounded-lg p-4">
            <p class="text-xs text-neutral-400 mb-1">Статус</p>
            <p class="text-xl font-bold text-accent">Завершена</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShiftsStore } from '../stores/shifts'

const shiftsStore = useShiftsStore()

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const formatDateOnly = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
