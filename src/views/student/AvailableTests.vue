<template>

    <!-- Таблица тестов -->
    <v-data-table
        :headers="headers"
        :items="studentStore.availableTests"
        :loading="studentStore.isLoading"
        item-value="id"
        color="primary"
        hover
        @click:row="openTest"
        class="rounded-lg bg-transparent"
    >
      <!-- Название -->
      <template #item.title="{ item }">
        <span class="font-weight-medium text-primary cursor-pointer">
          {{ item.title }}
        </span>
      </template>

      <!-- Балл -->
      <template #item.score="{ item }">
        <span :class="item.score >= item.passingScore ? 'text-success' : 'text-error'">
          {{ item.score }}/{{ item.maxScore }}
        </span>
      </template>

      <!-- Проходной балл -->
      <template #item.passingScore="{ item }">
        {{ item.passingScore }}
      </template>

      <!-- Попытки -->
      <template #item.attempts="{ item }">
        {{ item.usedAttempts }}/{{ item.maxAttempts }}
      </template>

      <!-- Срок -->
      <template #item.deadline="{ item }">
        <span :class="isExpired(item.deadline) ? 'text-error' : ''">
          до {{ formatDate(item.deadline) }}
        </span>
      </template>
    </v-data-table>

</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {formatDate, isExpired} from "@/utils/formatters.js";

const router = useRouter()

// Импорт хранилища для шапки
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

// Импорт хранилища для данных о тестах
import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()

// Заголовки таблицы
const headers = [
  { title: 'Название', key: 'title', sortable: true },
  { title: 'Балл', key: 'score', sortable: true, align: 'center' },
  { title: 'Проходной балл', key: 'passingScore', sortable: true, align: 'center' },
  { title: 'Кол. попыток', key: 'attempts', sortable: true, align: 'center' },
  { title: 'Вопросов', key: 'questionCount', sortable: true, align: 'center' },
  { title: 'Срок выполнения', key: 'deadline', sortable: true, align: 'center' },
]

// Открыть тест
const openTest = (event, row) => {
  const test = row.item
  router.push(`/test/${test.id}`)
}

onMounted(async () => {
  appStore.setPageTitle('Доступные тесты')
  appStore.setHeaderAction(null) // без кнопки
  await studentStore.fetchAvailableTests()
})

</script>
