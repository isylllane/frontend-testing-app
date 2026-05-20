<!--
  QuestionGrid.vue
  Сетка с кружками для навигации по вопросам теста
  Отображается в боковом меню во время прохождения теста

  Состояния кружков:
  - Серый (пустой) — вопрос не отвечен
  - Синий (primary) — вопрос отвечен
  - Синий с обводкой (outlined) — текущий вопрос
  - Зелёный (success) — отвечен и текущий
-->
<template>
  <div class="py-4">
    <!-- Заголовок -->
    <div class="text-title-large font-weight-medium mb-3 text-medium-emphasis text-center">
      Вопросы
    </div>

    <!-- Сетка 5 колонок -->
    <div class="d-flex flex-wrap ga-2 justify-center">
      <v-btn
          v-for="status in questionStatuses"
          :key="status.index"
          :icon="true"
          size="small"
          :variant="getVariant(status)"
          :color="getColor(status)"
          :class="getClass(status)"
          @click="$emit('select', status.index)"
      >
        {{ status.index + 1 }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
// Пропсы
defineProps({
  // Массив статусов из стора: { index, answered, isCurrent }
  questionStatuses: {
    type: Array,
    required: true,
  },
})

// Эмиты
defineEmits(['select'])

/**
 * Определить вариант кнопки (заливка или обводка)
 */
const getVariant = (status) => {
  // Текущий вопрос — всегда заливка
  if (status.isCurrent) return 'flat'
  // Отвеченный вопрос — обводка
  if (status.answered) return 'outlined'
  // Не отвечен — просто обводка
  return 'outlined'
}

/**
 * Определить цвет кружка
 */
const getColor = (status) => {
  if (status.isCurrent) return 'secondary'
  if (status.answered) return 'primary'
  // Не отвечен — серый
  return 'grey-darken-5'
}

/**
 * Дополнительные классы
 */
const getClass = (status) => {
  return {
    'font-weight-bold': status.isCurrent,
    'opacity-50': !status.answered && !status.isCurrent,
  }
}
</script>
