import axios from '../common/axios-config';

class AuthService {
  authServer = import.meta.env.VITE_AUTH_SERVER;

  // API 연결 필요
  addMember(loggedInMemberInfo: any) {
    axios
      .put(this.authServer + '/auth/members/search', loggedInMemberInfo)
      .then((response) => console.log(response));
  }
}

const authService = new AuthService();

export default authService;
