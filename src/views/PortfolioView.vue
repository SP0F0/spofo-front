<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import portfolioService from '@/components/services/portfolio-service';
import { Plus, Setting, Delete, EditPen } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { focusOn } from '@/components/common/utils';
import PortfolioModifyView from '@/views/PortfolioModifyView.vue';
import AddStockView from '@/views/AddStockView.vue';

const route = useRoute();
const portfolioId = parseInt(route.query.portfolioId as string, 10);
const stockCodeRef = ref('');
const portfolioModifyFormRef = ref<FormInstance>();

const portfolioStockFormRef = ref<FormInstance>();
const portfolioStockForm = ref({
  // 타입, 매수날짜, 매수수량, 매수
  type: '',
  price: '',
  tradeDate: 'KRW',
  quantity: 'REAL'
});

onMounted(async () => {
  // 포트폴리오 id를 가지고 포트폴리오 개요 조회
  // portfolioService.getPortfolioTotal(portfolioId);
  // 포트폴리오 id를 가지고 종목리스트 조회
  // portfolioService.getPortfolioStocks(portfolioId);
});

const modifyPopupVisible = ref(false);
const scaleInPopupVisible = ref(false);

const closeScaleInPopup = async (done: () => void) => {
  ElMessageBox.confirm('추가매수를 취소하시겠습니까?', '알림', {
    confirmButtonText: '취소할래요',
    cancelButtonText: '아니요'
  })
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const openPortfolioModifyPopup = (portfolioId: number) => {
  modifyPopupVisible.value = true;
  // 포트폴리오 1건 조회하여 수정 팝업에 보여주기
  // portfolioForm.value = portfolioService.getPortfolio(portfolioId);
};

const openScaleInPopup = (stockCode: string) => {
  stockCodeRef.value = stockCode;
  scaleInPopupVisible.value = true;
};

const scaleIn = () => {
  console.log('scaleIn');
};

const confirmDeletePortfolio = () => {
  ElMessageBox.confirm('포트폴리오를 삭제하시겠습니까?', '알림', {
    confirmButtonText: '삭제할래요',
    cancelButtonText: '아니요'
  })
    .then(() => {
      // 포트폴리오 서버의 삭제 API 호출~
    })
    .catch(() => {
      // catch error
    });
};

const confirmDeleteStock = (stockName: string) => {
  ElMessageBox.confirm(`${stockName} 종목을 삭제하시겠습니까?`, '알림', {
    confirmButtonText: '삭제할래요',
    cancelButtonText: '아니요'
  })
    .then(() => {
      // 포트폴리오 서버의 종목 삭제 API 호출~
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
  <div class="portfolio-summary-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="23"></el-col>
              <el-col :span="1">
                <div class="text item">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="30" color="#000">
                        <Setting />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :icon="EditPen" @click="openPortfolioModifyPopup">
                          수정
                        </el-dropdown-item>
                        <el-dropdown-item :icon="Delete" @click="confirmDeletePortfolio"
                          >삭제</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <PortfolioModifyView v-model="modifyPopupVisible" :portfolioId="portfolioId" />
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="card-body">
            <el-row align="middle">
              <el-col :span="20"><span class="f-big">SPOFO 포트폴리오</span></el-col>
              <el-col :span="4">
                <el-tag class="mx-1 tag color-black" effect="dark" color="#FFCC1D" size="large">
                  실제
                </el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-small"><strong>이 포트폴리오는 실제 포트폴리오입니다.</strong></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">총 자산</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big"><strong>₩3900</strong></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">총 매수 금액</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big"><strong>₩1500</strong></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">평가 수익</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big"><strong>₩590 (4.1%)</strong></span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="23" class="f-big">보유종목 </el-col>
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
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="4">
                  <el-avatar :size="45" />
                </el-col>
                <el-col :span="16"> 삼성전자 <span>기술주</span> </el-col>
                <el-col :span="4"> 수량 10 </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="20">
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 평가 금액 ₩780</el-col>
                    <el-col :span="12"> 평균 매수가 ₩1000</el-col>
                  </el-row>
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 현재 수익 ₩220</el-col>
                    <el-col :span="12"> 현재가 ₩1500(4.45%)</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="40"><MoreFilled /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :icon="Plus" @click="openScaleInPopup('1번 종목코드')"
                          >추가 매수</el-dropdown-item
                        >
                        <el-dropdown-item :icon="Delete" @click="confirmDeleteStock('삼성전자')"
                          >삭제</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="card-body">
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="4">
                  <el-avatar :size="60" />
                </el-col>
                <el-col :span="16"> 삼성전자 <span>우선주</span> </el-col>
                <el-col :span="4"> 수량 11 </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="20">
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 평가 금액 ₩7840</el-col>
                    <el-col :span="12"> 평균 매수가 ₩10040</el-col>
                  </el-row>
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 현재 수익 ₩2420</el-col>
                    <el-col :span="12"> 현재가 ₩1500(4.45%)</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="40"><MoreFilled /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :icon="Plus" @click="openScaleInPopup('2번 종목코드')"
                          >추가 매수</el-dropdown-item
                        >
                        <el-dropdown-item
                          :icon="Delete"
                          @click="confirmDeleteStock('삼성전자 우선주')"
                          >삭제</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <AddStockView
      v-if="scaleInPopupVisible"
      v-model="scaleInPopupVisible"
      :vars="{
        portfolioId: portfolioId,
        stockCode: stockCodeRef
      }"
    />
  </div>
</template>

<style scoped></style>
