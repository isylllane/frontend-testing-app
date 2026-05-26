import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// Безопасное декодирование JWT с поддержкой кириллицы (UTF-8)
const decodeJwt = (token) => {
    try {
        const base64 = token.split('.')[1]
        const binaryString = atob(base64)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
        }
        const json = new TextDecoder('utf-8').decode(bytes)
        return JSON.parse(json)
    } catch (e) {
        console.error('Ошибка декодирования JWT:', e)
        return null
    }
}

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('auth-token') || null)
    const isAuthenticated = ref(!!token.value)
    const isLoading = ref(false)

    const menuConfig = {
        student: [
            { title: 'Доступные тесты', icon: 'mdi-clipboard-text-outline', to: '/available-tests' },
            { title: 'Пройденные тесты', icon: 'mdi-clipboard-check-outline', to: '/completed-tests' },
            { title: 'Дисциплины', icon: 'mdi-book-open-outline', to: '/disciplines' },
        ],
        teacher: [
            { title: 'Созданные фонды', icon: 'mdi-folder-outline', to: '/funds' },
            { title: 'Назначить тест', icon: 'mdi-account-check-outline', to: '/assign-test' },
            { title: 'Результаты', icon: 'mdi-chart-bar', to: '/results' },
            { title: 'Созданные тесты', icon: 'mdi-file-document-edit-outline', to: '/created-tests' },
        ],
        admin: [
            { title: 'Созданные фонды', icon: 'mdi-folder-outline', to: '/funds' },
            { title: 'Назначить тест', icon: 'mdi-account-check-outline', to: '/assign-test' },
            { title: 'Результаты', icon: 'mdi-chart-bar', to: '/results' },
            { title: 'Созданные тесты', icon: 'mdi-file-document-edit-outline', to: '/created-tests' },
        ],
    }

    const roleMap = {
        'STUDENT': 'student',
        'TEACHER': 'teacher',
        'HEAD_OPOP': 'admin',
    }

    const userRole = computed(() => {
        if (!user.value) return null
        return roleMap[user.value.role] || null
    })

    const menuItems = computed(() => {
        if (!userRole.value) return []
        return menuConfig[userRole.value] || []
    })

    const login = async (email, password) => {
        isLoading.value = true
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/login`,
                { email, password }
            )

            const jwt = response.data.token
            localStorage.setItem('auth-token', jwt)
            token.value = jwt

            const payload = decodeJwt(jwt)
            if (!payload) {
                return { success: false, message: 'Ошибка обработки ответа сервера' }
            }

            user.value = {
                id: payload.id,
                email: payload.email,
                role: payload.role,
                fullName: payload.fullName,
            }

            isAuthenticated.value = true
            return { success: true }
        } catch (error) {
            console.error('Ошибка входа:', error)
            return {
                success: false,
                message: error.response?.data?.message || 'Ошибка входа',
            }
        } finally {
            isLoading.value = false
        }
    }

    const checkAuth = async () => {
        if (!token.value) return { success: false }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/user/auth`,
                { headers: { Authorization: `Bearer ${token.value}` } }
            )

            const jwt = response.data.token
            localStorage.setItem('auth-token', jwt)
            token.value = jwt

            const payload = decodeJwt(jwt)
            if (!payload) {
                logout()
                return { success: false }
            }

            user.value = {
                id: payload.id,
                email: payload.email,
                role: payload.role,
                fullName: payload.fullName,
            }

            isAuthenticated.value = true
            return { success: true }
        } catch (error) {
            console.error('Ошибка проверки токена:', error)
            logout()
            return { success: false }
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        isAuthenticated.value = false
        localStorage.removeItem('auth-token')
    }

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        userRole,
        menuItems,
        login,
        checkAuth,
        logout,
    }
})