<script setup lang="ts">
const kakaoLogin = () => {
  // 카카오
  const kakaoAuthRequestUrl = import.meta.env.VITE_KAKAO_AUTH_REQUEST_URL;
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  window.location.href = `${kakaoAuthRequestUrl}/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code&scope=openid`;
};

/*
const naverLogin = () => {};

const googleLogin = () => {};
 */
</script>

<template>
  <div class="login txt-center">
    <div class="button-container">

      <el-row justify="center">
        <el-col :span="24">
          <h1 class="p-1">로그인</h1>
          <el-button class="login-btn" color="#FEE500" round @click="kakaoLogin">
            <img style="width: 2rem; height: 2rem; padding-left: 0.5rem;" src="../assets/images/kakao_logo.png"
              alt="카카오 로그인 버튼" />
            카카오로 시작하기
          </el-button>
        </el-col>
      </el-row>

      <el-row justify="center">
        <el-col :span="24">
          <el-button class="login-btn" color="#04cb10" round @click="">
            <img src="../assets/images/naver_logo.png" alt="네이버 로그인 버튼" />
            네이버로 시작하기
          </el-button>
        </el-col>
      </el-row>

      <el-row justify="center">
        <el-col :span="24">
          <el-button class="login-btn" color="#FFF" round @click="">
            <img src="../assets/images/google_logo.png" alt="구글 로그인 버튼" />
            구글로 시작하기
          </el-button>
        </el-col>
      </el-row>

      <el-row justify="center" class="login-copyright">
        @SPOFO All rights reserved.
      </el-row>

    </div>
  </div>
</template>

<style></style>
