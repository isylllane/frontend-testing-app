/**
 * Форматирование даты в русский формат
 * @param {string} dateString — ISO дата
 * @returns {string} — "до 20.03.2026"
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU')
}

/**
 * Форматирование минут в часы и минуты
 * @param {number} minutes — количество минут
 * @returns {string} — "1 час 30 минут"
 */
export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours} час ${mins} минут`
    return `${mins} минут`
}

/**
 * Проверка, просрочена ли дата
 * @param {string} dateString — ISO дата
 * @returns {boolean}
 */
export const isExpired = (dateString) => {
    return new Date(dateString) < new Date()
}