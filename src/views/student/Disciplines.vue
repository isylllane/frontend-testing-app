<template>
  <div>

    <v-row>
      <v-col
          v-for="discipline in studentStore.disciplines"
          :key="discipline.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-card
            hover
            @click="openDiscipline(discipline.id)"
            class="cursor-pointer"
        >
          <v-card-text class="pa-6">
            <v-icon
                icon="mdi-book-open-outline"
                size="32"
                color="primary"
                class="mb-3"
            />
            <h3 class="text-h6 font-weight-medium">
              {{ discipline.name }}
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert
        v-if="!studentStore.isLoading && studentStore.disciplines.length === 0"
        type="info"
        variant="tonal"
        class="mt-4"
    >
      Нет доступных дисциплин
    </v-alert>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useAppStore } from '@/stores/app'

const studentStore = useStudentStore()
const appStore = useAppStore()

const openDiscipline = (id) => {
  // Пока заглушка — позже можно сделать страницу дисциплины
  console.log('Открыть дисциплину:', id)
}

onMounted(async () => {
  appStore.setPageTitle('Дисциплины')
  appStore.setHeaderAction(null)
  await studentStore.fetchDisciplines()
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>