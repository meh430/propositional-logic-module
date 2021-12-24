"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Implication = void 0;
class Implication {
    constructor(antecedent, consequent) {
        this.antecedent = antecedent;
        this.consequent = consequent;
    }
    getSymbols() {
        return new Set([
            ...this.antecedent.getSymbols(),
            ...this.consequent.getSymbols(),
        ]);
    }
    evaluate(valuation) {
        const antecedentVal = this.antecedent.evaluate(valuation);
        const consequentVal = this.consequent.evaluate(valuation);
        return !antecedentVal || consequentVal;
    }
    getFormula() {
        return `(${this.antecedent.getFormula()} → ${this.consequent.getFormula()})`;
    }
    getDual() {
        throw new Error("Formula not in DNF");
    }
}
exports.Implication = Implication;
//# sourceMappingURL=Implication.js.map