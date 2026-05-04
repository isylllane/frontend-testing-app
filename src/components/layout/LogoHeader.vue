<template>
  <div class="text-center py-4">
    <h2 :class="['font-weight-black text-primary', sizeClass]">
      КОТ
    </h2>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'headline-medium',
    validator: (v) => [
      'headline-large',
      'headline-medium',
      'headline-small',
      'title-large',
      'title-medium',
    ].includes(v),
  },
})

const sizeClass = computed(() => `text-${props.size}`)
</script>