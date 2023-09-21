import axios from '../common/axios-config';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

class LoginService {
  doLoginProcess(socialType, code) {
    const requestUrl = this.getTokenRequestUrl(socialType, code);

    return axios
      .get(requestUrl)
      .then((response) => response.data.id_token)
      .then((idToken) => {
        this.addMember(socialType, idToken).then(() => this.storeLoginInfo(socialType, idToken));
      });
  }

  getTokenRequestUrl(socialType, code) {
    // 카카오
    const kakaoAuthRequestUrl = import.meta.env.VITE_KAKAO_AUTH_REQUEST_URL;
    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const grantType = import.meta.env.VITE_GRANT_TYPE;

    return `${kakaoAuthRequestUrl}/token?grant_type=${grantType}&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&code=${code}`;
  }

  addMember(socialType, idToken) {
    //return axios.post('인증서버 url', { socialType: socialType, idToken: idToken });
    return new Promise((resolve) => {
      console.log(`나중에 인증서버 요청으로 변경하기`);
      resolve();
    });
  }

  storeLoginInfo(socialType, idToken) {
    cookies.set('socialType', socialType, 60 * 60 * 24 * 7);
    cookies.set('authorization', idToken, 60 * 60 * 24 * 7);
  }
}

const loginService = new LoginService();

export default loginService;
