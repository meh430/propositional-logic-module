"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = exports.Not = void 0;
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
        if (this.operand instanceof Literal) {
            return this.operand;
        }
        throw new Error("Formula not in DNF");
    }
}
exports.Not = Not;
class Literal {
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
exports.Literal = Literal;
//# sourceMappingURL=Not.js.map