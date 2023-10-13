import axios from '../common/axios-config';

class StockService {
  stockServer = import.meta.env.VITE_STOCK_SERVER;

  searchStocks(keyword: string) {
    return axios.get(this.stockServer + `/stocks/search?keyword=${keyword}`);
  }
}

const stockService = new StockService();

export default stockService;
