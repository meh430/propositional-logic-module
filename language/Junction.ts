import { Formula, Valuation } from "./Formula";

export abstract class Junction implements Formula {
  protected juncts: Array<Formula>;

  constructor(juncts: Array<Formula>) {
    this.juncts = juncts;
  }

  abstract evaluate(valuation: Valuation): boolean;
  abstract getFormula(): string;

  getSymbols(): Set<string> {
    const symbols = new Set<string>();

    this.juncts.forEach((conjunct: Formula) => {
      conjunct.getSymbols().forEach((symbol: string) => symbols.add(symbol));
    });

    return symbols;
  }

  protected getJunctFormula(connective: string): string {
    let formula = "(";

    const len = this.juncts.length;
    this.juncts.forEach((conjunct: Formula, index: number) => {
      formula += conjunct.getFormula();
      if (index != len - 1) {
        formula += " ∧ ";
      }
    });

    return formula + ")";
  }
}
