import { createRouter, createWebHistory } from 'vue-router';
import loginService from '../components/services/login-service';

console.log(loginService);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/kakao',
      name: 'kakaoLogin',
      component: {},
      meta: { isLoginProcess: true, socialType: 'KAKAO' },
      beforeEnter: (to, from, next) => {
        loginService
          .doLoginProcess(to.meta.socialType as string, to.query.code as string)
          .then(() => next('/'))
          .catch((error) => console.log(error));
      }
    },
    {
      path: '/my/portfolios',
      name: 'portfolios',
      component: () => import('../views/Portfolios.vue')
    },
    {
      path: '/my/portfolio',
      name: 'portfolio',
      component: () => import('../views/Portfolio.vue')
    }
  ]
});

//router.beforeEach(function (to, from, next) {});

export default router;
