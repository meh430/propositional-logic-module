import { Formula, Valuation } from "./Formula";

export class Literal implements Formula {
  private symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  getSymbols(): Set<string> {
    return new Set<string>([this.symbol]);
  }

  evaluate(valuation: Valuation): boolean {
    return Boolean(valuation[this.symbol]);
  }

  getFormula(): string {
    return this.symbol;
  }
}
