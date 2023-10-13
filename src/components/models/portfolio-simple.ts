class PortfolioSimple {
  id: number;
  name: string;
  description: string;
  currency: string;
  gain: number;
  gainRate: number;
  type: string;
  includeYn: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    currency: string,
    gain: number,
    gainRate: number,
    type: string,
    includeYn: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currency = currency;
    this.gain = gain;
    this.gainRate = gainRate;
    this.type = type;
    this.includeYn = includeYn;
  }
}

export { PortfolioSimple };
