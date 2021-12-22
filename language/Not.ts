import { Formula, Valuation } from "./Formula";

export class Not implements Formula {
  private operand: Formula;

  constructor(operand: Formula) {
    this.operand = operand;
  }

  getSymbols(): Set<string> {
    return this.operand.getSymbols();
  }

  evaluate(valuation: Valuation): boolean {
    return !this.operand.evaluate(valuation);
  }

  getFormula(): string {
    return `(¬${this.operand.getFormula()})`;
  }
}
