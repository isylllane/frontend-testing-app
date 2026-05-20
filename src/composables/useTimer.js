// Composable для живого таймера обратного отсчёта
// Используется на странице прохождения теста
import { ref, computed, onUnmounted } from 'vue'

/**
 * @param {number} initialSeconds — начальное время в секундах
 * @param {Function} onTimeUp — колбэк, когда время вышло (автосдача)
 * @returns {{ timeLeft, formattedTime, startTimer, stopTimer }}
 */
export const useTimer = (onTimeUp) => {

    const timeLeft = ref(0)
    let intervalId = null

    /**
     * Запустить таймер
     * Каждую секунду уменьшает timeLeft на 1
     */
    const startTimer = (initialSeconds) => {
        if (intervalId) clearInterval(intervalId)

        timeLeft.value = initialSeconds

        intervalId = setInterval(() => {
            if (timeLeft.value <= 0) {
                clearInterval(intervalId)
                timeLeft.value = 0
                onTimeUp?.()
                return
            }
            timeLeft.value--
        }, 1000)
    }

    /**
     * Остановить таймер (при сдаче или уходе со страницы)
     */
    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    /**
     * Форматированное время для отображения
     * 5400 → "1 час 30 минут"
     * 1500 → "25 минут"
     */
    const formattedTime = computed(() => {
        const total = timeLeft.value
        const hours = Math.floor(total / 3600)
        const minutes = Math.floor((total % 3600) / 60)
        const seconds = total % 60

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }
        return `${minutes}:${String(seconds).padStart(2, '0')}`
    })

    // При уничтожении компонента — очищаем таймер
    onUnmounted(stopTimer)

    return {
        timeLeft,      // реактивное число секунд
        formattedTime, // computed строка "43 минуты"
        startTimer,    // запустить
        stopTimer,     // остановить
    }
}