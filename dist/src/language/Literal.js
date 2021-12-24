"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
const Not_1 = require("./Not");
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
    getCNF() {
        return new Not_1.Not(this);
    }
}
exports.Literal = Literal;
//# sourceMappingURL=Literal.js.map