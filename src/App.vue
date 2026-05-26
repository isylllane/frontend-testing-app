<template>
  <router-view />
</template>

<script setup>
import {onMounted, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useUserStore} from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

onMounted(async () => {
  // Пытаемся восстановить сессию
  if (userStore.token) {
    await userStore.checkAuth()
  }

  // Редирект на страницу входа, если не авторизован
  if (!userStore.isAuthenticated && route.path !== '/auth/login') {
    router.push('/auth/login')
  }
})

// Редирект по роли после входа
watch(() => userStore.isAuthenticated, (newVal) => {
  if (newVal && route.path === '/') {
    if (userStore.userRole === 'teacher' || userStore.userRole === 'admin') {
      router.push('/results')
    } else {
      router.push('/available-tests')
    }
  }
})
</script>