export interface Formula {
    getSymbols(): Set<string>;
    evaluate(valuation: Valuation): boolean;
    getFormula(): string;
}
export interface Valuation {
    [key: string]: boolean;
}
