import axios from '../common/axios-config';
import { PortfoliosSummary } from '@/components/models/portfolios-summary';

class PortfolioService {
  portfolioServer = import.meta.env.VITE_PORTFOLIO_SERVER;

  getPortfoliosTotal() {
    return axios.get(this.portfolioServer + '/portfolios/total');
  }

  getPortfolioSimples() {
    return axios.get(this.portfolioServer + '/portfolios');
  }
}

const portfolioService = new PortfolioService();

export default portfolioService;
