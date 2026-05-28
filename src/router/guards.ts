import type { Router } from 'vue-router';
import { useUserStore } from '@/store/user';

/**
 * @description 注册全局路由守卫
 */
export function setupRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
      next({
        path: '/login/one-key',
        query: { redirect: to.fullPath },
      });
      return;
    }

    next();
  });
}
