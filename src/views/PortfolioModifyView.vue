<script setup lang="ts">
import { ref } from 'vue';
import { focusOn } from '@/components/common/utils';
import { ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';

const props = defineProps(['portfolioId']);
const portfolioId = ref(props.portfolioId);
const portfolioNameRef = ref<HTMLElement>();
const portfolioModifyFormRef = ref<FormInstance>();
const modifyPopupVisible = ref(false);

const portfolioModifyForm = ref({
  name: '',
  description: '',
  currency: 'KRW',
  type: 'REAL'
});

const modifyPortfolio = (portfolioId: number) => {
  modifyPopupVisible.value = false;

  // 이 자료를 api로 보내면 됨
  console.log({
    name: portfolioModifyForm.value.name,
    description: portfolioModifyForm.value.description,
    currency: portfolioModifyForm.value.currency,
    type: portfolioModifyForm.value.type
  });
  // 포트폴리오 1건 조회하여 수정 팝업에 보여주기
  // 저장 혹은 취소 시 clear 해주는 로직 놓치면 안됨
  // portfolioForm.value = portfolioService.getPortfolio(portfolioId);
  clearModifyForm();
};

const popupOpened = () => focusOn(portfolioNameRef.value);

const clearModifyForm = () => portfolioModifyFormRef.value?.resetFields();

const closeModifyPopup = (done: () => void) => {
  ElMessageBox.confirm('수정하기를 취소하시겠습니까?', '알림', {
    confirmButtonText: '취소할래요',
    cancelButtonText: '아니요'
  })
    .then(() => {
      clearModifyForm();
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
  <el-dialog width="30%" :before-close="closeModifyPopup" @opened="popupOpened">
    <div class="popup">
      <div class="card-header f-big">포트폴리오 수정</div>
      <div class="card-body">
        <el-form ref="portfolioModifyFormRef" :model="portfolioModifyForm" label-width="auto">
          <el-form-item label="포트폴리오 이름" prop="name">
            <el-input v-model="portfolioModifyForm.name" ref="portfolioNameRef" />
          </el-form-item>
          <el-form-item label="포트폴리오 설명" prop="description">
            <el-input v-model="portfolioModifyForm.description" type="textarea" />
          </el-form-item>
          <el-form-item label="기준통화" prop="currency">
            <el-radio-group v-model="portfolioModifyForm.currency" text-color="#FFF" fill="#3F72AF">
              <el-radio-button class="radio-btn" label="KRW"> 대한민국 원 (KRW) </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="분류" prop="type">
            <el-radio-group v-model="portfolioModifyForm.type" text-color="#FFF" fill="#FFCC1D">
              <el-radio-button class="radio-btn" label="REAL">실제 포트폴리오</el-radio-button>
              <el-radio-button class="radio-btn" label="FAKE">모의 포트폴리오</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="button-container">
            <el-button
              color="#112D4E"
              round
              @click="modifyPortfolio(portfolioId)"
              :disabled="portfolioModifyForm.name.trim() === '' ? true : false"
            >
              수정하기
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped></style>
