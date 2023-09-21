import axios from '../common/axios-config';

class StockService {
  stockServer = import.meta.env.VITE_STOCK_SERVER;

  testCall() {
    console.log('주식 서버 테스트 API 호출');
    axios.get(this.stockServer + '/test').then((response) => console.log(response));
  }
}

const stockService = new StockService();

export default stockService;
