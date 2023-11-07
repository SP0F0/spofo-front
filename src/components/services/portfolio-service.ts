import axios from '../common/axios-config';
import type { PortfolioCreate } from '@/components/models/portfolio-create';
import type { PortfolioModify } from '@/components/models/portfolio-modify';
import type { StockCreate } from '@/components/models/stock-create';
import type { StockAdd } from '@/components/models/stock-add';
import type { TradeLog } from '@/components/models/trade-log';

class PortfolioService {
  portfolioServer = import.meta.env.VITE_PORTFOLIO_SERVER;

  getPortfoliosTotal(condition: any) {
    console.log(condition);
    return axios.get(this.portfolioServer + '/portfolios/total', { params: condition });
  }

  getPortfolioSimples(condition: any) {
    return axios.get(this.portfolioServer + '/portfolios', { params: condition });
  }

  getPortfolio(portfolioId: number) {
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}`);
  }

  getPortfolioTotal(portfolioId: number) {
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}/total`);
  }

  getPortfolioStocks(portfolioId: number) {
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}/stocks`);
  }

  createPortfolio(portfolio: PortfolioCreate) {
    return axios.post(this.portfolioServer + '/portfolios', portfolio);
  }

  modifyPortfolio(portfolio: PortfolioModify) {
    return axios.put(this.portfolioServer + `/portfolios/${portfolio.id}`, portfolio);
  }

  createStock(portfolioId: number, stock: StockAdd) {
    return axios.put(this.portfolioServer + `/portfolios/${portfolioId}/stocks`, stock);
  }

  addTradeLog(portfolioId: number, stock: StockAdd, stockId: number) {
    return axios.post(this.portfolioServer + `/portfolios/${portfolioId}/stocks/${stockId}`, stock);
  }

  deletePortfolio(portfolioId: number) {
    return axios.delete(this.portfolioServer + `/portfolios/${portfolioId}`);
  }

  deleteStock(portfolioId: number, stockId: number) {
    return axios.delete(this.portfolioServer + `/portfolios/${portfolioId}/stocks/${stockId}`);
  }

  getHoldingStock(portfolioId: number, stockId: number) {
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}/stocks/${stockId}`);
  }

  showTradeLogs(portfolioId: number, stockId: number) {
    return axios.get(
      this.portfolioServer + `/portfolios/${portfolioId}/stocks/${stockId}/trade-log`
    );
  }
}

const portfolioService = new PortfolioService();

export default portfolioService;
