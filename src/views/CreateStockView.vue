<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { ElNotification, FormInstance } from 'element-plus';
import { PortfolioSummary } from '@/components/models/portfolio-summary';
import { focusOn } from '@/components/common/utils';
import { StockCreate } from '@/components/models/stock-create';
import type { Stock } from '@/components/models/stock';
import stockService from '@/components/services/stock-service';

const route = useRoute();
const router = useRouter();
const portfolioSummary = ref(new PortfolioSummary());
const searchedStocks = ref<Stock[]>();

const searchKeyword = ref('');
const searchKeywordRef = ref<HTMLElement>();
const stockCreateForm = ref(new StockCreate('B'));
const portfolioStockFormRef = ref<FormInstance>();
const searchTimeoutId = ref(0);

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
      description: '포트폴리오 설명입니다.',
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
  /*
  searchedStocks.value = [
    {
      code: 'CODE1',
      name: '삼성전자',
      market: '기술주',
      imageUrl: 'https://images.therich.io/images/logo/kr/005935.png'
    },
    {
      code: 'CODE1',
      name: '하이닉스',
      market: '반도체',
      imageUrl: 'https://images.therich.io/images/logo/kr/005935.png'
    },
    {
      code: 'CODE3',
      name: '현대오토에버',
      market: '기술주',
      imageUrl: 'https://images.therich.io/images/logo/kr/005935.png'
    }
  ];

   */
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
  focusOn(searchKeywordRef.value);
};

const selectStock = (code: string, name: string) => {
  stockCreateForm.value.stockCode = code;
  stockInfo.value.stockCode = code;
  stockInfo.value.stockName = name;
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

const searchStocks = () => {
  if (!searchKeyword.value) {
    return;
  }

  if (searchTimeoutId.value > 0) {
    clearTimeout(searchTimeoutId.value);
  }

  searchTimeoutId.value = setTimeout(() => {
    stockService
      .searchStocks(searchKeyword.value)
      .then((response) => (searchedStocks.value = response.data))
      .catch((error) => {
        console.log('실패');
      });
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
          <div class="card-body" v-for="stock in searchedStocks" :key="stock.stockCode">
            <div
              class="stock-card cur-pointer"
              @click="selectStock(stock.stockCode as string, stock.name as string)"
            >
              <el-row class="stock-card-content" align="middle">
                <el-col :span="4">
                  <el-avatar :size="60" :src="stock.imageUrl" />
                </el-col>
                <el-col :span="14">
                  <el-col :span="24"> {{ stock.name }} </el-col>
                  <el-col :span="24"> {{ stock.stockCode }} </el-col>
                </el-col>
                <el-col :span="6"> {{ stock.market }} </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="!searchedStocks">
            <el-result icon="error" title="검색 결과가 없습니다."> </el-result>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
