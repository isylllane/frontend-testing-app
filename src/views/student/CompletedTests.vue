<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="studentStore.completedTests"
        :loading="studentStore.isLoading"
        item-value="id"
        color="primary"
        hover
        class="rounded-lg bg-transparent"
    >
      <template #item.title="{ item }">
        <span class="font-weight-medium text-primary">{{ item.title }}</span>
      </template>

      <template #item.score="{ item }">
        <span :class="item.isPassed ? 'text-success' : 'text-error'">
          {{ item.score }}/{{ item.maxScore }}
        </span>
      </template>

      <template #item.passingScore="{ item }">
        {{ item.passingScore }}
      </template>

      <template #item.status="{ item }">
        <v-chip
            :color="item.isPassed ? 'success' : 'error'"
            size="small"
            variant="tonal"
        >
          {{ item.isPassed ? 'Зачёт' : 'Незачёт' }}
        </v-chip>
      </template>

      <template #item.completedAt="{ item }">
        {{ formatDate(item.completedAt) }}
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useAppStore } from '@/stores/app'
import { formatDate } from '@/utils/formatters'

const studentStore = useStudentStore()
const appStore = useAppStore()

const headers = [
  { title: 'Название', key: 'title', sortable: true },
  { title: 'Балл', key: 'score', sortable: true, align: 'center' },
  { title: 'Проходной балл', key: 'passingScore', sortable: true, align: 'center' },
  { title: 'Статус', key: 'status', sortable: true, align: 'center' },
  { title: 'Дата завершения', key: 'completedAt', sortable: true, align: 'center' },
]

onMounted(async () => {
  appStore.setPageTitle('Пройденные тесты')
  appStore.setHeaderAction(null)
  await studentStore.fetchCompletedTests()
})
</script>