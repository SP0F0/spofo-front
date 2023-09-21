import axios from '../common/axios-config';
import { useCookies } from 'vue3-cookies';

class AuthService {
  authServer = import.meta.env.VITE_AUTH_SERVER;

  testCall() {
    console.log('인증 서버 테스트 API 호출');
    axios.get(this.authServer + '/test').then((response) => console.log(response));
  }
}

const authService = new AuthService();

export default authService;
