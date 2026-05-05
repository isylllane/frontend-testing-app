// Сервис для работы с API студента
// Содержит все методы, которые студент может вызвать на бэкенде
import http from './index'

// FIXME: Подключить реальные эндпоинты
export const studentService = {
    /**
     * Получить список доступных тестов для текущего студента
     * GET /student/tests/available
     * @returns {Promise} — массив тестов { id, title, score, maxScore, ... }
     */
    getAvailableTests() {
        return http.get('/student/tests/available')
    },

    /**
     * Получить подробную информацию о конкретном тесте
     * GET /student/tests/:testId
     * @param {number} testId — ID теста
     * @returns {Promise} — объект теста с описанием, сроками, попытками
     */
    getTestDetail(testId) {
        return http.get(`/student/tests/${testId}`)
    },

    /**
     * Получить список пройденных тестов
     * GET /student/tests/completed
     * @returns {Promise} — массив пройденных тестов с результатами
     */
    getCompletedTests() {
        return http.get('/student/tests/completed')
    },

    /**
     * Получить список дисциплин студента
     * GET /student/disciplines
     * @returns {Promise} — массив дисциплин
     */
    getDisciplines() {
        return http.get('/student/disciplines')
    },

    /**
     * Начать прохождение теста
     * POST /student/tests/:testId/start
     * @param {number} testId — ID теста
     * @returns {Promise} — данные для начала теста (вопросы, время)
     */
    startTest(testId) {
        return http.post(`/student/tests/${testId}/start`)
    },

    /**
     * Отправить ответ на вопрос
     * POST /student/tests/:testId/questions/:questionId/answer
     * @param {number} testId — ID теста
     * @param {number} questionId — ID вопроса
     * @param {object} answer — ответ студента { selectedAnswers: [], text: '' }
     */
    submitAnswer(testId, questionId, answer) {
        return http.post(`/student/tests/${testId}/questions/${questionId}/answer`, answer)
    },

    /**
     * Завершить тест и получить результат
     * POST /student/tests/:testId/finish
     * @param {number} testId — ID теста
     * @returns {Promise} — результат теста { score, maxScore, passed }
     */
    finishTest(testId) {
        return http.post(`/student/tests/${testId}/finish`)
    },
}