import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
    // Страница входа
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/LoginPage.vue'),
    },
    // Основные страницы
    {
        path: '/',
        component: MainLayout,
        children: [
            // Главная — редирект по роли
            {
                path: '',
                name: 'Home',
                redirect: '/available-tests',
            },

            // Страницы студента
            {
                path: 'available-tests',
                name: 'AvailableTests',
                component: () => import('@/views/student/AvailableTests.vue'),
                meta: { title: 'Доступные тесты' },
            },
            {
                path: 'test/:id',
                name: 'TestDetail',
                component: () => import('@/views/student/TestDetail.vue'),
                meta: { title: 'Описание теста' },
            },
            {
                path: 'test/:id/run',
                name: 'TestRun',
                component: () => import('@/views/student/TestRun.vue'),
                meta: { title: 'Прохождение теста' },
            },
            {
                path: 'test/:id/result',
                name: 'TestResult',
                component: () => import('@/views/student/TestResult.vue'),
                meta: { title: 'Результат теста' },
            },
            {
                path: 'completed-tests',
                name: 'CompletedTests',
                component: () => import('@/views/student/CompletedTests.vue'),
                meta: { title: 'Пройденные тесты' },
            },
            {
                path: 'disciplines',
                name: 'Disciplines',
                component: () => import('@/views/student/Disciplines.vue'),
                meta: { title: 'Дисциплины' },
            },

            // Страницы преподавателя
            {
                path: 'results',
                name: 'Results',
                component: () => import('@/views/teacher/Results.vue'),
                meta: { title: 'Результаты' },
            },
            {
                path: 'funds',
                name: 'Funds',
                component: () => import('@/views/teacher/Funds.vue'),
                meta: { title: 'Созданные фонды' },
            },
            {
                path: 'assign-test',
                name: 'AssignTest',
                component: () => import('@/views/teacher/AssignTest.vue'),
                meta: { title: 'Назначить тест' },
            },
            {
                path: 'created-tests',
                name: 'CreatedTests',
                component: () => import('@/views/teacher/CreatedTests.vue'),
                meta: { title: 'Созданные тесты' },
            },
        ],
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// FIXME: Защита маршрутов (Navigation Guard) — добавить когда будет авторизация
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   if (to.path !== '/auth/login' && !userStore.isAuthenticated) {
//     next('/auth/login')
//   } else {
//     next()
//   }
// })

export default router