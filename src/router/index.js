import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Wallet from '../views/Wallet.vue';
import Deals from '../views/Deals.vue';
import Shifts from '../views/Shifts.vue';
import Analytics from '../views/Analytics.vue';
import History from '../views/History.vue';
import Login from '../views/Login.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
  },
  {
    path: '/deals',
    name: 'Deals',
    component: Deals,
  },
  {
    path: '/shifts',
    name: 'Shifts',
    component: Shifts,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.path !== '/login' && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
