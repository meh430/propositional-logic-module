import { Formula, Valuation } from "./language/Formula";
export declare function generateValuations(symbols: Set<string>): Valuation[];
export declare function collectSymbols(formulas: Formula[]): Set<string>;
export declare function union<Type>(a: Set<Type>, b: Set<Type>): Set<Type>;
export declare function intersection<Type>(a: Set<Type>, b: Set<Type>): Set<Type>;
export declare function difference<Type>(a: Set<Type>, b: Set<Type>): Set<Type>;
