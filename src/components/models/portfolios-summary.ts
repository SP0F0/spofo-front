class PortfoliosSummary {
  totalAsset: number;
  gain: number;
  gainRate: number;
  dailyGainRate: number;

  constructor(totalAsset: number, gain: number, gainRate: number, dailyGainRate: number) {
    this.totalAsset = totalAsset;
    this.gain = gain;
    this.gainRate = gainRate;
    this.dailyGainRate = dailyGainRate;
  }
}

export { PortfoliosSummary };
