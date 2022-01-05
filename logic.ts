import { And, Or } from "./src/language/Junction";
import { Biconditional } from "./src/language/Biconditional";
import { Formula, Valuation } from "./src/language/Formula";
import { Implication } from "./src/language/Implication";
import { Not, Symbol } from "./src/language/Literal";
import { isContradiction } from "./src/Contradiction";
import { isTautology } from "./src/Tautology";
import {
  isSatisfiableFormula,
  isSatisfiableSet,
  getTautologicalConsequenceCounter,
} from "./src/Satisfiability";
import {
  convertToDNF,
  convertToCNF,
  isDNF,
  isCNF,
  isLogicalLiteral,
} from "./src/Convert";
import { Row, TruthTable } from "./src/TruthTable";
import { dpp } from "./src/DavisPutnamProcedure";
import { flattenConjunction } from "./src/Utils";
import { createFormula, tokenize } from "./src/Parser";
export {
  And,
  Biconditional,
  Implication,
  Symbol,
  Not,
  Or,
  Formula,
  Valuation,
  isTautology,
  isContradiction,
  isSatisfiableSet,
  isSatisfiableFormula,
  getTautologicalConsequenceCounter,
  convertToDNF,
  convertToCNF,
  isDNF,
  isCNF,
  isLogicalLiteral,
  Row,
  TruthTable,
};

/*
const s = ["A", "B", "C", "D", "E", "F", "G", "H"].map((e) => new Symbol(e));
// given ((A and H) and ((B and (F and G)) and (C and D)))
// return (A and H and B and F and G and C and D)
const c = new And(
  new And(s[0], s[7]),
  new And(new And(s[1], new And(s[5], s[6])), new And(s[2], s[3]))
);

console.log(flattenConjunction(c));
*/

// console.log(createFormula("A and B and C implies D"));
