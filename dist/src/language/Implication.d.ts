import { Formula, Valuation } from "./Formula";
export declare class Implication implements Formula {
    antecedent: Formula;
    consequent: Formula;
    constructor(antecedent: Formula, consequent: Formula);
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
