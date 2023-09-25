<script setup lang="ts">
import { ref } from 'vue';
import portfolioService from '@/components/services/portfolio-service';

const portfolioForm = ref({
  name: '',
  description: '',
  currency: 'KRW',
  type: 'REAL'
});

function createPortfolio() {
  portfolioService
    .createPortfolio(portfolioForm.value)
    .then((response) => response.data.portfolioId)
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="portfolio-create-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card" shadow="never">
          <div class="card-header">포트폴리오 신규 추가</div>
          <div class="card-body">
            <el-form ref="formRef" :model="portfolioForm" label-width="auto">
              <el-form-item label="포트폴리오 이름" prop="name">
                <el-input v-model="portfolioForm.name" />
              </el-form-item>
              <el-form-item label="포트폴리오 설명" prop="description">
                <el-input v-model="portfolioForm.description" type="textarea" />
              </el-form-item>
              <el-form-item label="기준통화" prop="currency">
                <el-radio-group v-model="portfolioForm.currency" text-color="#FFF" fill="#3F72AF">
                  <el-radio-button class="radio-btn" label="KRW">
                    대한민국 원 (KRW)
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="분류" prop="type">
                <el-radio-group v-model="portfolioForm.type" text-color="#FFF" fill="#FFCC1D">
                  <el-radio-button class="radio-btn" label="REAL">실제 포트폴리오</el-radio-button>
                  <el-radio-button class="radio-btn" label="FAKE">모의 포트폴리오</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="button-container">
                <el-button
                  color="#112D4E"
                  round
                  @click="createPortfolio"
                  :disabled="portfolioForm.name.trim() === '' ? true : false"
                >
                  생성하기
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
