<!--
  QuestionView.vue
  Контейнер, который отображает нужный компонент вопроса
  в зависимости от типа вопроса (single, multiple, sequence, text, matching)

  Сейчас реализован только single (одиночный выбор),
  остальные типы будут добавляться по мере необходимости
-->
<template>
  <div>
    <!-- Текст вопроса -->
    <p class="text-body-1 font-weight-medium mb-4">
      {{ question.text }}
    </p>

    <!-- Варианты ответов — зависит от типа вопроса -->
    <SingleChoice
        v-if="question.type === 'single'"
        :model-value="selectedAnswer"
        :options="question.options"
        @update:model-value="handleAnswer"
    />

    <!--
      FIXME: Добавить остальные типы вопросов
      <MultipleChoice v-else-if="question.type === 'multiple'" ... />
      <SequenceOrder v-else-if="question.type === 'sequence'" ... />
      <TextInput v-else-if="question.type === 'text'" ... />
      <MatchingPairs v-else-if="question.type === 'matching'" ... />
    -->

    <!-- Неизвестный тип вопроса -->
    <v-alert
        v-else
        type="warning"
        variant="tonal"
    >
      Тип вопроса «{{ question.type }}» пока не поддерживается
    </v-alert>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SingleChoice from './SingleChoice.vue'

const props = defineProps({
  // Объект вопроса: { id, text, type, options }
  question: {
    type: Object,
    required: true,
  },
  // Все ответы студента { questionId: answer }
  answers: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answer'])

// Текущий ответ на этот вопрос (для v-model)
const selectedAnswer = computed(() => {
  return props.answers[props.question.id] || null
})

/**
 * Обработчик выбора ответа
 * Пробрасывает наверх: { questionId, answer }
 */
const handleAnswer = (answer) => {
  emit('answer', {
    questionId: props.question.id,
    answer,
  })
}
</script>