class PortfolioSimple {
  id: string;
  name: string;
  gain: number;
  gainRate: number;
  tag: string;
  includeYn: string;

  constructor(
    id: string,
    name: string,
    gain: number,
    gainRate: number,
    tag: string,
    includeYn: string
  ) {
    this.id = id;
    this.name = name;
    this.gain = gain;
    this.gainRate = gainRate;
    this.tag = tag;
    this.includeYn = includeYn;
  }
}

export { PortfolioSimple };
