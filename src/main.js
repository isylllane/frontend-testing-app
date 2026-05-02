import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'
import '@/assets/styles/global.scss' // Глобальные стили

const app = createApp(App)

app.use(createPinia())
// Файл конфигурации маршрутов
app.use(router)
// Файл конфигурации vuetify
app.use(vuetify)

app.mount('#app')