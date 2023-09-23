<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="main-container">
    <el-row :gutter="24">
      <el-col>
        <img src="../assets/images/kakao_logo.png" />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col>
        <el-button class="login-btn" color="#DBE2EF" round @click="router.push({ name: 'login' })">
          로그인
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
