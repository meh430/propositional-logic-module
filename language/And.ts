import { Formula } from "./Formula";
import { Junction } from "./Junction";

export class And extends Junction {
  constructor(conjucts: Array<Formula>) {
    super(conjucts);
  }

  evaluate(valuation: Map<string, boolean>): boolean {
    return this.juncts.every((conjunct: Formula) =>
      conjunct.evaluate(valuation)
    );
  }

  getFormula(): string {
    return this.getJunctFormula(" ∧ ");
  }
}
