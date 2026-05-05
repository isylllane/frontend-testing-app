import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '../assets/styles/fonts.scss' // Локальные шрифты
import {ru} from 'vuetify/locale' // Подключение русского языка
// Шрифты
const interFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

//  Получаем тему из localStorage
const savedTheme = localStorage.getItem('app-theme') || 'light'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
    theme: {
        defaultTheme: savedTheme,
        themes: {
            light: {
                colors: {
                    primary: '#2196F3',
                    secondary: '#64B6F7',
                    accent: '#2162ff',
                    error: '#FF5252', //todo Согласовать цвет #FF0000
                    success: '#4CAF50', //todo Согласовать цвет #0FC015
                    background: '#FFFFFF',          // фон контента
                    surface: '#F7F8FD',
                },
            },
            dark: {
                colors: {
                    primary: '#2196F3',
                    secondary: '#64B6F7',
                    accent: '#2162ff',
                    error: '#FF0000',
                    success: '#0FC015',
                    background: '#1E1E2E',
                    surface: '#1A1A2E',
                },
            },
        },
    }, defaults: {
        // Глобальное применение шрифта ко всем компонентам
        VTypography: {
            style: `font-family: ${interFontFamily}`,
        },
        // Цвет пунктов меню
        VNavigationDrawer: {
            color: 'surface',
        },
        // Цвет шапки
        VAppBar: {
            color: 'surface',
        },
        // Цвет фона контента
        VMain: {
            style: 'background-color: rgb(var(--v-theme-background))',
        },
    },
    // Корневой шрифт приложения
    display: {
        fontFamily: interFontFamily,
    },
    // Подключить русский язык
    locale: {
        current: 'ru',
        locale: 'ru',
        messages: { ru },
        fallback: 'ru'
    }
})