import { Formula } from "./language/Formula";
import { Not } from "./language/Not";
import { isTautology } from "./Tautology";

export function isContradiction(formula: Formula): boolean {
  // the negation of a contradiction will be a tuatology
  return isTautology(new Not(formula));
}
