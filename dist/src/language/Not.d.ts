import { Formula, Valuation } from "./Formula";
export declare class Not implements Formula {
    private operand;
    constructor(operand: Formula);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
