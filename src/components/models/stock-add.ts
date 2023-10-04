class StockAdd {
  type?: string;
  price: number;
  tradeDate: Date;
  quantity: number;
  applyCurrentPrice?: boolean;

  constructor(
    type?: string,
    price = 0,
    tradeDate = new Date(),
    quantity = 0,
    applyCurrentPrice = false
  ) {
    this.type = type;
    this.price = price;
    this.tradeDate = tradeDate;
    this.quantity = quantity;
    this.applyCurrentPrice = applyCurrentPrice;
  }
}

export { StockAdd };
