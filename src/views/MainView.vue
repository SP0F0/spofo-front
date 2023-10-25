<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="main-container">
    <img class="first-box-bg" src="../assets/images/circular_bg.png" />
    <div class="first-box">
      <el-row class="main-first-text">
        누구나 쉽게 관리하는 주식 포트폴리오
      </el-row>
      <img src="../assets/images/logo.png" class="main-first-logo" />
      <el-row>
        <el-col>
          <el-button class="login-btn" color="#120064" round @click="router.push({ name: 'login' })">
            시작하기
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
