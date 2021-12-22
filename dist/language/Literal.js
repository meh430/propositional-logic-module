"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
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
}
exports.Literal = Literal;
//# sourceMappingURL=Literal.js.map