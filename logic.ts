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
const p = new Symbol("p");
const q = new Symbol("q");
const r = new Symbol("r");
const s = new Symbol("s");
console.log(
  dpp(
    [
      new Or(new Not(p), q),
      new Or(new Not(q), new Not(r), s),
      p,
      r,
      new Not(s),
    ],
    ["p", "q", "r", "s"]
  )
);
