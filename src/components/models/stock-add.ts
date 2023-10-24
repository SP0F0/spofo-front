class StockAdd {
  code?: string;
  type?: string;
  avgPrice: number;
  tradeDate: Date;
  quantity: number;

  constructor(
    code?: string,
    type?: string,
    avgPrice = 0,
    tradeDate = new Date(),
    quantity = 0,
  ) {
    this.code = code;
    this.type = type;
    this.avgPrice = avgPrice;
    this.tradeDate = tradeDate;
    this.quantity = quantity;
  }
}

export { StockAdd };
