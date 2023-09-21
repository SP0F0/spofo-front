<script setup>
import { useRouter } from 'vue-router';

// ref란 vue에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성이다.

// const email = ref('');
const router = useRouter();

const login = function () {
  router.push({ name: 'login' });
};

// 서비스로 나누기
const callPortfolioServer = async () => {
  const portfolioService = (await import('../components/services/portfolio-service')).default;
  portfolioService.testCall();
};

const callStockServer = async () => {
  const stockService = (await import('../components/services/stock-service')).default;
  stockService.testCall();
};

const callAuthServer = async () => {
  const authService = (await import('../components/services/auth-service')).default;
  authService.testCall();
};
</script>

<template>
  <h1>메인화면 입니다</h1>
  <button @click="login">로그인페이지로 이동!</button> <br />
  <button @click="callPortfolioServer">포트폴리오 서버 호출</button> <br />
  <button @click="callStockServer">주식 서버 호출</button> <br />
  <button @click="callAuthServer">인증 서버 호출</button> <br />
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
