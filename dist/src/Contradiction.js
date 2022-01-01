"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContradiction = void 0;
const Literal_1 = require("./language/Literal");
const Tautology_1 = require("./Tautology");
function isContradiction(formula) {
    // the negation of a contradiction will be a tuatology
    return (0, Tautology_1.isTautology)(new Literal_1.Not(formula));
}
exports.isContradiction = isContradiction;
//# sourceMappingURL=Contradiction.js.map