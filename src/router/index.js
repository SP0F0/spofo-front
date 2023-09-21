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
          .doLoginProcess(to.meta.socialType, to.query.code)
          .then(() => next('/'))
          .catch((error) => console.log(error));
      }
    }
  ]
});

//router.beforeEach(function (to, from, next) {});

export default router;
