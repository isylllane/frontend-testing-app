import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // Настройка сервера разработки
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
      // Принудительное обновление при изменении
      protocol: 'ws',
      host: 'localhost',
    },
    watch: {
      // Следить за изменениями в компонентах
      usePolling: true,
      interval: 100,
    },
    optimizeDeps: {
      // Предзагрузка зависимостей
      include: ['vuetify', 'vue-router'],
    }
  },
// Настройка сборки
  build: {
// Выходная папка относительно корня проекта
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true
  },
  // Алиасы для удобных импортов
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue({
    script: {
      defineModel: true,
    },
    template: {
      compilerOptions: {
        hoistStatic: false,
      }
    }
  })],
})
