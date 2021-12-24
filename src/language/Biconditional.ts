import { Formula, Valuation } from "./Formula";

export class Biconditional implements Formula {
  private operand1: Formula;
  private operand2: Formula;

  constructor(operand1: Formula, operand2: Formula) {
    this.operand1 = operand1;
    this.operand2 = operand2;
  }

  getSymbols(): Set<string> {
    return new Set<string>([
      ...this.operand1.getSymbols(),
      ...this.operand2.getSymbols(),
    ]);
  }

  evaluate(valuation: Valuation): boolean {
    const operand1Val = this.operand1.evaluate(valuation);
    const operand2Val = this.operand2.evaluate(valuation);

    return (operand1Val && operand2Val) || (!operand1Val && !operand2Val);
  }

  getFormula(): string {
    return `(${this.operand1.getFormula()} ↔ ${this.operand2.getFormula()})`;
  }

  getDual(): Formula {
    throw new Error("Formula not in DNF");
  }
}
