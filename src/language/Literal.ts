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

  getDual(): Formula {
    if (this.operand instanceof Symbol) {
      return this.operand;
    }

    throw new Error("Formula not in DNF");
  }

  isLogicalLiteral(): boolean {
    return this.operand instanceof Symbol;
  }

  getOperand(): Formula {
    return this.operand;
  }
}

export class Symbol implements Formula {
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

  getDual(): Formula {
    return new Not(this);
  }
}
