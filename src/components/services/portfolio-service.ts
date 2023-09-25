import axios from '../common/axios-config';

class PortfolioService {
  portfolioServer = import.meta.env.VITE_PORTFOLIO_SERVER;

  testCall() {
    console.log('포트폴리오 서버 테스트 API 호출');
    axios.get(this.portfolioServer + '/test').then((response) => console.log(response));
  }
}

const portfolioService = new PortfolioService();

export default portfolioService;
