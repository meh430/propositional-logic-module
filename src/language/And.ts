import { Formula, Valuation } from "./Formula";
import { Junction } from "./Junction";

export class And extends Junction {
  constructor(...conjucts: Formula[]) {
    super(...conjucts);
  }

  evaluate(valuation: Valuation): boolean {
    return !this.juncts.some((conjunct: Formula) =>
      !conjunct.evaluate(valuation)
    );
  }

  getFormula(): string {
    return this.getJunctFormula(" ∧ ");
  }
}
