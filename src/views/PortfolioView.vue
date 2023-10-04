<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Plus, Setting, Delete, EditPen } from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import PortfolioModifyView from '@/views/PortfolioModifyView.vue';
import AddStockView from '@/views/AddStockView.vue';
import portfolioService from '@/components/services/portfolio-service';
import { PortfolioSummary } from '@/components/models/portfolio-summary';
import { PortfolioStock } from '@/components/models/portfolio-stock';
import PortfolioTag from '@/components/common/PortfolioTag.vue';

const route = useRoute();
const router = useRouter();
const portfolioId = parseInt(route.query.portfolioId as string, 10);
const stockCodeRef = ref('');
const modifyPopupVisible = ref(false);
const scaleInPopupVisible = ref(false);
const portfolioSummary = ref(new PortfolioSummary());
const portfolioStocks = ref<PortfolioStock[]>();

/*
const portfolioModifyFormRef = ref<FormInstance>();

const portfolioStockFormRef = ref<FormInstance>();
const portfolioStockForm = ref({
  // 타입, 매수날짜, 매수수량, 매수
  type: '',
  price: '',
  tradeDate: 'KRW',
  quantity: 'REAL'
});
 */

onMounted(async () => {
  // 포트폴리오 id를 가지고 포트폴리오 개요 조회
  // 포트폴리오 id를 가지고 종목리스트 조회
  try {
    /*
    // 여기서 포트폴리오 개요, 종목 리스트 매핑하기
    const response = await portfolioService.getPortfolioTotal(portfolioId);
    portfolioSummary.value = response.data;
     */
    getPortfolioStocks();

    portfolioSummary.value = {
      name: '포트폴리오 이름입니다.',
      detail: '포트폴리오 설명입니다.',
      totalAsset: 10000,
      totalBuy: 9000,
      gain: 1000,
      gainRate: 10,
      tag: 'REAL'
    };
  } catch (error) {
    ElNotification({
      title: '에러',
      message: '포트폴리오 조회에 실패했습니다.',
      position: 'bottom-left',
      type: 'error'
    });
  }
});

const getPortfolioStocks = async () => {
  //const response = await portfolioService.getPortfolioStocks(portfolioId);
  //portfolioStocks.value = response.data;

  portfolioStocks.value = [
    {
      id: 1,
      code: 'CODE1',
      name: '삼성전자',
      sector: '기술주',
      totalAsset: 10000,
      gain: 900,
      gainRate: 9.17,
      avgPrice: 100,
      currentPrice: 20000,
      quantity: 50,
      imagePath: 'https://images.therich.io/images/logo/kr/005935.png'
    },
    {
      id: 2,
      code: 'CODE2',
      name: '하이닉스',
      sector: '반도체',
      totalAsset: 180000,
      gain: 9004,
      gainRate: 19.17,
      avgPrice: 1500,
      currentPrice: 2025000,
      quantity: 5055,
      imagePath: 'https://images.therich.io/images/logo/kr/000660.png'
    },
    {
      id: 1,
      code: 'CODE3',
      name: '현대오토에버',
      sector: 'IT',
      totalAsset: 1230000,
      gain: 904,
      gainRate: 9.7,
      avgPrice: 1020,
      currentPrice: 240000,
      quantity: 504,
      imagePath: 'https://images.therich.io/images/logo/kr/307950.png'
    }
  ];
};

/*
const closeScaleInPopup = async (done: () => void) => {
  ElMessageBox.confirm('추가매수를 취소하시겠습니까?', '알림', {
    confirmButtonText: '취소할래요',
    cancelButtonText: '아니요'
  }).then(() => {
    done();
  });
};

const scaleIn = () => {
  console.log('scaleIn');
};
const openPortfolioModifyPopup = (portfolioId: number) => {
  modifyPopupVisible.value = true;
  // 포트폴리오 1건 조회하여 수정 팝업에 보여주기
  // portfolioForm.value = portfolioService.getPortfolio(portfolioId);
};
 */

