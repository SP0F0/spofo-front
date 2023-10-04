<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="main-container">
    <el-row :gutter="24">
      <el-col>
        <!-- 메인 이미지가 들어갈 위치 -->
        <img src="../assets/images/kakao_logo.png" />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col>
        <el-button class="login-btn" color="#DBE2EF" round @click="router.push({ name: 'login' })">
          시작하기
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
