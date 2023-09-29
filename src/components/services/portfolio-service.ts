import axios from '../common/axios-config';

class PortfolioService {
  portfolioServer = import.meta.env.VITE_PORTFOLIO_SERVER;

  getPortfoliosTotal() {
    return axios.get(this.portfolioServer + '/portfolios/total');
  }

  getPortfolioSimples() {
    return axios.get(this.portfolioServer + '/portfolios');
  }

  getPortfolio(portfolioId: number) {
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}`);
  }

  getPortfolioTotal(portfolioId: number) {
    alert('getPortfolioTotal');
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}/total`);
  }

  getPortfolioStocks(portfolioId: number) {
    alert('getPortfolioStocks');
    return axios.get(this.portfolioServer + `/portfolios/${portfolioId}/stocks`);
  }

  createPortfolio(portfolio: any) {
    return axios.post(this.portfolioServer + '/portfolios', portfolio);
  }
}

const portfolioService = new PortfolioService();

export default portfolioService;
