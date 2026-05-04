import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    // Состояние
    const user = ref(null)       // { id, name, role }
    const token = ref(null)
    const isAuthenticated = ref(false)

    // Пункты меню для каждой роли
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

    // Геттеры (computed)
    const userRole = computed(() => user.value?.role || null)

    const menuItems = computed(() => {
        if (!userRole.value) return []
        return menuConfig[userRole.value] || []
    })

    // Действия
    const login = (userData, authToken) => {
        user.value = userData
        token.value = authToken
        isAuthenticated.value = true
    }

    const logout = () => {
        user.value = null
        token.value = null
        isAuthenticated.value = false
    }

    return {
        user,
        token,
        isAuthenticated,
        userRole,
        menuItems,
        login,
        logout,
    }
})