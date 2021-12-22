import { Formula } from "./language/Formula";
import { generateValuations } from "./Utils";

export function isTautology(formula: Formula): boolean {
  const symbols = formula.getSymbols();
  const valuations = generateValuations(symbols);
  // tautology iff every valuation results in a true
  return valuations.every((v) => formula.evaluate(v));
}
