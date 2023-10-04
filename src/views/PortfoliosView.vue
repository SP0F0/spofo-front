<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import portfolioService from '../components/services/portfolio-service';
import { PortfoliosSummary } from '@/components/models/portfolios-summary';
import type { PortfolioSimple } from '@/components/models/portfolio-simple';
import { Plus, Setting } from '@element-plus/icons-vue';

const router = useRouter();
const portfolioSummary = ref<PortfoliosSummary>();
const portfolioSimples = ref<PortfolioSimple[]>();

const toggle = ref(true);
const filterOption = ref('전체');

onMounted(async () => {
  /*
  try {
    const response = await portfolioService.getPortfoliosTotal();
    portfolioSimples.value = response.data.data;

    console.log('포트폴리오 개요 가져오기');
    const totalAsset: number = response.data.totalAsset;
    const gain: number = response.data.gain;
    const gainRate: number = response.data.gainRate;
    const dailyGain: number = response.data.dailyGainRate;
  } catch (error: any) {
    // todo 화면 매핑 시키기
    console.log('포트폴리오 개요가 존재하지 않음 >> 포트폴리오 만들기 화면으로 이동하기!');
    router.push({ name: 'portfolioCreateSelection' });
  }

  // todo 포트폴리오 리스트 가져오기
  // 왼쪽 영역이 portfolios-summary, 오른쪽이 portfolio-simple의 리스트
  const response = await portfolioService.getPortfolioSimples();
  portfolioSimples.value = response.data.data;
   */
});

const viewPortfolio = (portfolioId: number) => {
  router.push({
    name: 'portfolio',
    query: { portfolioId: portfolioId }
  });
};

const changeFilterOption = () => {
  // API를 호출하여 회원 1명의 포트폴리오를 필터링하여 조회한다.
};
</script>

<template>
  <div class="portfolios-summary-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="23"></el-col>
              <el-col :span="1">
                <div class="text item">
                  <el-button type="info" circle link size="large">
                    <el-icon
                      size="30"
                      color="#000"
                      @click="router.push({ name: 'portfolioCreate' })"
                    >
                      <Plus />
                    </el-icon>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="card-body">
            <div class="card-body-header">
              <el-row>
                <el-col :span="24"><span class="f-small">총 자산</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="f-big"><strong>₩1000</strong></span>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="20">
                <span class="f-small">평가수익</span>
              </el-col>
              <el-col :span="4">
                <span class="f-small">₩1000</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <span class="f-small">수익률</span>
              </el-col>
              <el-col :span="4">
                <span class="f-small">10%</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <span class="f-small">일간 수익률</span>
              </el-col>
              <el-col :span="4">
                <span class="f-small">18%</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="23">
                <el-select
                  v-model="filterOption"
                  class="m-2"
                  placeholder="포트폴리오 구분"
                  size="large"
                  @change="changeFilterOption"
                >
                  <el-option key="전체" label="전체" value="전체" />
                  <el-option key="실제" label="실제" value="실제" />
                  <el-option key="모의" label="모의" value="모의" />
                  <el-option key="계좌 연동" label="계좌 연동" value="계좌 연동" />
                </el-select>
              </el-col>
              <el-col :span="1">
                <div class="text item">
                  <el-button type="info" circle link size="large">
                    <el-icon size="30" color="#000"><Setting /></el-icon>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="card-body">
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24">
                  <el-tag class="mx-1 tag color-black" effect="dark" color="#FFCC1D">실제</el-tag>
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="21">
                  <el-link :underline="false" @click="viewPortfolio(100)">
                    실제 포트폴리오
                  </el-link>
                </el-col>
                <el-col :span="3">
                  <el-switch
                    v-model="toggle"
                    style="--el-switch-on-color: #112d4e; --el-switch-off-color: #3f72af"
                  />
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24"><strong>₩780 (4.45%)</strong></el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
