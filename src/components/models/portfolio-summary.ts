class PortfolioSummary {
  name?: string;
  description?: string;
  totalAsset: number;
  totalBuy: number;
  gain: number;
  gainRate: number;
  tag?: string;

  constructor(
    name?: string,
    description?: string,
    totalAsset = 0,
    totalBuy = 0,
    gain = 0,
    gainRate = 0,
    tag?: string
  ) {
    this.name = name;
    this.description = description;
    this.totalAsset = totalAsset;
    this.totalBuy = totalBuy;
    this.gain = gain;
    this.gainRate = gainRate;
    this.tag = tag;
  }
}

export { PortfolioSummary };
