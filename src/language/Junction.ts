import { Formula, Valuation } from "./Formula";
import { Literal, Not } from "./Not";

export abstract class Junction implements Formula {
  protected juncts: Array<Formula>;

  constructor(...juncts: Formula[]) {
    if (juncts.length < 2) {
      throw new Error("Incorrect number of operands");
    }

    this.juncts = juncts;
  }

  abstract getDual(): Formula;
  abstract evaluate(valuation: Valuation): boolean;
  abstract getFormula(): string;

  getSymbols(): Set<string> {
    const symbols = new Set<string>();

    this.juncts.forEach((junct: Formula) => {
      junct.getSymbols().forEach((symbol: string) => symbols.add(symbol));
    });

    return symbols;
  }

  getOperands(): Formula[] {
    return [...this.juncts];
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

export class And extends Junction {
  constructor(...conjucts: Formula[]) {
    super(...conjucts);
  }

  evaluate(valuation: Valuation): boolean {
    // if even one conjunct is false, And evaluates to false
    // this emulates short circuiting
    return !this.juncts.some(
      (conjunct: Formula) => !conjunct.evaluate(valuation)
    );
  }

  getFormula(): string {
    return this.getJunctFormula(" ∧ ");
  }

  getDual(): Formula {
    if (this.juncts.every((j) => j instanceof Literal || j instanceof Not)) {
      return new Or(...this.juncts.map((j) => j.getDual()));
    }

    throw new Error("Formula not in DNF");
  }
}

export class Or extends Junction {
  constructor(...disjuncts: Formula[]) {
    super(...disjuncts);
  }

  evaluate(valuation: Valuation): boolean {
    return this.juncts.some((disjunct: Formula) =>
      disjunct.evaluate(valuation)
    );
  }

  getFormula(): string {
    return this.getJunctFormula(" ∨ ");
  }

  getDual(): Formula {
    const inDNF = this.juncts.every(
      (j) => j instanceof Literal || j instanceof Not || j instanceof And
    );

    if (inDNF) {
      return new And(...this.juncts.map((j) => j.getDual()));
    }

    throw new Error("Formula not in DNF");
  }
}
