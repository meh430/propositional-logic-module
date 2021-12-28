"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = exports.Not = void 0;
class Not {
    constructor(operand) {
        this.operand = operand;
    }
    getSymbols() {
        return this.operand.getSymbols();
    }
    evaluate(valuation) {
        return !this.operand.evaluate(valuation);
    }
    getFormula() {
        return `(¬${this.operand.getFormula()})`;
    }
    getDual() {
        if (this.operand instanceof Symbol) {
            return this.operand;
        }
        throw new Error("Formula not in DNF");
    }
    isLogicalLiteral() {
        return this.operand instanceof Symbol;
    }
}
exports.Not = Not;
class Symbol {
    constructor(symbol) {
        this.symbol = symbol;
    }
    getSymbols() {
        return new Set([this.symbol]);
    }
    evaluate(valuation) {
        return Boolean(valuation[this.symbol]);
    }
    getFormula() {
        return this.symbol;
    }
    getDual() {
        return new Not(this);
    }
}
exports.Symbol = Symbol;
//# sourceMappingURL=Not.js.map