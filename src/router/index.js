import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
    // Страница входа
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/auth/Login.vue'),
            },
        ],
    },
    // Основные страницы (с меню и шапкой)
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                redirect: '/available-tests',
            },
            {
                path: 'available-tests',
                name: 'AvailableTests',
                component: () => import('@/views/student/AvailableTests.vue'),
                meta: { title: 'Доступные тесты' },
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
                path: 'results',
                name: 'Results',
                component: () => import('@/views/teacher/Results.vue'),
                meta: { title: 'Результаты' },
            },
            {
                path: 'created-tests',
                name: 'CreatedTests',
                component: () => import('@/views/teacher/CreatedTests.vue'),
                meta: { title: 'Созданные тесты' },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router