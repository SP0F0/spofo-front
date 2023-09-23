<script setup>
import { useRouter, RouterView } from 'vue-router';
import loginStore from './stores/login-store';

const useLoginStore = loginStore();
const router = useRouter();

const logout = function () {
  useLoginStore.logout();
  router.push({ name: 'main' });
};

const portfolio = () => {
  alert('포트폴리오 메뉴 준비중입니다.');
};
</script>

<template>
  <el-row :gutter="10" align="middle" class="header">
    <el-col :span="4">
      <div class="grid-content ep-bg-purple" />
      <img src="" alt="스포포 로고" @click="router.push({ name: 'main' })" />
    </el-col>
    <el-col :span="4" class="txt-center">
      <div class="grid-content ep-bg-purple-light" />
      <el-link :underline="false" @click="portfolio">포트폴리오</el-link>
    </el-col>
    <el-col :span="4" class="txt-center"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col :span="4" class="txt-center"><div class="grid-content ep-bg-purple-light" /> </el-col>
    <el-col :span="4" class="txt-center"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col class="txt-center" :span="4" v-if="useLoginStore.isAuthedMember">
      <span>{{ useLoginStore.getMember.name }}님 안녕하세요</span>
      <el-link :underline="false" @click="logout()">로그아웃</el-link>
    </el-col>
    <el-col :span="4" v-else class="txt-center">
      <el-link :underline="false" @click="router.push({ name: 'login' })">로그인</el-link>
    </el-col>
  </el-row>
  <RouterView />
</template>
