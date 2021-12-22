import { Formula, Valuation } from "./Formula";
import { Junction } from "./Junction";

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
}
