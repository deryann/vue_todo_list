import { createRouter, createWebHashHistory } from 'vue-router'
import TodoList from '@/views/TodoList.vue'

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
