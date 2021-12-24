import { Formula, Valuation } from "./Formula";
export declare class Biconditional implements Formula {
    private operand1;
    private operand2;
    constructor(operand1: Formula, operand2: Formula);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
    getDual(): Formula;
}
