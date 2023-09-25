class PortfolioSummary {
  // 1개 포트폴리오에 대한 개요
  name: string;
  detail: string;
  totalAsset: number;
  gain: number;
  gainRate: number;

  constructor(name: string, detail: string, totalAsset: number, gain: number, gainRate: number) {
    this.name = name;
    this.detail = detail;
    this.totalAsset = totalAsset;
    this.gain = gain;
    this.gainRate = gainRate;
  }
}

export { PortfolioSummary };