const openScaleInPopup = (stockCode: string) => {
  stockCodeRef.value = stockCode;
  scaleInPopupVisible.value = true;
};

const confirmDeletePortfolio = () => {
  ElMessageBox.confirm('포트폴리오를 삭제하시겠습니까?', '알림', {
    confirmButtonText: '삭제할래요',
    cancelButtonText: '아니요'
  }).then(() => {
    portfolioService
      .deletePortfolio(portfolioId)
      .then(() => {
        ElNotification({
          title: '성공',
          message: '포트폴리오를 삭제하였습니다.',
          position: 'bottom-left',
          type: 'success'
        });

        router.push({ name: 'portfolios' });
      })
      .catch(() => {
        // catch error
        ElNotification({
          title: '에러',
          message: '포트폴리오 삭제에 실패했습니다.',
          position: 'bottom-left',
          type: 'error'
        });
      });
  });
};

const confirmDeleteStock = (stockId: number, stockName: string) => {
  ElMessageBox.confirm(`${stockName} 종목을 삭제하시겠습니까?`, '알림', {
    confirmButtonText: '삭제할래요',
    cancelButtonText: '아니요'
  }).then(() => {
    portfolioService
      .deleteStock(portfolioId, stockId)
      .then(() => {
        ElNotification({
          title: '성공',
          message: `${stockName} 종목을 삭제하였습니다.`,
          position: 'bottom-left',
          type: 'success'
        });

        getPortfolioStocks();
      })
      .catch(() => {
        // catch error
        ElNotification({
          title: '에러',
          message: `${stockName} 종목을 삭제에 실패하였습니다.`,
          position: 'bottom-left',
          type: 'error'
        });
      });
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
                        <el-dropdown-item :icon="EditPen" @click="modifyPopupVisible = true">
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
              <el-col :span="20"
                ><span class="f-big">{{ portfolioSummary.name }}</span></el-col
              >
              <el-col :span="4">
                <PortfolioTag v-if="portfolioSummary.tag" :tag="portfolioSummary.tag" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-small">
                  <strong>{{ portfolioSummary.detail }}</strong>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">총 자산</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big">
                  <strong>₩{{ portfolioSummary.totalAsset }}</strong>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">총 매수 금액</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big">
                  <strong>₩{{ portfolioSummary.totalBuy }}</strong>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="f-small">평가 수익</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="f-big">
                  <strong>₩{{ portfolioSummary.gain }} ({{ portfolioSummary.gainRate }}%)</strong>
                </span>
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
                    <el-icon
                      size="30"
                      color="#000"
                      @click="
                        router.push({
                          name: 'portfolioStockCreate',
                          query: { portfolioId: portfolioId }
                        })
                      "
                      ><Plus
                    /></el-icon>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="card-body" v-for="stock in portfolioStocks" :key="stock.id">
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="4">
                  <el-avatar :size="60" :src="stock.imagePath" />
                </el-col>
                <el-col :span="14"> {{ stock.name }} </el-col>
                <el-col :span="6"> 수량 {{ stock.quantity }} </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="20">
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 평가 금액 ₩{{ stock.totalAsset }}</el-col>
                    <el-col :span="12"> 평균 매수가 ₩{{ stock.avgPrice }}</el-col>
                  </el-row>
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 현재 수익 ₩{{ stock.gain }}</el-col>
                    <el-col :span="12">
                      현재가 ₩{{ stock.currentPrice }}({{ stock.gainRate }}%)
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="40"><MoreFilled /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          :icon="Plus"
                          @click="openScaleInPopup(stock.code as string)"
                          >추가 매수</el-dropdown-item
                        >
                        <el-dropdown-item
                          :icon="Delete"
                          @click="confirmDeleteStock(stock.id as number, stock.name as string)"
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
