import { Formula } from "./Formula";

class Literal implements Formula {
  private symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  getSymbols(): Set<string> {
    return new Set<string>([this.symbol]);
  }

  evaluate(valuation: Map<String, boolean>): boolean {
    return Boolean(valuation.get(this.symbol));
  }

  getFormula(): string {
    return this.symbol;
  }
}
