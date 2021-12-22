"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Junction = void 0;
class Junction {
    constructor(juncts) {
        if (juncts.length < 2) {
            throw new Error("Incorrect number of operands");
        }
        this.juncts = juncts;
    }
    getSymbols() {
        const symbols = new Set();
        this.juncts.forEach((conjunct) => {
            conjunct.getSymbols().forEach((symbol) => symbols.add(symbol));
        });
        return symbols;
    }
    getJunctFormula(connective) {
        let formula = "(";
        const len = this.juncts.length;
        this.juncts.forEach((conjunct, index) => {
            formula += conjunct.getFormula();
            if (index != len - 1) {
                formula += " ∧ ";
            }
        });
        return formula + ")";
    }
}
exports.Junction = Junction;
//# sourceMappingURL=Junction.js.map