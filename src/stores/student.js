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
            const response = await studentService.getAvailableTests()
            availableTests.value = response.data
        } catch (error) {
            console.error('Ошибка загрузки тестов:', error)
        } finally {
            isLoading.value = false
        }
    }
    const disciplines = ref([])

    const fetchDisciplines = async () => {
        isLoading.value = true
        try {
            const response = await studentService.getDisciplines()
            disciplines.value = response.data
        } catch (error) {
            console.error('Ошибка загрузки дисциплин:', error)
        } finally {
            isLoading.value = false
        }
    }
    // Получить детали теста
    const fetchTestDetail = async (testId) => {
        isLoading.value = true
        try {
            const response = await studentService.getTestDetail(testId)
            currentTest.value = response.data
        } catch (error) {
            console.error('Ошибка загрузки теста:', error)
        } finally {
            isLoading.value = false
        }
    }

    const completedTests = ref([])

    const fetchCompletedTests = async () => {
        isLoading.value = true
        try {
            // FIXME: Подключить реальный API когда будут попытки в базе
            // const response = await studentService.getCompletedTests()
            // completedTests.value = response.data

            // Временные мок-данные
            await new Promise((resolve) => setTimeout(resolve, 500))
            completedTests.value = [
                {
                    id: 1,
                    attemptId: 1,
                    title: 'Тестирование компетенций',
                    score: 8,
                    maxScore: 10,
                    passingScore: 7,
                    isPassed: true,
                    completedAt: '2026-03-15',
                },
                {
                    id: 2,
                    attemptId: 2,
                    title: 'Тест3',
                    score: 5,
                    maxScore: 10,
                    passingScore: 7,
                    isPassed: false,
                    completedAt: '2026-03-10',
                },
            ]
        } catch (error) {
            console.error('Ошибка загрузки пройденных тестов:', error)
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
        completedTests,
        disciplines,
        fetchCompletedTests,
        fetchDisciplines,
    }
})