class PortfolioSimple {
  id: number;
  name: string;
  gain: number;
  gainRate: number;
  tag: string;
  includeYn: boolean;

  constructor(
    id: number,
    name: string,
    gain: number,
    gainRate: number,
    tag: string,
    includeYn: boolean
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
