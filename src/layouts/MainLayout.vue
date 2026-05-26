<template>
  <v-app>
    <!-- Боковое меню -->
    <AppSidebar>
      <template #content>
        <NavigationMenu v-if="appStore.sidebarMode === null" />

        <!-- Сетка вопросов (во время теста) -->
        <QuestionGrid
            v-else-if="appStore.sidebarMode === 'questions'"
            :question-statuses="appStore.sidebarData?.questionStatuses || []"
            :time-left="appStore.sidebarData?.timeLeft || 0"
            @select="appStore.sidebarData?.onQuestionSelect"
        />
      </template>
      <template #footer>
        <!-- Кнопка выхода -->
        <v-btn
            variant="text"
            block
            prepend-icon="mdi-logout"
            class="mb-2"
            @click="handleLogout"
        >
          Выйти
        </v-btn>
        <!-- Обычный футер: кнопка темы -->

        <template v-if="appStore.sidebarMode === null">
          <v-btn
              variant="text"
              block
              :prepend-icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
          >
            {{ theme.global.current.value.dark ? 'Светлая тема' : 'Тёмная тема' }}
          </v-btn>
        </template>

        <!-- Футер во время теста: таймер -->
        <template v-else-if="appStore.sidebarMode === 'questions'">
          <div class="text-center">
            <div class="text-caption text-medium-emphasis mb-1">
              Осталось:
            </div>
            <div class="text-h6 font-weight-bold text-primary">
              {{ appStore.sidebarData?.formattedTime || '0 минут' }}
            </div>
          </div>
        </template>
      </template>
    </AppSidebar>

    <!-- Шапка + контент -->
    <v-app-bar
        elevation="0"
    >
      <v-app-bar-title class="text-headline-small font-weight-semibold">
        {{ appStore.pageTitle }}
      </v-app-bar-title>

      <v-spacer />

      <!-- Слот для кнопки действия -->
      <template v-slot:append>
        <v-btn
            v-if="appStore.headerAction"
            color="primary"

            variant="elevated"
            min-width="220"
            class="text-title-large font-weight-bold mr-4 py-4 rounded-lg"
            @click="appStore.headerAction.onClick"
        >
          {{ appStore.headerAction.label }}
        </v-btn>
      </template>

    </v-app-bar>
    <!-- Основной контент -->
    <v-main>
      <div class="content-area">
        <div class="content-wrapper rounded-xl pa-8">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
// Импорт компонентов
import NavigationMenu from '@/components/layout/NavigationMenu.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import QuestionGrid from '@/components/test/QuestionGrid.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
// Импорт функций
import { useTheme } from 'vuetify'

// Импорт хранилища для шапки
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// Переключение темы
const theme = useTheme()

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('app-theme', newTheme)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/auth/login')
}
</script>

<style>
.content-area {
  background-color: rgb(var(--v-theme-surface));
  min-height: calc(100vh - 64px);
  padding: 0px 16px 0px  16px;
}

.content-wrapper {
  background-color: rgb(var(--v-theme-background));
  min-height: calc(100vh - 64px);
  border-radius: 12px;
}
</style>