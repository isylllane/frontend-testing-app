<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <!-- Навигация -->
  <v-list
      density="compact"
      nav
      class="px-2 flex-grow-1"
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
</template>
