import { Formula, Valuation } from "./Formula";

export class Implication implements Formula {
  antecedent: Formula;
  consequent: Formula;

  constructor(antecedent: Formula, consequent: Formula) {
    this.antecedent = antecedent;
    this.consequent = consequent;
  }

  getSymbols(): Set<string> {
    return new Set<string>([...this.antecedent.getSymbols(), ...this.consequent.getSymbols()]);
  }

  evaluate(valuation: Valuation): boolean {
    const antecedentVal = this.antecedent.evaluate(valuation);
    const consequentVal = this.consequent.evaluate(valuation);

    return (!antecedentVal || consequentVal);
  }

  getFormula(): string {
    return `(${this.antecedent.getFormula()} → ${this.consequent.getFormula()})`; 
  }
}
