<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import portfolioService from '../components/services/portfolio-service';
</script>

<template>
  <div class="portfolio-create-selection txt-center">
    <div class="button-container">
      <el-row justify="center">
        <el-col :span="24">
          <el-button class="portfolio-create-selection-btn" color="#3F72AF" round>
            증권사 연동
          </el-button>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="24">
          <el-button class="portfolio-create-selection-btn" color="#3F72AF" round>
            직접 관리 포트폴리오
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style></style>
