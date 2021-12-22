import { Formula, Valuation } from "./Formula";

export abstract class Junction implements Formula {
  protected juncts: Array<Formula>;

  constructor(...juncts: Formula[]) {
    if (juncts.length < 2) {
      throw new Error("Incorrect number of operands");
    }

    this.juncts = juncts;
  }

  abstract evaluate(valuation: Valuation): boolean;
  abstract getFormula(): string;

  getSymbols(): Set<string> {
    const symbols = new Set<string>();

    this.juncts.forEach((junct: Formula) => {
      junct.getSymbols().forEach((symbol: string) => symbols.add(symbol));
    });

    return symbols;
  }

  protected getJunctFormula(connective: string): string {
    let formula = "(";

    const len = this.juncts.length;
    this.juncts.forEach((conjunct: Formula, index: number) => {
      formula += conjunct.getFormula();
      if (index != len - 1) {
        formula += connective;
      }
    });

    return formula + ")";
  }
}
