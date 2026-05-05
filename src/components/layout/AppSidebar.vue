<template>
  <v-navigation-drawer
      width="258"
      permanent
  >
    <!-- Логотип -->
    <LogoHeader size="headline-medium" />
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
</script>