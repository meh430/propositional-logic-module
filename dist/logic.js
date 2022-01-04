"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruthTable = exports.isLogicalLiteral = exports.isCNF = exports.isDNF = exports.convertToCNF = exports.convertToDNF = exports.getTautologicalConsequenceCounter = exports.isSatisfiableFormula = exports.isSatisfiableSet = exports.isContradiction = exports.isTautology = exports.Or = exports.Not = exports.Symbol = exports.Implication = exports.Biconditional = exports.And = void 0;
const Junction_1 = require("./src/language/Junction");
Object.defineProperty(exports, "And", { enumerable: true, get: function () { return Junction_1.And; } });
Object.defineProperty(exports, "Or", { enumerable: true, get: function () { return Junction_1.Or; } });
const Biconditional_1 = require("./src/language/Biconditional");
Object.defineProperty(exports, "Biconditional", { enumerable: true, get: function () { return Biconditional_1.Biconditional; } });
const Implication_1 = require("./src/language/Implication");
Object.defineProperty(exports, "Implication", { enumerable: true, get: function () { return Implication_1.Implication; } });
const Literal_1 = require("./src/language/Literal");
Object.defineProperty(exports, "Not", { enumerable: true, get: function () { return Literal_1.Not; } });
Object.defineProperty(exports, "Symbol", { enumerable: true, get: function () { return Literal_1.Symbol; } });
const Contradiction_1 = require("./src/Contradiction");
Object.defineProperty(exports, "isContradiction", { enumerable: true, get: function () { return Contradiction_1.isContradiction; } });
const Tautology_1 = require("./src/Tautology");
Object.defineProperty(exports, "isTautology", { enumerable: true, get: function () { return Tautology_1.isTautology; } });
const Satisfiability_1 = require("./src/Satisfiability");
Object.defineProperty(exports, "isSatisfiableFormula", { enumerable: true, get: function () { return Satisfiability_1.isSatisfiableFormula; } });
Object.defineProperty(exports, "isSatisfiableSet", { enumerable: true, get: function () { return Satisfiability_1.isSatisfiableSet; } });
Object.defineProperty(exports, "getTautologicalConsequenceCounter", { enumerable: true, get: function () { return Satisfiability_1.getTautologicalConsequenceCounter; } });
const Convert_1 = require("./src/Convert");
Object.defineProperty(exports, "convertToDNF", { enumerable: true, get: function () { return Convert_1.convertToDNF; } });
Object.defineProperty(exports, "convertToCNF", { enumerable: true, get: function () { return Convert_1.convertToCNF; } });
Object.defineProperty(exports, "isDNF", { enumerable: true, get: function () { return Convert_1.isDNF; } });
Object.defineProperty(exports, "isCNF", { enumerable: true, get: function () { return Convert_1.isCNF; } });
Object.defineProperty(exports, "isLogicalLiteral", { enumerable: true, get: function () { return Convert_1.isLogicalLiteral; } });
const TruthTable_1 = require("./src/TruthTable");
Object.defineProperty(exports, "TruthTable", { enumerable: true, get: function () { return TruthTable_1.TruthTable; } });
const Utils_1 = require("./src/Utils");
const s = ["A", "B", "C", "D", "E", "F", "G", "H"].map((e) => new Literal_1.Symbol(e));
// given ((A and H) and ((B and (F and G)) and (C and D)))
// return (A and H and B and F and G and C and D)
const c = new Junction_1.And(new Junction_1.And(s[0], s[7]), new Junction_1.And(new Junction_1.And(s[1], new Junction_1.And(s[5], s[6])), new Junction_1.And(s[2], s[3])));
console.log((0, Utils_1.flattenConjunction)(c));
//# sourceMappingURL=logic.js.map