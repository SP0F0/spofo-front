<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import { focusOn } from '@/components/common/utils';
import { ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';

const props = defineProps(['vars']);
const vars = toRef(props, 'vars');
const stockQuantityRef = ref<HTMLElement>();
const portfolioStockFormRef = ref<FormInstance>();

const portfolioStockForm = ref({
  // 타입, 매수날짜, 매수수량, 매수
  type: '',
  price: 0,
  tradeDate: new Date(),
  quantity: 0,
  applyCurrentPrice: false
});

const portfolioStock = ref({
  id: 0,
  code: '',
  name: '',
  sector: '',
  totalAsset: 0,
  gain: 0,
  gainRate: 0,
  avgPrice: 0,
  currentPrice: 0,
  quantity: 0,
  imagePath: ''
});

onMounted(async () => {
  //console.log(vars.value.portfolioId);
  //console.log(vars.value.stockCode);
  // 포트폴리오 id와 종목코드를 가지고 포트폴리오의 종목 1건에 대한 정보를 조회
  // portfolioStock.value = portfolioService.getPortfolioTotal(portfolioId);
  portfolioStock.value = {
    id: 0,
    code: '응답받은 삼성전자 코드',
    name: '응답받은 삼성전자',
    sector: '응답받은 기술섹터',
    totalAsset: 1000,
    gain: 900,
    gainRate: 10,
    avgPrice: 500,
    currentPrice: 25,
    quantity: 60,
    imagePath: ''
  };
});

const closeScaleInPopup = (done: () => void) => {
  ElMessageBox.confirm('추가매수를 취소하시겠습니까?', '알림', {
    confirmButtonText: '취소할래요',
    cancelButtonText: '아니요'
  })
    .then(() => {
      clearAddStockForm();
      done();
    })
    .catch(() => {
      // catch error
    });
};

const clearAddStockForm = () => {
  portfolioStockFormRef.value?.resetFields();
  portfolioStockForm.value = {
    type: '',
    price: 0,
    tradeDate: new Date(),
    quantity: 0,
    applyCurrentPrice: false
  };
};

const popupOpened = () => focusOn(stockQuantityRef.value);

const scaleIn = () => {
  console.log('추가매수 데이터 저장하기');
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

const applyCurrentPrice = () => {
  if (!portfolioStockForm.value.applyCurrentPrice) {
    // API 연결로 현재가 가져오기
    portfolioStockForm.value.price = 1000;
  }
};
</script>

<template>
  <el-dialog width="30%" :before-close="closeScaleInPopup" @opened="popupOpened">
    <div class="popup">
      <div class="add-stock-container">
        <div class="card-header f-big">추가 매수</div>
        <div class="card-body">
          <el-row align="middle">
            <el-col :span="4">
              <el-avatar :size="60" />
            </el-col>
            <el-col :span="16">
              <el-row align="middle">
                <el-col :span="24" class="f-small"> {{ portfolioStock.name }} </el-col>
                <el-col :span="24"> {{ portfolioStock.code }} </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="statistic">
            <el-row align="middle">
              <el-col :span="24">
                <el-row class="title row" align="middle">
                  <el-col :span="6"></el-col>
                  <el-col :span="6">수량</el-col>
                  <el-col :span="6">매수가</el-col>
                  <el-col :span="6">투자금액</el-col>
                </el-row>
                <el-row class="row" align="middle">
                  <el-col :span="6" class="title">현재</el-col>
                  <el-col :span="6">{{ portfolioStock.quantity }}</el-col>
                  <el-col :span="6">{{ portfolioStock.avgPrice }}</el-col>
                  <el-col :span="6">{{ portfolioStock.totalAsset }}</el-col>
                </el-row>
                <el-row class="row" align="middle">
                  <el-col :span="6" class="title">추가</el-col>
                  <el-col :span="6">{{ portfolioStockForm.quantity }}</el-col>
                  <el-col :span="6">{{ portfolioStockForm.price }}</el-col>
                  <el-col :span="6">{{
                    portfolioStockForm.quantity * portfolioStockForm.price
                  }}</el-col>
                </el-row>
                <el-row class="row" align="middle">
                  <el-col :span="6" class="title">합계</el-col>
                  <el-col :span="6">{{
                    portfolioStock.quantity + portfolioStockForm.quantity
                  }}</el-col>
                  <el-col :span="6">{{
                    portfolioStock.avgPrice + portfolioStockForm.price
                  }}</el-col>
                  <el-col :span="6">{{
                    portfolioStock.totalAsset +
                    portfolioStockForm.quantity * portfolioStockForm.price
                  }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <el-form
            class="add-stock-form"
            ref="portfolioStockFormRef"
            label-position="left"
            label-width="80"
            :model="portfolioStockForm"
          >
            <el-form-item label="매수날짜" prop="tradeDate">
              <el-date-picker
                v-model="portfolioStockForm.tradeDate"
                type="date"
                placeholder="매수날짜를 입력해 주세요"
                :disabled-date="disabledDate"
                :shortcuts="shortcuts"
                :editable="false"
              />
            </el-form-item>
            <el-form-item label="수량" prop="quantity">
              <el-input-number
                v-model="portfolioStockForm.quantity"
                :min="0"
                :max="999999999999999.999999999999999"
                :controls="false"
                ref="stockQuantityRef"
              />
            </el-form-item>
            <el-form-item label="매수가" prop="price">
              <el-input-number v-model="portfolioStockForm.price" :min="0" :controls="false" />
              <el-checkbox
                class="ml-2"
                label="현재가 적용"
                v-model="portfolioStockForm.applyCurrentPrice"
                name="type"
                @click="applyCurrentPrice"
              />
            </el-form-item>
          </el-form>

          <div class="button-container">
            <el-row align="middle">
              <el-col :span="24">
                <el-button color="#112D4E" round @click="clearAddStockForm"> 초기화 </el-button>
                <el-button
                  color="#112D4E"
                  round
                  @click="scaleIn()"
                  :disabled="portfolioStockForm.price !== 0 && portfolioStockForm.quantity !== 0"
                >
                  추가매수
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped></style>
