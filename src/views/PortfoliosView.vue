<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import portfolioService from '../components/services/portfolio-service';
import { PortfoliosSummary } from '@/components/models/portfolios-summary';
import type { PortfolioSimple } from '@/components/models/portfolio-simple';
import { Plus } from '@element-plus/icons-vue';
import PortfolioTag from '@/components/common/PortfolioTag.vue';
import { PortfolioModify } from '@/components/models/portfolio-modify';
import { Select, CloseBold } from '@element-plus/icons-vue';

const router = useRouter();
const filterOption = ref('');
const portfoliosSummary = ref(new PortfoliosSummary());
const portfolioSimples = ref<PortfolioSimple[]>();

onMounted(() => {
  getPortfoliosTotal('');
  getPortfolioSimples('');
});

const getPortfolioSimples = (type: string) =>
  portfolioService
    .getPortfolioSimples({
      type: type
    })
    .then((response) => (portfolioSimples.value = response.data))
    .catch((error) => console.log(error));

const getPortfoliosTotal = (type: string) =>
  portfolioService
    .getPortfoliosTotal({
      type: type
    })
    .then((response) => {
      portfoliosSummary.value = response.data;
      console.log(response.data);
    })
    .catch((error) => console.log(error));

const viewPortfolio = (portfolioId: number) => {
  router.push({
    name: 'portfolio',
    query: { portfolioId: portfolioId }
  });
};

const switchInclude = (portfolio: PortfolioSimple) => {
  const modifiedPortfolio = new PortfolioModify(
    portfolio.id,
    portfolio.name,
    portfolio.description,
    portfolio.currency,
    portfolio.type,
    portfolio.includeType
  );

  portfolioService
    .modifyPortfolio(modifiedPortfolio)
    .then((response) => {
      getPortfoliosTotal('');
      getPortfolioSimples('');
    })
    .catch((error) => console.log(error));
};

const changeFilterOption = () => {
  getPortfoliosTotal(filterOption.value);
  getPortfolioSimples(filterOption.value);
};
</script>

<template>
  <div class="portfolios-summary-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="22"></el-col>
              <el-col :span="2">
                <el-button type="info" circle link size="large">
                  <el-icon size="30" color="#000" @click="router.push({ name: 'portfolioCreate' })">
                    <Plus />
                  </el-icon>
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="card-body">
            <div class="card-body-header">
              <el-row>
                <el-col :span="24"><span class="f-big">총 자산</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="f-big">
                    <strong>{{ portfoliosSummary?.totalAsset.toLocaleString() }}원</strong>
                  </span>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="12">
                <span class="f-small">평가수익</span>
              </el-col>
              <el-col :span="12" class="f-small txt-right">
                <span>{{ portfoliosSummary?.gain.toLocaleString() }}원</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="f-small">수익률</span>
              </el-col>
              <el-col :span="12" class="f-small txt-right">
                <span>{{ portfoliosSummary?.gainRate }}%</span>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12">
                <span class="f-small">일간 수익률</span>
              </el-col>
              <el-col :span="12" class="f-small txt-right">
                <span>{{ portfoliosSummary?.dailyGainRate }}%</span>
              </el-col>
            </el-row> -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="card-header">
            <el-row align="middle">
              <el-col :span="24">
                <el-select
                  v-model="filterOption"
                  class="m-2"
                  placeholder="포트폴리오 구분"
                  size="large"
                  @change="changeFilterOption"
                >
                  <el-option key="전체" label="전체" value="" />
                  <el-option key="실제" label="실제" value="REAL" />
                  <el-option key="모의" label="모의" value="FAKE" />
                  <el-option key="계좌 연동" label="계좌 연동" value="LINK" />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="card-body" v-for="item in portfolioSimples" :key="item.id">
            <div class="stock-card">
              <el-row class="stock-card-content" align="middle">
                <el-col :span="24">
                  <PortfolioTag v-if="item.type" :tag="item.type" />
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="20">
                  <el-link :underline="false" @click="viewPortfolio(item.id)">
                    {{ item.name }}
                  </el-link>
                </el-col>
                <el-col :span="4">
                  <el-switch
                    v-model="item.includeType"
                    size="large"
                    style="
                      float: right;
                      --el-switch-on-color: #120064;
                      --el-switch-off-color: #0065b8;
                    "
                    @click="switchInclude(item)"
                    inline-prompt
                    :active-icon="Select"
                    :inactive-icon="CloseBold"
                  />
                </el-col>
              </el-row>
              <el-row class="stock-card-content" align="middle">
                <el-col :span="3"> 자산가치&nbsp; </el-col>
                <el-col :span="21"> {{ item.totalAsset.toLocaleString() }}원 </el-col>
                <el-col :span="3"> 수익률&nbsp; </el-col>
                <el-col :span="21"> {{ item.gainRate }}% </el-col>
                <el-col :span="3"> 수익&nbsp; </el-col>
                <el-col :span="21"> {{ item.gain.toLocaleString() }}원</el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
