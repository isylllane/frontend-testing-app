<template>
  <v-app>
    <!-- Боковое меню -->
    <v-navigation-drawer
        width="258"
        permanent

    >
      <!-- Логотип -->
      <LogoHeader size="headline-small"/>
      <v-divider />

      <!-- Навигация -->
      <v-list
          density="compact"
          nav
          class="px-2"
      >
        <v-list-item
            v-for="item in userStore.menuItems"
            :key="item.to"
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.to"
            rounded="lg"
            color="primary"
            class="mb-1"
        />
      </v-list>
      <!-- Кнопка переключения темы -->
      <template v-slot:append>
        <div class="px-4 pb-4">
          <v-divider class="mb-4" />
          <v-btn
              variant="text"
              block
              :prepend-icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
          >
            {{ theme.global.current.value.dark ? 'Светлая тема' : 'Тёмная тема' }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Шапка + контент -->
    <v-app-bar
        elevation="0"
    >
      <v-app-bar-title class="text-headline-small font-weight-semibold">
        {{ route.meta.title || 'КОТ' }}
      </v-app-bar-title>

      <v-spacer />

      <!-- Слот для кнопки действия -->
      <slot name="action-button" />
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
import LogoHeader from "@/components/layout/LogoHeader.vue";
// Импорт функций
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTheme } from 'vuetify'


// Работа с маршрутами
const route = useRoute()
const userStore = useUserStore()

// FIXME Временно для теста — позже уберём
import { onMounted } from 'vue'
onMounted(() => {
  if (!userStore.isAuthenticated) {
    userStore.login(
        { id: 1, name: 'Иван', role: 'student' },
        'fake-token'
    )
  }
})

const theme = useTheme()

// Переключение темы
const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('app-theme', newTheme)
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