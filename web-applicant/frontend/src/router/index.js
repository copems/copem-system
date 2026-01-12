import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { bpamRoutes } from '@/module/BPAM/routes'

// Merge auto-generated routes with module routes
const allRoutes = [
  ...setupLayouts(routes),
  ...bpamRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes,
})

export default router
