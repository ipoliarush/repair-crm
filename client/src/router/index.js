import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"

const routes = [
  { path: "/login", component: Login },
  { path: "/orders", component: () => import("../views/Orders.vue") }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (to.path !== "/login" && !token) {
    return next("/login")
  }

  next()
})

export default router