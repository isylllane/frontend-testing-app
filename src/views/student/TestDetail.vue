<template>
  <div>
    <!-- Skeleton загрузка -->
    <template v-if="studentStore.isLoading">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="mb-4">
            <v-skeleton-loader type="sentences" class="bg-transparent" />
          </div>
          <div class="mb-4">
            <v-skeleton-loader type="sentences" class="bg-transparent" />
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="mb-4">
            <v-skeleton-loader type="sentences" class="bg-transparent" />
          </div>
          <div class="mb-4">
            <v-skeleton-loader type="sentences" class="bg-transparent" />
          </div>
        </v-col>
        </v-row>
      <div class="mb-4">
        <v-skeleton-loader type="paragraph" class="mt-4 bg-transparent" />
      </div>
      <v-divider class="my-6" />

      <div>
        <v-skeleton-loader type="article" class="mb-6 bg-transparent" />

      </div>
    </template>

    <!-- Контент после загрузки -->
    <template v-else-if="studentStore.currentTest">
      <div class="mt-8">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="mb-4">
              <span class="font-weight-medium">Кол. попыток:</span>
              {{ studentStore.currentTest.usedAttempts }}/{{ studentStore.currentTest.maxAttempts }}
            </div>
            <div class="mb-4">
              <span class="font-weight-medium">Срок выполнения до:</span>
              {{ formatDate(studentStore.currentTest.deadline) }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="mb-4">
              <span class="font-weight-medium">Вопросов:</span>
              {{ studentStore.currentTest.questionCount }}
            </div>
            <div class="mb-4">
              <span class="font-weight-medium">Время выполнения:</span>
              {{ formatDuration(studentStore.currentTest.durationMinutes) }}
            </div>
          </v-col>
        </v-row>
        <div class="mb-4">
          <span class="font-weight-medium">Дисциплина:</span>
          {{ studentStore.currentTest.discipline }}
        </div>
      </div>

      <v-divider class="my-6" />

      <div>
        <p class="font-weight-medium mb-2">Описание:</p>
        <p class="text-medium-emphasis">{{ studentStore.currentTest.description }}</p>
      </div>
    </template>

    <!-- На случай ошибки -->
    <template v-else>
      <v-alert type="error" variant="tonal">
        Не удалось загрузить данные теста
      </v-alert>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { useAppStore } from '@/stores/app'
import {formatDate, formatDuration} from "@/utils/formatters.js";

const route = useRoute()
const router = useRouter()
const studentStore = useStudentStore()
const appStore = useAppStore()

const startTest = () => {
  router.push(`/test/${studentStore.currentTest.id}/run`)
}

onMounted(async () => {
  // FIXME: Подключить API — получение данных теста
  await studentStore.fetchTestDetail(route.params.id)

  // Если данные загрузились — обновляем шапку
  if (studentStore.currentTest) {
    appStore.setPageTitle(studentStore.currentTest.title)
    appStore.setHeaderAction({
      label: 'Начать',
      onClick: startTest,
    })
  }
})
</script>