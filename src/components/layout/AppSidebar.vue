<template>
  <v-navigation-drawer
      width="258"
      permanent
  >
    <!-- Логотип -->
    <div class="text-center pt-4 pb-2">
      <v-avatar color="primary" size="48">
        <span class="text-h5 text-white">{{ getUserInitials() }}</span>
      </v-avatar>
      <div class="text-body-2 font-weight-medium mt-2">{{ userStore.user?.fullName }}</div>
      <div class="text-caption text-medium-emphasis">{{ getUserRoleText() }}</div>
    </div>
    <v-divider />

    <!-- Верхняя часть: контент из страницы -->
    <slot name="content" />

      <!-- Нижняя часть: футер из страницы -->
    <template v-slot:append v-if="$slots.footer">
      <div class="px-4 pb-4">
        <v-divider class="mb-4" />
        <slot name="footer" />
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script setup>
import LogoHeader from '@/components/layout/LogoHeader.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const getUserInitials = () => {
  const name = userStore.user?.fullName || ''
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const getUserRoleText = () => {
  const map = { student: 'Студент', teacher: 'Преподаватель', admin: 'Руководитель ОПОП' }
  return map[userStore.userRole] || ''
}
</script>