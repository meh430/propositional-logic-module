"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTautology = void 0;
const Utils_1 = require("./Utils");
function isTautology(formula) {
    const symbols = formula.getSymbols();
    const valuations = (0, Utils_1.generateValuations)(symbols);
    // tautology iff every valuation results in a true
    return valuations.every((v) => formula.evaluate(v));
}
exports.isTautology = isTautology;
//# sourceMappingURL=Tautology.js.map