"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.And = void 0;
const Junction_1 = require("./Junction");
class And extends Junction_1.Junction {
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
}
exports.And = And;
//# sourceMappingURL=And.js.map