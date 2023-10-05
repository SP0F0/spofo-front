class Stock {
  code?: string;
  name?: string;
  market?: string;
  imageUrl?: string;

  constructor(code: string, name: string, market: string, imageUrl: string) {
    this.code = code;
    this.name = name;
    this.market = market;
    this.imageUrl = imageUrl;
  }
}

export { Stock };
