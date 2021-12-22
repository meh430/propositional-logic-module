export interface Formula {
  getSymbols(): Set<string>;
  evaluate(valuation: Map<string, boolean>): boolean;
  getFormula(): string;
}
