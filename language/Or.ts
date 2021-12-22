import { Formula } from "./Formula";
import { Junction } from "./Junction";

class Or extends Junction {
  constructor(disjuncts: Array<Formula>) {
    super(disjuncts);
  }

  evaluate(valuation: Map<string, boolean>): boolean {
    return this.juncts.some((disjunct: Formula) =>
      disjunct.evaluate(valuation)
    );
  }

  getFormula(): string {
    return this.getJunctFormula(" ∨ ");
  }
}
