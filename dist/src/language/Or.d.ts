import { Formula, Valuation } from "./Formula";
import { Junction } from "./Junction";
export declare class Or extends Junction {
    constructor(...disjuncts: Formula[]);
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
