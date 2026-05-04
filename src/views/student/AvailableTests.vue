<template>

    <!-- Таблица тестов -->
    <v-data-table
        :headers="headers"
        :items="tests"
        :loading="loading"
        item-value="id"
        color="primary"
        hover
        @click:row="openTest"
        class="elevation-0 rounded-lg"
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
        {{ item.passingScore }}/{{ item.maxScore }}
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Состояние
const tests = ref([])
const loading = ref(false)

// Заголовки таблицы
const headers = [
  { title: 'Название', key: 'title', sortable: true },
  { title: 'Балл', key: 'score', sortable: true, align: 'center' },
  { title: 'Проходной балл', key: 'passingScore', sortable: true, align: 'center' },
  { title: 'Кол. попыток', key: 'attempts', sortable: true, align: 'center' },
  { title: 'Вопросов', key: 'questionCount', sortable: true, align: 'center' },
  { title: 'Срок выполнения', key: 'deadline', sortable: true, align: 'center' },
]

// Форматирование даты
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

// Проверка, просрочен ли тест
const isExpired = (deadline) => {
  return new Date(deadline) < new Date()
}

// Открыть тест
const openTest = (event, row) => {
  const test = row.item
  router.push(`/test/${test.id}`)
}

// FIXME: Подключить API — получение доступных тестов
const fetchTests = async () => {
  loading.value = true
  try {
    // const response = await axios.get('/api/student/available-tests')
    // tests.value = response.data

    // Временные мок-данные
    await new Promise(resolve => setTimeout(resolve, 500))
    tests.value = [
      {
        id: 1,
        title: 'Тест1 для самопроверки',
        score: 0,
        maxScore: 20,
        passingScore: 15,
        usedAttempts: 0,
        maxAttempts: 2,
        questionCount: 20,
        deadline: '2026-03-20',
        type: 'self-check',
      },
      {
        id: 2,
        title: 'Тест2 контрольный',
        score: 20,
        maxScore: 20,
        passingScore: 15,
        usedAttempts: 1,
        maxAttempts: 2,
        questionCount: 20,
        deadline: '2026-03-20',
        type: 'control',
      },
      {
        id: 3,
        title: 'Тест3',
        score: 0,
        maxScore: 20,
        passingScore: 15,
        usedAttempts: 0,
        maxAttempts: 2,
        questionCount: 20,
        deadline: '2026-03-20',
        type: 'regular',
      },
    ]
  } catch (error) {
    console.error('Ошибка загрузки тестов:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTests()
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>