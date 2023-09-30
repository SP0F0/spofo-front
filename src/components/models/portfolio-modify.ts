import { state } from 'vue-tsc/out/shared';

class PortfolioModify {
  id?: number;
  name?: string;
  description?: string;
  currency?: string;
  type?: string;

  constructor(id?: number, name?: string, description?: string, currency?: string, type?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currency = currency;
    this.type = type;
  }
}

export { PortfolioModify };
