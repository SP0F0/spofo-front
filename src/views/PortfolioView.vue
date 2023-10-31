<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Plus, Setting, Delete, EditPen } from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import PortfolioModifyView from '@/views/PortfolioModifyView.vue';
import AddStockView from '@/views/AddStockView.vue';
import portfolioService from '@/components/services/portfolio-service';
import { PortfolioSummary } from '@/components/models/portfolio-summary';
import { PortfolioStock } from '@/components/models/portfolio-stock';
import PortfolioTag from '@/components/common/PortfolioTag.vue';
import dayjs from "dayjs";

const route = useRoute();
const router = useRouter();
const portfolioId = parseInt(route.query.portfolioId as string, 10);
const stockCodeRef = ref('');
const stockIdRef = ref(0);
const modifyPopupVisible = ref(false);
const scaleInPopupVisible = ref(false);
const portfolioSummary = ref(new PortfolioSummary());
const portfolioStocks = ref<PortfolioStock[]>();

onMounted(async () => {
  try {
    getPortfolioTotal();
    getPortfolioStocks();
  } catch (error) {
    ElNotification({
      title: '에러',
      message: '포트폴리오 조회에 실패했습니다.',
      position: 'bottom-left',
      type: 'error'
    });
  }
});

const getPortfolioTotal = () => {
  portfolioService
    .getPortfolioTotal(portfolioId)
    .then((response) => (portfolioSummary.value = response.data))
    .catch((error) => {
      console.log(error);
    });
};

const getPortfolioStocks = () => {
  portfolioService
    .getPortfolioStocks(portfolioId)
    .then((response) =>(portfolioStocks.value = response.data))
    .catch((error) => console.log(error));
};

const openScaleInPopup = (stockId: number, stockCode: string) => {
  stockIdRef.value = stockId;
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
        ElNotification({
          title: '에러',
          message: `${stockName} 종목 삭제에 실패하였습니다.`,
          position: 'bottom-left',
          type: 'error'
        });
      });
  });
};

const showTradeLogs = (stock: PortfolioStock) => {
  stock.showTradeLogs = !stock.showTradeLogs;
  if(stock.id != undefined){
    portfolioService.showTradeLogs(portfolioId, stock.id)
    .then((response) => {
      console.log(response.data);
      stock.tradeLogs = response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
};

const dateFormat = (row, column) => {
  var date = row[column];
  return dayjs(date).format("YYYY-MM-DD");
} 

</script>

<template>
  <div class="portfolio-summary-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="card-header">
            <el-row align="center">
              <el-col :span="23"></el-col>
              <el-col :span="1">
                <div class="text item">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="30" color="#000">
                        <Setting class="setting-icon"/>
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
                  <PortfolioModifyView
                    v-if="modifyPopupVisible"
                    v-model="modifyPopupVisible"
                    :portfolioId="portfolioId"
                    @close="
                      () => {
                        getPortfolioTotal();
                        getPortfolioStocks();
                        modifyPopupVisible = false;
                      }
                    "
                  />
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="card-body">
            <div class="card-body-header">
              <el-row align="middle">
                <el-col :span="20">
                  <span class="f-big">{{ portfolioSummary.name }}</span>
                </el-col>
                <el-col :span="4">
                  <PortfolioTag class="tag-icon" v-if="portfolioSummary.type" :tag="portfolioSummary.type" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="f-small">
                    <strong>{{ portfolioSummary.description }}</strong>
                  </span>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="16"><span class="f-small">총 자산</span></el-col>
              <el-col :span="8" class="txt-right">
                <span class="f-small"> {{ portfolioSummary.totalAsset.toLocaleString() }}원 </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16"><span class="f-small">총 매수 금액</span></el-col>
              <el-col :span="8" class="txt-right">
                <span class="f-small"> {{ portfolioSummary.totalBuy.toLocaleString() }}원 </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16"><span class="f-small">평가 수익</span></el-col>
              <el-col :span="8" class="txt-right">
                <span class="f-small">
                  {{ portfolioSummary.gain.toLocaleString() }}원 ({{ portfolioSummary.gainRate }}%)
                </span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
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
                  <el-avatar :size="60" :src="stock.imagePath as string" @click="showTradeLogs(stock as PortfolioStock)"/>
                </el-col>
                <el-col :span="18" @click="showTradeLogs(stock as PortfolioStock)">
                  <el-col :span="24" class="f-small">{{ stock.name }} </el-col>
                  <el-col :span="24">수량 {{ stock.quantity }} </el-col>
                </el-col>
                <el-col :span="2">
                  <el-dropdown trigger="click" size="large">
                    <span class="el-dropdown-link">
                      <el-icon size="30"><MoreFilled /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          :icon="Plus"
                          @click="openScaleInPopup(stock.id as number, stock.code as string)"
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
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24">
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 평가 금액&nbsp {{ stock.totalAsset.toLocaleString() }}원</el-col>
                    <el-col :span="12"> 평균 매수가&nbsp {{ stock.avgPrice.toLocaleString() }}원</el-col>
                  </el-row>
                  <el-row class="stock-card-content" align="middle">
                    <el-col :span="12"> 현재 수익&nbsp {{ stock.gain.toLocaleString() }}원</el-col>
                    <el-col :span="12">
                      현재가&nbsp {{ stock.currentPrice.toLocaleString() }}원 ({{ stock.gainRate }}%)
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-collapse-transition>
                <div v-show="stock.showTradeLogs">
                  <el-table stripe style="border-radius: 1rem; width: 100%" :data="stock.tradeLogs">
                    <el-table-column prop="tradeDate" label="날짜" :formatter="dateFormat" align="center" width="105" />
                    <el-table-column prop="type" label="종류" align="center" />
                    <el-table-column prop="avgPrice" label="매매가" align="center" />
                    <el-table-column prop="quantity" label="수량" align="center" />
                    <el-table-column prop="gain" label="실현수익" align="center" />
                    <el-table-column prop="totalPrice" label="금액" align="center" />
                  </el-table>
                </div>
              </el-collapse-transition>
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
        stockCode: stockCodeRef,
        stockId: stockIdRef
      }"
      @close="
        () => {
          getPortfolioTotal();
          getPortfolioStocks();
          scaleInPopupVisible = false;
        }
      "
    />
  </div>
</template>

<style scoped></style>
