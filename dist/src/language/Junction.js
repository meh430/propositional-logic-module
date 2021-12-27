"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Or = exports.And = exports.Junction = void 0;
const Not_1 = require("./Not");
class Junction {
    constructor(...juncts) {
        if (juncts.length < 2) {
            throw new Error("Incorrect number of operands");
        }
        this.juncts = juncts;
    }
    getSymbols() {
        const symbols = new Set();
        this.juncts.forEach((junct) => {
            junct.getSymbols().forEach((symbol) => symbols.add(symbol));
        });
        return symbols;
    }
    getOperands() {
        return [...this.juncts];
    }
    getJunctFormula(connective) {
        let formula = "(";
        const len = this.juncts.length;
        this.juncts.forEach((conjunct, index) => {
            formula += conjunct.getFormula();
            if (index != len - 1) {
                formula += connective;
            }
        });
        return formula + ")";
    }
}
exports.Junction = Junction;
class And extends Junction {
    constructor(...conjucts) {
        super(...conjucts);
    }
    evaluate(valuation) {
        // if even one conjunct is false, And evaluates to false
        // this emulates short circuiting
        return !this.juncts.some((conjunct) => !conjunct.evaluate(valuation));
    }
    getFormula() {
        return this.getJunctFormula(" ∧ ");
    }
    getDual() {
        if (this.juncts.every((j) => j instanceof Not_1.Literal || j instanceof Not_1.Not)) {
            return new Or(...this.juncts.map((j) => j.getDual()));
        }
        throw new Error("Formula not in DNF");
    }
}
exports.And = And;
class Or extends Junction {
    constructor(...disjuncts) {
        super(...disjuncts);
    }
    evaluate(valuation) {
        return this.juncts.some((disjunct) => disjunct.evaluate(valuation));
    }
    getFormula() {
        return this.getJunctFormula(" ∨ ");
    }
    getDual() {
        const inDNF = this.juncts.every((j) => j instanceof Not_1.Literal || j instanceof Not_1.Not || j instanceof And);
        if (inDNF) {
            return new And(...this.juncts.map((j) => j.getDual()));
        }
        throw new Error("Formula not in DNF");
    }
}
exports.Or = Or;
//# sourceMappingURL=Junction.js.map