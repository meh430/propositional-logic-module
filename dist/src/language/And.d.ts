import { Formula, Valuation } from "./Formula";
import { Junction } from "./Junction";
export declare class And extends Junction {
    constructor(...conjucts: Formula[]);
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
