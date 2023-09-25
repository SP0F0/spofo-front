import axios from '../common/axios-config';

class PortfolioService {
  portfolioServer = import.meta.env.VITE_PORTFOLIO_SERVER;

  getPortfoliosTotal() {
    return axios.get(this.portfolioServer + '/portfolios/total');
  }

  getPortfolioSimples() {
    return axios.get(this.portfolioServer + '/portfolios');
  }

  createPortfolio(portfolio: any) {
    return axios.post(this.portfolioServer + '/portfolios', portfolio);
  }
}

const portfolioService = new PortfolioService();

export default portfolioService;
