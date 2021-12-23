import { Formula, Valuation } from "./Formula";
export declare class Biconditional implements Formula {
    operand1: Formula;
    operand2: Formula;
    constructor(operand1: Formula, operand2: Formula);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
