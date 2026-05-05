<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// FIXME: Убрать, когда будет реальная авторизация
// Временный мок — автоматический вход как студент
onMounted(() => {
  if (!userStore.isAuthenticated) {
    userStore.login(
        { id: 1, name: 'Иван', role: 'student' },
        'fake-token'
    )
  }
})
</script>