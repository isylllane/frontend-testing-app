// Центральный файл для HTTP-запросов
import axios from 'axios'

// Создаём экземпляр Axios с базовыми настройками
const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// ============================================
// ПЕРЕХВАТЧИК ЗАПРОСОВ (request interceptor)
// ============================================
// Срабатывает ПЕРЕД отправкой каждого запроса
// Нужен чтобы автоматически добавлять JWT токен в заголовки
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token')

        // Если токен есть — добавляем его в заголовок Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// ============================================
// ПЕРЕХВАТЧИК ОТВЕТОВ (response interceptor)
// ============================================
// Срабатывает ПОСЛЕ получения ответа от сервера
// Нужен чтобы обрабатывать ошибки (401, 500 и т.д.)
http.interceptors.response.use(
    // Если ответ успешный — просто возвращаем его
    (response) => response,
    // Если ответ с ошибкой — обрабатываем
    (error) => {
        if (error.response?.status === 401) {
            // FIXME: Разлогин при истечении токена
            localStorage.removeItem('auth-token')
            window.location.href = '/auth/login'
        }
        return Promise.reject(error)
    }
)

export default http