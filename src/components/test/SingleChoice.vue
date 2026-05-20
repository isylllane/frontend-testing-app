<!--
  SingleChoice.vue
  Компонент вопроса с одиночным выбором ответа
  Студент выбирает ОДИН вариант из списка

  Используется внутри QuestionView
-->
<template>
  <v-radio-group
      :model-value="modelValue"
      @update:model-value="$emit('update:model-value', $event)"
      class="mt-4"
      hide-details
  >
    <v-radio
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :label="option.text"
        color="primary"
        class="mb-3"
    />
  </v-radio-group>
</template>

<script setup>
// Выбранный ответ (ID варианта)
defineProps({
  // Текущий выбранный ответ (для v-model)
  modelValue: {
    type: String,
    default: null,
  },
  // Варианты ответов: [{ id: 'a', text: '...' }]
  options: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:model-value'])
</script>