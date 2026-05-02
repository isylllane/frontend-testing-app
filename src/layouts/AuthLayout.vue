<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row class="d-flex justify-center align-center" style="height: 100vh;">
          <v-col cols="12" sm="8" md="8" lg="8" class="d-flex justify-center">
            <v-card class="elevation-12 rounded-lg pa-4 " border="secondary thin" width="400">
              <v-card-text class="text-center pt-6">
                <!-- Логотип -->
                <div class="text-center mb-6">
                  <h1 class="text-h3 font-weight-black text-primary">КОТ</h1>
                </div>
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

const router = useRouter()
const login = ref('')
const password = ref('')
const isValid = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  if (!isValid.value || loading.value) return

  loading.value = true
  try {
    // FIXME Реализовать вход в приложение
    console.log('Вход:', login.value)
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/')
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
</style>