<script setup lang="ts">
import { ref } from 'vue';
import { loginStore } from '@/stores/login-store';
import { useRouter, RouterView } from 'vue-router';
import type { DropdownInstance } from 'element-plus';

const useLoginStore = loginStore();
const router = useRouter();
const dropdown1 = ref<DropdownInstance>();

const logout = function () {
  useLoginStore.logout();
  router.push({ name: 'main' });
};

const portfolio = () => {
  alert('포트폴리오 메뉴 준비중입니다.');
};

const test = () => {
  alert('토글메뉴~');
};

function showClick() {
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
}
</script>

<template>
  <div style="margin: 15px">
    <el-button @click="showClick">show</el-button>
  </div>
  <el-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
    <span class="el-dropdown-link"> Dropdown List1 </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
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
      <el-avatar :size="50" :src="useLoginStore.getMember.imagePath" @click="test" />
    </el-col>
    <el-col :span="4" v-else class="txt-center">
      <el-link :underline="false" @click="router.push({ name: 'login' })">로그인</el-link>
    </el-col>
  </el-row>
  <RouterView />
</template>
