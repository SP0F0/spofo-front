<script setup>
const login = (socialType) => {
  console.log(socialType);
  // 카카오
  const kakaoAuthRequestUrl = import.meta.env.VITE_KAKAO_AUTH_REQUEST_URL;
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  window.location.href = `${kakaoAuthRequestUrl}/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code&scope=openid`;
};
</script>

<template>
  <div class="login">
    <el-row justify="center">
      <button @click="login('KAKAO')">
        <img src="@/assets/images/kakao_logo.png" alt="카카오 로그인 버튼" />
        카카오 로그인
      </button>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
