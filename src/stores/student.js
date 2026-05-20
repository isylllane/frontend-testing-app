import { defineStore } from 'pinia'
import { ref } from 'vue'
import { studentService } from '@/api/student.service'

export const useStudentStore = defineStore('student', () => {
    // Состояние
    const availableTests = ref([])
    const currentTest = ref(null)
    const isLoading = ref(false)

    // FIXME: Раскомментировать когда будет API
    // Получить доступные тесты
    const fetchAvailableTests = async () => {
        isLoading.value = true
        try {
            // const response = await studentService.getAvailableTests()
            // availableTests.value = response.data

            // Временные мок-данные
            await new Promise((resolve) => setTimeout(resolve, 500))
            availableTests.value = [
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
            isLoading.value = false
        }
    }

    // Получить детали теста
    const fetchTestDetail = async (testId) => {
        isLoading.value = true
        try {
            // const response = await studentService.getTestDetail(testId)
            // currentTest.value = response.data

            // Временные мок-данные
            await new Promise((resolve) => setTimeout(resolve, 300))
            currentTest.value = {
                id: testId,
                title: 'Тест1 для самопроверки',
                usedAttempts: 0,
                maxAttempts: 2,
                deadline: '2026-03-20',
                questionCount: 20,
                durationMinutes: 20,
                passingScore: 15,
                maxScore: 20,
                description:
                    'Тут очень длинное описание теста чтобы можно было прочитать и понять всякое. В этом тесте проверяются знания по основным темам курса, включая теоретические вопросы и практические задания.',
                discipline: 'Системы и технологии проектирования информационных систем',
                type: 'self-check',
            }
        } catch (error) {
            console.error('Ошибка загрузки теста:', error)
        } finally {
            isLoading.value = false
        }
    }

    return {
        availableTests,
        currentTest,
        isLoading,
        fetchAvailableTests,
        fetchTestDetail,
    }
})