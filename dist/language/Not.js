"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Not = void 0;
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
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map