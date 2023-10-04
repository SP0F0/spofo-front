<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Plus, Setting, Delete, EditPen, Search } from '@element-plus/icons-vue';
import { ElMessageBox, ElNotification, FormInstance } from 'element-plus';
import PortfolioModifyView from '@/views/PortfolioModifyView.vue';
import AddStockView from '@/views/AddStockView.vue';
import portfolioService from '@/components/services/portfolio-service';
import { PortfolioSummary } from '@/components/models/portfolio-summary';
import { PortfolioStock } from '@/components/models/portfolio-stock';
import PortfolioTag from '@/components/common/PortfolioTag.vue';
import { focusOn } from '@/components/common/utils';
import { StockCreate } from '@/components/models/stock-create';
import { StockAdd } from '@/components/models/stock-add';

const route = useRoute();
const router = useRouter();
const portfolioId = parseInt(route.query.portfolioId as string, 10);
const stockCodeRef = ref('');
const modifyPopupVisible = ref(false);
const scaleInPopupVisible = ref(false);
const portfolioSummary = ref(new PortfolioSummary());
const portfolioStocks = ref<PortfolioStock[]>();

const searchKeyword = ref('');
const searchKeywordRef = ref<HTMLElement>();
const stockCreateForm = ref(new StockCreate('B'));
const portfolioStockFormRef = ref<FormInstance>();

const stockInfo = ref({
  stockName: '선택된 종목이 없습니다.',
  stockCode: '종목을 선택해주세요.'
});

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
  focusOn(searchKeywordRef.value);
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

const disabledDate = (time: Date) => {
  const date = new Date();
  return time.getTime() < date.setMonth(date.getMonth() - 1);
};

const shortcuts = [
  {
    text: '오늘',
    value: new Date()
  }
];

const clearCreateStockForm = () => {
  portfolioStockFormRef.value?.resetFields();
  stockCreateForm.value = new StockCreate('B');
};

const selectStock = (stockName: string, stockCode: string) => {
  stockInfo.value.stockName = stockName;
  stockInfo.value.stockCode = stockCode;
  stockCreateForm.value.stockCode = stockCode;
};

const applyCurrentPrice = () => {
  if (!stockCreateForm.value.applyCurrentPrice) {
    // API 연결하기
    // API 연결로 현재가 가져오기
    stockCreateForm.value.avgPrice = 1000;
  }
};

const createStock = () => {
  // saveStock 호출 후 포트폴리오 상세 화면으로 돌아가는 콜백 넣기
};

const createStockSuccessively = () => {
  // saveStock 호출 후 다시 추가 화면으로 돌아가는 콜백 넣기
};

const saveStock = (callback: any) => {
  // api 호출해서 저장 후 콜백 넣기
};

const searchTimeoutId = ref(0);

const searchStocks = () => {
  if (searchTimeoutId.value > 0) {
    clearTimeout(searchTimeoutId.value);
  }

  searchTimeoutId.value = setTimeout(() => {
    console.log('검색 API 호출!');
  }, 1000);
};
</script>

<template>
  <div class="create-stock-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="24">
                <el-input
                  v-model="searchKeyword"
                  size="large"
                  clearable
                  placeholder="검색할 종목명 혹은 종목코드를 입력해 주세요."
                  :suffix-icon="Search"
                  ref="searchKeywordRef"
                  @keyup="searchStocks"
              /></el-col>
            </el-row>
          </div>
          <div class="card-body">
            <el-form
              ref="portfolioStockFormRef"
              label-width="80"
              class="create-stock-form"
              :model="stockCreateForm"
            >
              <el-row>
                <el-col :span="24" class="f-big"> {{ stockInfo.stockName }} </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="23"> {{ stockInfo.stockCode }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="매수날짜" prop="tradeDate">
                    <el-date-picker
                      v-model="stockCreateForm.tradeDate"
                      type="date"
                      placeholder="매수날짜"
                      :disabled-date="disabledDate"
                      :shortcuts="shortcuts"
                      :editable="false"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="수량" prop="quantity">
                    <el-input-number
                      v-model="stockCreateForm.quantity"
                      :min="0"
                      :max="999999999999999.999999999999999"
                      :controls="false"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="매수가" prop="price">
                    <el-input-number
                      v-model="stockCreateForm.avgPrice"
                      :min="0"
                      :controls="false"
                    />
                    <el-checkbox
                      class="ml-2"
                      label="현재가 적용"
                      name="type"
                      @click="applyCurrentPrice"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="button-container">
                <el-row align="middle">
                  <el-col :span="24">
                    <el-button color="#112D4E" round @click="clearCreateStockForm">
                      초기화
                    </el-button>
                    <el-button
                      color="#112D4E"
                      round
                      @click="createStock"
                      :disabled="
                        !stockCreateForm.stockCode ||
                        stockCreateForm.quantity <= 0 ||
                        stockCreateForm.avgPrice <= 0 ||
                        !stockCreateForm.tradeDate
                      "
                    >
                      추가매수
                    </el-button>
                    <el-button
                      color="#112D4E"
                      round
                      @click="createStockSuccessively"
                      :disabled="
                        !stockCreateForm.stockCode ||
                        stockCreateForm.quantity <= 0 ||
                        stockCreateForm.avgPrice <= 0 ||
                        !stockCreateForm.tradeDate
                      "
                    >
                      저장하고 새로 추가
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="24" class="f-small"> 검색결과 </el-col>
            </el-row>
          </div>
          <div class="card-body" v-for="stock in portfolioStocks" :key="stock.id">
            <div
              class="stock-card"
              @click="selectStock(stock.name as string, stock.code as string)"
            >
              <el-row class="stock-card-content" align="middle">
                <el-col :span="4">
                  <el-avatar :size="60" :src="stock.imagePath" />
                </el-col>
                <el-col :span="14">
                  <el-row align="middle">
                    <el-col :span="24">
                      {{ stock.name }}
                    </el-col>
                  </el-row>
                  <el-row align="middle">
                    <el-col :span="24"> {{ stock.code }} </el-col>
                  </el-row>
                </el-col>
                <el-col :span="6"> {{ stock.sector }} 한국주식인지 바꿔주자 </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
