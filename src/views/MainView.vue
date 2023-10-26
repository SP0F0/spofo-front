<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="main-container">
    <img class="first-box-bg" src="../assets/images/circular_bg.png" />
    <div class="first-box">
      <el-row class="main-first-text">
        누구나 쉽게 관리하는 주식 포트폴리오
      </el-row>
      <img src="../assets/images/logo.png" class="main-first-logo" />
      <el-row>
        <el-col>
          <el-button class="login-btn" color="#120064" round @click="router.push({ name: 'login' })">
            시작하기
          </el-button>
        </el-col>
      </el-row>
      <div class="down-arrow">
        <div class="chevron"></div>
        <div class="chevron"></div>
        <div class="chevron"></div>
      </div>
    </div>
    <div class="second-box">
      <el-row class="main-second-text-title">
        포트폴리오의&nbsp;
        <span style="color: #00f61d">누적 수익률</span>
      </el-row>
      <el-row class="main-second-text-content">
        포트폴리오의 수익률을 보고 싶으신가요?<br />
        스포포가 누적 수익률을 알려드려요.<br />
        선택한 포트폴리오의 수익률만 볼 수 있어요!
      </el-row>
      <img src="../assets/images/content1.png" class="main-content1" />
    </div>
    <div class="third-box">
      <img src="../assets/images/content2.png" class="main-content2" />
      <el-row class="main-third-text-title">
        <span style="color: #00f61d">다양한 유형</span>
        의 포트폴리오
      </el-row>
      <el-row class="main-third-text-content">
        모의로 투자를 해보고 싶으신가요?<br />
        실제 투자를 포트폴리오로 만들고 싶으신가요?<br />
        스포포에서 원하는 유형으로 만들어 보세요!
      </el-row>
    </div>
    <div class="last-box">
      <div class="last-box-ask">
        <el-row>
          <img src="../assets/images/logo.png" class="ask-logo" />
        </el-row>
        <el-row>
          <el-col :span="12" class="main-last-text">
            서비스 이용에<br>
            도움이 필요하신가요?
          </el-col>
          <el-col :span="12" class="main-last-btn">
            <el-button class="ask-btn" color="#120064" round>
              문의하기
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-row class="footer">
        <el-col :span="12" class="footer-names">
          장원준 김한성 문예진<br>
          박가연 박승규 최현지
        </el-col>
        <el-col :span="12" class="footer-copyright">
          <img src="../assets/images/logo.png" class="footer-logo" /><br>
          Copyright @SPOFO All rights reserved.
        </el-col>
      </el-row>
    </div>
  </div>
</template>
