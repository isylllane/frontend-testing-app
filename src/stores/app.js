import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    // =====================
    // СОСТОЯНИЕ
    // =====================

    const pageTitle = ref('КОТ')
    const headerAction = ref(null)

    // Режим бокового меню:
    // null = обычное меню (NavigationMenu)
    // 'questions' = сетка вопросов (QuestionGrid)
    const sidebarMode = ref(null)

    // Данные для бокового меню (зависят от режима)
    const sidebarData = ref(null)

    // =====================
    // ДЕЙСТВИЯ
    // =====================

    const setPageTitle = (title) => {
        pageTitle.value = title
    }

    const setHeaderAction = (action) => {
        headerAction.value = action
    }

    /**
     * Установить режим бокового меню
     * @param {string|null} mode — null | 'questions'
     * @param {any} data — данные для меню (вопросы, таймер и т.д.)
     */
    const setSidebar = (mode, data = null) => {
        sidebarMode.value = mode
        sidebarData.value = data
    }

    const resetHeader = () => {
        pageTitle.value = 'КОТ'
        headerAction.value = null
    }

    const resetSidebar = () => {
        sidebarMode.value = null
        sidebarData.value = null
    }

    // =====================
    // ВОЗВРАЩАЕМ НАРУЖУ
    // =====================

    return {
        pageTitle,
        headerAction,
        sidebarMode,
        sidebarData,
        setPageTitle,
        setHeaderAction,
        setSidebar,
        resetHeader,
        resetSidebar,
    }
})