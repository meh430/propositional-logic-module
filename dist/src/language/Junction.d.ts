import { Formula, Valuation } from "./Formula";
export declare abstract class Junction implements Formula {
    protected juncts: Array<Formula>;
    constructor(...juncts: Formula[]);
    abstract evaluate(valuation: Valuation): boolean;
    abstract getFormula(): string;
    getSymbols(): Set<string>;
    protected getJunctFormula(connective: string): string;
}
