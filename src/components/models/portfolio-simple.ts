class PortfolioSimple {
  id: string;
  name: string;
  gain: string;
  gainRate: string;
  tag: string;
  includeYn: string;

  constructor(
    id: string,
    name: string,
    gain: string,
    gainRate: string,
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
