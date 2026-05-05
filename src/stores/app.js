import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const pageTitle = ref('КОТ')
    const headerAction = ref(null) // кнопка в шапке

    const setPageTitle = (title) => {
        pageTitle.value = title
    }

    const setHeaderAction = (action) => {
        headerAction.value = action // { label: 'Начать', onClick: () => {} }
    }

    const resetHeader = () => {
        pageTitle.value = 'КОТ'
        headerAction.value = null
    }

    return {
        pageTitle,
        headerAction,
        setPageTitle,
        setHeaderAction,
        resetHeader,
    }
})