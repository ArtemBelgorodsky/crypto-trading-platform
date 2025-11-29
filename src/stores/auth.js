import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref(null);

  const login = (email, password) => {
    // Простая проверка для демонстрации
    if (email === 'trader@crypto.com' && password === 'securepass123') {
      isAuthenticated.value = true;
      user.value = { email };
      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: true, user: { email } })
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem('auth');
  };

  const checkAuth = () => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      isAuthenticated.value = parsed.isAuthenticated;
      user.value = parsed.user;
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
});
