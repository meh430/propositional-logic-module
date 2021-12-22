import { Formula } from "./Formula";

class Not implements Formula {
  private operand: Formula;

  constructor(operand: Formula) {
    this.operand = operand;
  }

  getSymbols(): Set<string> {
    return this.operand.getSymbols();
  }

  evaluate(valuation: Map<string, boolean>): boolean {
    return !this.operand.evaluate(valuation);
  }

  getFormula(): string {
    return `(¬${this.operand.getFormula()})`;
  }
}
