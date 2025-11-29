import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Wallet from "../views/Wallet.vue"
import Deals from "../views/Deals.vue"
import Shifts from "../views/Shifts.vue"
import Analytics from "../views/Analytics.vue"
import History from "../views/History.vue"

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
  },
  {
    path: "/deals",
    name: "Deals",
    component: Deals,
  },
  {
    path: "/shifts",
    name: "Shifts",
    component: Shifts,
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
