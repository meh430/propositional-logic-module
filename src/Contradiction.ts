import { Formula } from "./language/Formula";
import { generateValuations } from "./Utils";

export function isContradiction(formula: Formula): boolean {
  const symbols = formula.getSymbols();
  const valuations = generateValuations(symbols);
  return !valuations.some(v => formula.evaluate(v));
}
