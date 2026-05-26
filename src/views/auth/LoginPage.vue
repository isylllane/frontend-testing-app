<template>
  <v-app>
    <v-main class="app-layout">
      <v-container fluid class="fill-height">
        <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
        >
          {{ errorMessage }}
        </v-alert>
        <v-row class="d-flex justify-center align-center" style="height: 100vh;">
          <v-col cols="12" sm="8" md="8" lg="8" class="d-flex justify-center">
            <v-card class="elevation-12 rounded-lg pa-4" color="background" border="secondary thin" width="400">
              <v-card-text class="text-center pt-6">
                <!-- Логотип -->
                <LogoHeader size="headline-small" class="mb-2"/>
                <!-- Форма -->
                <v-form ref="loginForm" v-model="isValid" @submit.prevent="handleLogin">
                  <v-text-field
                      v-model="login"
                      label="Логин"
                      color="primary"
                      base-color="secondary"
                      prepend-inner-icon="mdi-account"
                      variant="outlined"
                      :rules="[v => !!v || 'Введите логин']"
                      required
                      class="mb-2"
                      density="comfortable"
                  ></v-text-field>

                  <v-text-field
                      v-model="password"
                      label="Пароль"
                      color="primary"
                      base-color="secondary"
                      prepend-inner-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      variant="outlined"
                      :rules="[
                      v => !!v || 'Введите пароль',
                      v => v.length >= 6 || 'Пароль должен быть не менее 6 символов'
                      ]"
                      @click:append-inner="showPassword = !showPassword"
                      required
                      class="mb-4"
                      density="comfortable"
                  >
                  </v-text-field>

                  <v-btn
                      type="submit"
                      color="primary"
                      size="large"
                      block
                      :loading="loading"
                      :disabled="!isValid"
                      class="text-none font-weight-bold"
                  >
                    Войти
                  </v-btn>
                </v-form>
              </v-card-text>


            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>


</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LogoHeader from '@/components/layout/LogoHeader.vue'

const router = useRouter()
const userStore = useUserStore()

const login = ref('')
const password = ref('')
const isValid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!isValid.value || loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await userStore.login(login.value, password.value)

    if (result.success) {
      router.push('/')
    } else {
      errorMessage.value = result.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:deep(.v-field .v-icon) {
  color: rgb(var(--v-theme-secondary));
}

:deep(.v-field--focused .v-icon) {
  color: rgb(var(--v-theme-primary));
}
.app-layout  {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>