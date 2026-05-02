import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '../assets/styles/fonts.scss' // Локальные шрифты

const interFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#2196F3',
                    secondary: '#64B6F7',
                    accent: '#2162ff',
                    error: '#FF0000', //todo Согласовать цвет #FF5252
                    success: '#0FC015', //todo Согласовать цвет #4CAF50
                },
            },
        },
    }, defaults: {
        // Глобальное применение шрифта ко всем компонентам
        VTypography: {
            style: `font-family: ${interFontFamily}`,
        },
    },
    // Корневой шрифт приложения
    display: {
        fontFamily: interFontFamily,
    },
})