import { Formula, Valuation } from "../logic";
import { generateValuations } from "./Utils";

export interface Row {
  valuation: Valuation;
  output: boolean;
}

export class TruthTable {
  formula: Formula;
  rows: Row[] = []; // if n is the number of symbols, 2^n is the length of rows

  constructor(formula: Formula) {
    this.formula = formula;
    this.generateTable();
  }

  private generateTable() {
    const symbols = this.formula.getSymbols();
    const valuations = generateValuations(symbols);
    valuations.forEach((v) => {
      this.rows.push({
        valuation: v,
        output: this.formula.evaluate(v),
      });
    });
  }
}
