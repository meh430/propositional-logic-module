"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTautologicalConsequenceCounter = exports.isSatisfiableSet = exports.isSatisfiableFormula = void 0;
const Utils_1 = require("./Utils");
function isSatisfiableFormula(formula) {
    const symbols = formula.getSymbols();
    const valuations = (0, Utils_1.generateValuations)(symbols);
    // satisfiable iff there exists a valuation for which the formula is true
    return valuations.some((v) => formula.evaluate(v));
}
exports.isSatisfiableFormula = isSatisfiableFormula;
function isSatisfiableSet(formulas) {
    // empty set is satisfiable
    if (formulas.length == 0) {
        return true;
    }
    const symbols = (0, Utils_1.collectSymbols)(formulas);
    const valuations = (0, Utils_1.generateValuations)(symbols);
    // satisfiable set iff there exists a valuation for which every formula is true
    return valuations.some((v) => formulas.every((f) => f.evaluate(v)));
}
exports.isSatisfiableSet = isSatisfiableSet;
function getTautologicalConsequenceCounter(premises, conclusion) {
    const symbols = (0, Utils_1.collectSymbols)([...premises, conclusion]);
    const valuations = (0, Utils_1.generateValuations)(symbols);
    // unsatisfiable set implies everything
    // unsatisfiable iff all valuations result in a false set
    const isUnsatisfiable = valuations.every((v) => premises.some((p) => !p.evaluate(v)));
    if (isUnsatisfiable) {
        return undefined;
    }
    // for every valuation where the premises are true, if the conclusion is false, that is the counter
    for (let i = 0; i < valuations.length; i++) {
        const v = valuations[i];
        const premisesSatisfied = premises.length > 0 ? premises.every((p) => p.evaluate(v)) : true;
        const conclusionSatisfied = conclusion.evaluate(v);
        if (premisesSatisfied && !conclusionSatisfied) {
            return v;
        }
    }
    return undefined;
}
exports.getTautologicalConsequenceCounter = getTautologicalConsequenceCounter;
//# sourceMappingURL=Satisfiability.js.map