// Хранилище сессии прохождения теста
// Управляет: списком вопросов, ответами студента, таймером, статусом теста
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTestSessionStore = defineStore('testSession', () => {
    // =====================
    // СОСТОЯНИЕ
    // =====================

    const sessionId = ref(null)       // ID сессии на бэкенде
    const testId = ref(null)          // ID теста
    const testTitle = ref('')         // Название теста (для шапки)
    const questions = ref([])         // Массив вопросов { id, text, type, options }
    const answers = ref({})           // Ответы студента { questionId: answer }
    const currentIndex = ref(0)       // Индекс текущего вопроса
    const timeLeft = ref(0)           // Оставшееся время в секундах
    const status = ref('idle')        // idle | active | finished
    const isLoading = ref(false)      // Флаг загрузки
    const hasPrevQuestion = computed(() => currentIndex.value > 0)
    const hasNextQuestion = computed(() => currentIndex.value < questions.value.length - 1)
    const lastResult = ref(null)

    // =====================
    // ГЕТТЕРЫ (computed)
    // =====================

    // Текущий вопрос
    const currentQuestion = computed(() => {
        return questions.value[currentIndex.value] || null
    })

    // Всего вопросов
    const totalQuestions = computed(() => questions.value.length)

    // Массив для сетки кружков: { index, answered, isCurrent }
    const questionStatuses = computed(() => {
        return questions.value.map((q, index) => ({
            index,
            answered: !!answers.value[q.id],
            isCurrent: index === currentIndex.value,
        }))
    })

    // =====================
    // ДЕЙСТВИЯ
    // =====================

    /**
     * Начать тест (вызывается при нажатии «Начать» на странице описания)
     * FIXME: Подключить API
     */
    const startTest = async (testData) => {
        resetSession()
        lastResult.value = null
        isLoading.value = true
        try {
            // const response = await api.post(`/tests/${testData.id}/start`)
            // const data = response.data

            // Временные мок-данные
            await new Promise(resolve => setTimeout(resolve, 300))

            sessionId.value = 'mock-session-' + Date.now()
            testId.value = testData.id
            testTitle.value = testData.title
            timeLeft.value = testData.durationMinutes * 60 // переводим минуты в секунды

            // Мок-вопросы (только то, что видит студент — без правильных ответов!)
            questions.value = [
                {
                    id: 1,
                    text: 'Что такое Vue.js?',
                    type: 'single', // single | multiple | sequence | text | matching
                    options: [
                        { id: 'a', text: 'JavaScript-фреймворк' },
                        { id: 'b', text: 'Язык программирования' },
                        { id: 'c', text: 'База данных' },
                        { id: 'd', text: 'Операционная система' },
                    ],
                },
                {
                    id: 2,
                    text: 'Какой метод используется для создания реактивных данных?',
                    type: 'single',
                    options: [
                        { id: 'a', text: 'ref()' },
                        { id: 'b', text: 'create()' },
                        { id: 'c', text: 'make()' },
                        { id: 'd', text: 'build()' },
                    ],
                },
                {
                    id: 3,
                    text: 'Что такое Pinia?',
                    type: 'single',
                    options: [
                        { id: 'a', text: 'Библиотека для управления состоянием' },
                        { id: 'b', text: 'Плагин для роутинга' },
                        { id: 'c', text: 'Утилита для работы с датами' },
                        { id: 'd', text: 'Компонент Vuetify' },
                    ],
                },
                {
                    id: 4,
                    text: 'Какой компонент используется для бокового меню в Vuetify?',
                    type: 'single',
                    options: [
                        { id: 'a', text: 'v-navigation-drawer' },
                        { id: 'b', text: 'v-sidebar' },
                        { id: 'c', text: 'v-menu' },
                        { id: 'd', text: 'v-panel' },
                    ],
                },
                {
                    id: 5,
                    text: 'Сел медведь в машину',
                    type: 'single',
                    options: [
                        { id: 'a', text: 'и взлетел' },
                        { id: 'b', text: 'и уехал' },
                        { id: 'c', text: 'и уполз' },
                        { id: 'd', text: 'и сгорел' },
                    ],
                },
            ]

            status.value = 'active'

            return { success: true }
        } catch (error) {
            console.error('Ошибка старта теста:', error)
            return { success: false, error }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Сохранить ответ на вопрос
     * FIXME: Подключить API — отправка ответа на бэк
     */
    const saveAnswer = async (questionId, answer) => {
        try {
            // await api.post(`/tests/${testId.value}/answers`, {
            //   sessionId: sessionId.value,
            //   questionId,
            //   answer,
            // })

            // Сохраняем локально (для отображения в сетке)
            answers.value[questionId] = answer
        } catch (error) {
            console.error('Ошибка сохранения ответа:', error)
        }
    }

    /**
     * Перейти к следующему вопросу
     */
    const nextQuestion = () => {
        if (currentIndex.value < totalQuestions.value - 1) {
            currentIndex.value++
        }
    }

    /**
     * Перейти к предыдущему вопросу
     */
    const prevQuestion = () => {
        if (currentIndex.value > 0) {
            currentIndex.value--
        }
    }

    /**
     * Перейти к конкретному вопросу (клик по кружку в сетке)
     */
    const goToQuestion = (index) => {
        if (index >= 0 && index < totalQuestions.value) {
            currentIndex.value = index
        }
    }

    /**
     * Завершить тест и отправить все ответы
     * FIXME: Подключить API
     */
    const finishTest = async () => {
        isLoading.value = true
        try {
            // const response = await api.post(`/tests/${testId.value}/finish`, {
            //   sessionId: sessionId.value,
            // })
            // return response.data // { score, maxScore, passed }

            // Временный мок-результат
            await new Promise(resolve => setTimeout(resolve, 300))
            status.value = 'finished'

            // Сохраняем результат

            lastResult.value = {
                score: 18,
                maxScore: 20,
                passed: true,
            }
            return {
                score: 18,
                maxScore: 20,
                passed: true,
            }
        } catch (error) {
            console.error('Ошибка завершения теста:', error)
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Восстановить сессию после перезагрузки страницы
     * FIXME: Подключить API
     */
    const restoreSession = async () => {
        // const response = await api.get(`/tests/${testId.value}/session`)
        // ... восстановить состояние
        console.warn('Восстановление сессии пока не реализовано')
    }

    /**
     * Сбросить сессию (при уходе со страницы)
     */
    const resetSession = () => {
        sessionId.value = null
        testId.value = null
        testTitle.value = ''
        questions.value = []
        answers.value = {}
        currentIndex.value = 0
        timeLeft.value = 0
        status.value = 'idle'
        isLoading.value = false
    }

    return {
        // Состояние
        sessionId,
        testId,
        testTitle,
        questions,
        answers,
        currentIndex,
        timeLeft,
        status,
        isLoading,
        hasPrevQuestion,
        hasNextQuestion,
        lastResult,
        // Геттеры
        currentQuestion,
        totalQuestions,
        questionStatuses,

        // Действия
        startTest,
        saveAnswer,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        finishTest,
        restoreSession,
        resetSession,
    }
})