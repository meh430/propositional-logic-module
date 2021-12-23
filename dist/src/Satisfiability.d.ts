import { Formula, Valuation } from "./language/Formula";
export declare function isSatisfiableFormula(formula: Formula): boolean;
export declare function isSatisfiableSet(formulas: Formula[]): boolean;
export declare function getTautologicalConsequenceCounter(premises: Formula[], conclusion: Formula): Valuation | undefined;
