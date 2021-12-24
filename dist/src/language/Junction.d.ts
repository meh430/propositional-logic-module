import { Formula, Valuation } from "./Formula";
export declare abstract class Junction implements Formula {
    protected juncts: Array<Formula>;
    constructor(...juncts: Formula[]);
    abstract getDual(): Formula;
    abstract evaluate(valuation: Valuation): boolean;
    abstract getFormula(): string;
    getSymbols(): Set<string>;
    protected getJunctFormula(connective: string): string;
}
export declare class And extends Junction {
    constructor(...conjucts: Formula[]);
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
    getDual(): Formula;
}
export declare class Or extends Junction {
    constructor(...disjuncts: Formula[]);
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
    getDual(): Formula;
}
