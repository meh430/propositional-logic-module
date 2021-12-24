import { Formula, Valuation } from "./Formula";
export declare class Implication implements Formula {
    private antecedent;
    private consequent;
    constructor(antecedent: Formula, consequent: Formula);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
    getDual(): Formula;
}
