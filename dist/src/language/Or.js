"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Or = void 0;
const Junction_1 = require("./Junction");
class Or extends Junction_1.Junction {
    constructor(...disjuncts) {
        super(...disjuncts);
    }
    evaluate(valuation) {
        return this.juncts.some((disjunct) => disjunct.evaluate(valuation));
    }
    getFormula() {
        return this.getJunctFormula(" ∨ ");
    }
}
exports.Or = Or;
//# sourceMappingURL=Or.js.map