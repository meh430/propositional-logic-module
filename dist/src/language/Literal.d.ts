import { Formula, Valuation } from "./Formula";
export declare class Literal implements Formula {
    private symbol;
    constructor(symbol: string);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
