<template>
  <div class="test-result">
    <div class="text-center">
      <!-- Статус -->
      <v-icon
          :icon="result.passed ? 'mdi-check-circle' : 'mdi-close-circle'"
          :color="result.passed ? 'success' : 'error'"
          size="64"
          class="mb-4"
      />

      <h2 class="text-h4 font-weight-bold mb-4">
        {{ result.passed ? 'Тест сдан!' : 'Тест не сдан' }}
      </h2>

      <p class="text-body-1 mb-6">
        Вы прошли: {{ testTitle }}
      </p>

      <v-card class="mx-auto" max-width="400">
        <v-card-text class="pa-6">
          <div class="text-body-1 mb-2">
            <span class="font-weight-medium">Количество баллов:</span>
            {{ result.score }} / {{ result.maxScore }}
          </div>
          <div class="text-body-1">
            <span class="font-weight-medium">Оценка:</span>
            <span :class="result.passed ? 'text-success' : 'text-error'" class="font-weight-bold">
              {{ result.passed ? 'Зачёт' : 'Незачёт' }}
            </span>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useTestSessionStore} from '@/stores/testSession'
import {useAppStore} from '@/stores/app'

const route = useRoute()
const router = useRouter()
const testStore = useTestSessionStore()
const appStore = useAppStore()

// Берём результат из testStore (он там после finishTest)
const testTitle = ref(testStore.testTitle || 'Тест')
const result = ref({
  score: testStore.lastResult?.score || 0,
  maxScore: testStore.lastResult?.maxScore || 0,
  passed: testStore.lastResult?.passed || false,
})

const closeResult = () => {
  testStore.resetSession()
  router.push('/available-tests')
}

onMounted(() => {
  appStore.setPageTitle(testTitle.value)
  appStore.setHeaderAction({
    label: 'Закрыть',
    onClick: closeResult,
  })
  appStore.setSidebar(null)
})
</script>