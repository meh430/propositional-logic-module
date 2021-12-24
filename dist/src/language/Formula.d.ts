export interface Formula {
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
    getDual(): Formula;
}
export interface Valuation {
    [key: string]: boolean;
}
