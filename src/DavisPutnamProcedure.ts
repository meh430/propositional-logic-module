import { Formula, Not, Symbol, Or, And } from "../logic";
import { convertToCNF, isLogicalLiteral } from "./Convert";

function disjunctiveClauseToLiteralSet(clause: Or): Set<Formula> {
  return new Set(clause.getOperands().filter((c) => isLogicalLiteral(c)));
}

function processInput(formulas: Formula[]): Set<Set<Formula>> {
  const cnfFormulas = formulas.map((f) => convertToCNF(f));
  const disjunctiveClauseSets = new Set<Set<Formula>>();

  // formula in cnf can be a
  // * literal
  // * Not
  // * Or (disjunctive clause)
  // * And (conjunction of disjunctive clauses)
  cnfFormulas.forEach((f) => {
    if (isLogicalLiteral(f)) {
      disjunctiveClauseSets.add(new Set([f]));
    } else if (f instanceof Or) {
      disjunctiveClauseSets.add(disjunctiveClauseToLiteralSet(f));
    } else if (f instanceof And) {
      f.getOperands().forEach((o) => {
        if (isLogicalLiteral(o)) {
          disjunctiveClauseSets.add(new Set([o]));
        } else if (o instanceof Or) {
          disjunctiveClauseSets.add(disjunctiveClauseToLiteralSet(o));
        }
      });
    }
  });

  return disjunctiveClauseSets;
}
