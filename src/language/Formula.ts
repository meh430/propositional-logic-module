export interface Formula {
  getSymbols(): Set<string>;
  evaluate(valuation: Valuation): boolean;
  getFormula(): string;

  // gets CNF from DNF by using dual
  // assumes that current formula is in DNF
  getDual(): Formula;
}

export interface Valuation {
  [key: string]: boolean;
}
