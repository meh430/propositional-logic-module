"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biconditional = void 0;
class Biconditional {
    constructor(operand1, operand2) {
        this.operand1 = operand1;
        this.operand2 = operand2;
    }
    getSymbols() {
        return new Set([
            ...this.operand1.getSymbols(),
            ...this.operand2.getSymbols(),
        ]);
    }
    evaluate(valuation) {
        const operand1Val = this.operand1.evaluate(valuation);
        const operand2Val = this.operand2.evaluate(valuation);
        return (operand1Val && operand2Val) || (!operand1Val && !operand2Val);
    }
    getFormula() {
        return `(${this.operand1.getFormula()} ↔ ${this.operand2.getFormula()})`;
    }
    getDual() {
        throw new Error("Formula not in DNF");
    }
}
exports.Biconditional = Biconditional;
//# sourceMappingURL=Biconditional.js.map