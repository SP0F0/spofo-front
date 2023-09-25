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
                    <el-icon size="30" color="#000"><Plus /></el-icon>
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
                <el-select class="m-2" placeholder="포트폴리오 구분" size="big">
                  <el-option label="전체" value="전체" />
                  <el-option label="실제" value="실제" />
                  <el-option label="모의" value="모의" />
                  <el-option label="계좌 연동" value="계좌 연동" />
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
                <el-col :span="21"> 실제 포트폴리오 </el-col>
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
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24">
                  <el-tag class="mx-1 tag color-white" effect="dark" color="#35A29F">모의</el-tag>
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="21"> 모의 포트폴리오 </el-col>
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
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24">
                  <el-tag class="mx-1 tag color-white" effect="dark" color="#FF6E31">
                    계좌 연동
                  </el-tag>
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="21"> 원준의 포트폴리오 </el-col>
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
