<script setup lang="ts">
import { ref } from 'vue';
import { loginStore } from '@/stores/login-store';
import { useRouter, RouterView } from 'vue-router';
import type { DropdownInstance } from 'element-plus';

const useLoginStore = loginStore();
const router = useRouter();
const memberDropdown = ref<DropdownInstance>();

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
  if (!memberDropdown.value) return;
  memberDropdown.value.handleOpen();
}
</script>

<template>
  <el-row :gutter="10" align="middle" class="header">
    <el-col :span="4">
      <div class="grid-content ep-bg-purple" />
      <img src="" alt="스포포 로고" @click="router.push({ name: 'main' })" />
    </el-col>
    <el-col :span="4" class="header-content">
      <div class="grid-content ep-bg-purple-light" />
      <el-link :underline="false" @click="portfolio">포트폴리오</el-link>
    </el-col>
    <el-col :span="4" class="header-content"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col :span="4" class="header-content"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col :span="4" class="header-content"><div class="grid-content ep-bg-purple" /> </el-col>
    <el-col class="header-content" :span="4" v-if="useLoginStore.isAuthedMember">
      <el-dropdown ref="memberDropdown" trigger="contextmenu" size="large">
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="useLoginStore.getMember.imagePath" @click="showClick" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item divided>
              <el-link :underline="false" @click="logout">로그아웃</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col :span="4" v-else class="txt-center">
      <el-link :underline="false" @click="router.push({ name: 'login' })">로그인</el-link>
    </el-col>
  </el-row>
  <RouterView />
</template>
