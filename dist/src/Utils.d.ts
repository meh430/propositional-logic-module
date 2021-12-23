import { Formula, Valuation } from "./language/Formula";
export declare function generateValuations(symbols: Set<string>): Valuation[];
export declare function collectSymbols(formulas: Formula[]): Set<string>;
