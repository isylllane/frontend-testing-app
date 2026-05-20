<!--
  TestRun.vue
  Страница прохождения теста
  Маршрут: /test/:id/run

  Особенности:
  - Боковое меню заменяется на сетку вопросов + таймер
  - В шапке: название теста + кнопка «Сдать»
  - Контент: вопрос и варианты ответов
  - Навигация: стрелки влево/вправо
  - При обновлении страницы сессия восстанавливается с бэкенда
-->
<template>
  <div class="test-run">
    <!-- Верхняя панель навигации -->
    <div class="d-flex align-center mb-6">
      <v-btn
          icon="mdi-chevron-left"
          variant="text"
          :disabled="!testStore.hasPrevQuestion"
          @click="goPrev"
      />

      <span class="text-body-1 mx-4">
        {{ testStore.currentIndex + 1 }} / {{ testStore.totalQuestions }} вопрос
      </span>

      <v-btn
          icon="mdi-chevron-right"
          variant="text"
          :disabled="!testStore.hasNextQuestion"
          @click="goNext"
      />
    </div>

    <!-- Текущий вопрос -->
    <div v-if="testStore.currentQuestion" class="pa-4">
      <QuestionView
          :question="testStore.currentQuestion"
          :answers="testStore.answers"
          @answer="handleAnswer"
      />
    </div>
    <v-dialog v-model="showLeaveDialog" max-width="400" persistent>
      <v-card class="pa-4 rounded-lg">
        <v-card-title class="text-h6 font-weight-bold">
          Прервать тест?
        </v-card-title>
        <v-card-text class="text-body-1">
          Если вы выйдете, прогресс будет потерян. Вы уверены?
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="cancelLeave" class="rounded-lg">
            Продолжить тест
          </v-btn>
          <v-btn color="error" variant="elevated" @click="confirmLeave" class="rounded-lg">
            Выйти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, onUnmounted, watch, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useTestSessionStore } from '@/stores/testSession'
import { useAppStore } from '@/stores/app'
import { useTimer } from '@/composables/useTimer'
import { useStudentStore } from '@/stores/student'
import QuestionView from '@/components/test/QuestionView.vue'

const route = useRoute()
const router = useRouter()
const testStore = useTestSessionStore()
const appStore = useAppStore()
const studentStore = useStudentStore()

// =====================
// ДИАЛОГ ПОДТВЕРЖДЕНИЯ ВЫХОДА
// =====================

const showLeaveDialog = ref(false)
let pendingNavigation = null // сохраняем next() для вызова после ответа

onBeforeRouteLeave((to, from, next) => {
  // Если идём на результат — пропускаем без вопроса
  if (to.name === 'TestResult') {
    appStore.resetSidebar()
    appStore.resetHeader()
    next()
    return
  }

  // Показываем диалог, навигацию приостанавливаем
  showLeaveDialog.value = true
  pendingNavigation = next
})

const cancelLeave = () => {
  showLeaveDialog.value = false
  pendingNavigation(false) // блокируем уход
  pendingNavigation = null
}

const confirmLeave = () => {
  showLeaveDialog.value = false
  appStore.resetSidebar()
  appStore.resetHeader()
  pendingNavigation() // разрешаем уход
  pendingNavigation = null
}

// =====================
// МЕТОДЫ
// =====================

const submitTest = async () => {
  stopTimer()
  const result = await testStore.finishTest()
  if (result) {
    appStore.resetSidebar()
    router.push(`/test/${route.params.id}/result`)
  }
}

const handleTimeUp = async () => {
  await submitTest()
}

const handleAnswer = async ({ questionId, answer }) => {
  await testStore.saveAnswer(questionId, answer)
  // Не нужно вызывать updateSidebar — watch отследит изменения answers
}

/**
 * Синхронизация бокового меню со стором
 * Вызывается при старте и при каждой смене вопроса
 */
const syncSidebar = () => {
  appStore.setSidebar('questions', {
    questionStatuses: testStore.questionStatuses,
    timeLeft: timeLeft,
    formattedTime: formattedTime,
    onQuestionSelect: (index) => {
      testStore.goToQuestion(index)
    },
  })
}

// =====================
// НАВИГАЦИЯ (с обновлением сайдбара)
// =====================

const goNext = () => {
  testStore.nextQuestion()
  syncSidebar()
}

const goPrev = () => {
  testStore.prevQuestion()
  syncSidebar()
}

// =====================
// ТАЙМЕР
// =====================

const { timeLeft, formattedTime, startTimer, stopTimer } = useTimer(handleTimeUp)

// =====================
// СЛЕДИМ ЗА СМЕНОЙ ВОПРОСА — автообновление сайдбара
// =====================

// Когда меняется currentIndex — обновляем сайдбар
watch(() => testStore.currentIndex, () => {
  syncSidebar()
})

// Когда меняются answers — обновляем сайдбар (чтобы кружки перекрашивались)
watch(() => testStore.answers, () => {
  syncSidebar()
}, { deep: true })

// =====================
// ЖИЗНЕННЫЙ ЦИКЛ
// =====================

onBeforeMount(() => {
  appStore.setSidebar('questions', {
    questionStatuses: [],
    timeLeft: 0,
    formattedTime: 'Загрузка...',
    onQuestionSelect: () => {}, // заглушка
  })
})

onMounted(async () => {
  // Берём данные из studentStore (загружены на странице описания теста)
  const testData = {
    id: studentStore.currentTest?.id || route.params.id,
    title: studentStore.currentTest?.title || 'Тест',
    durationMinutes: studentStore.currentTest?.durationMinutes || 90,
  }

  const started = await testStore.startTest(testData)

  if (!started.success) {
    router.push('/available-tests')
    return
  }

  appStore.setPageTitle(testStore.testTitle)
  appStore.setHeaderAction({
    label: 'Сдать',
    onClick: submitTest,
  })

  syncSidebar()
  startTimer(testStore.timeLeft)
})

onUnmounted(() => {
  stopTimer()
  testStore.resetSession()
  appStore.resetSidebar()
  appStore.resetHeader()
})
</script>