class PortfolioStock {
  id?: number;
  code?: string;
  name?: string;
  sector?: string;
  totalAsset: number;
  gain: number;
  gainRate: number;
  avgPrice: number;
  currentPrice: number;
  quantity: number;
  imagePath?: string;

  constructor(
    id?: number,
    code?: string,
    name?: string,
    sector?: string,
    totalAsset = 0,
    gain = 0,
    gainRate = 0,
    avgPrice = 0,
    currentPrice = 0,
    quantity = 0,
    imagePath?: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.sector = sector;
    this.totalAsset = totalAsset;
    this.gain = gain;
    this.gainRate = gainRate;
    this.avgPrice = avgPrice;
    this.currentPrice = currentPrice;
    this.quantity = quantity;
    this.imagePath = imagePath;
  }
}

export { PortfolioStock };
