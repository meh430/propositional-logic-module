import { And, Formula, Symbol, Not, Or } from "../logic";
import { Junction } from "./language/Junction";
import { generateValuations } from "./Utils";

export function convertToDNF(formula: Formula): Formula {
  if (isDNF(formula)) {
    return formula;
  }

  const symbols = formula.getSymbols();
  const valuations = generateValuations(symbols);
  const disjuncts = valuations
    .filter((v) => formula.evaluate(v))
    .map((v) => {
      const literals: Formula[] = [];
      for (const l in v) {
        if (v[l]) {
          literals.push(new Symbol(l));
        } else {
          literals.push(new Not(new Symbol(l)));
        }
      }

      if (literals.length == 1) {
        return literals[0];
      }

      return new And(...literals);
    });

  // no disjuncts means no valuations where the formula is 1, so a contradiction
  if (disjuncts.length == 0) {
    const s = new Symbol([...symbols][0]);
    return new And(s, new Not(s));
  }

  if (disjuncts.length == 1) {
    return disjuncts[0];
  }

  return new Or(...disjuncts);
}

export function convertToCNF(formula: Formula): Formula {
  if (isCNF(formula)) {
    return formula;
  }

  const negated = new Not(formula);
  const dnf = convertToDNF(negated);
  return dnf.getDual();
}

function isClause(formula: Junction): boolean {
  return formula.getOperands().every((o) => isLogicalLiteral(o));
}

export function isDNF(formula: Formula): boolean {
  if (isLogicalLiteral(formula)) {
    return true;
  }

  if (formula instanceof And) {
    return isClause(formula);
  }

  if (formula instanceof Or) {
    return formula.getOperands().every((disjunct) => {
      return (
        isLogicalLiteral(disjunct) ||
        (disjunct instanceof And && isClause(disjunct))
      );
    });
  }

  return false;
}

export function isCNF(formula: Formula): boolean {
  if (isLogicalLiteral(formula)) {
    return true;
  }

  if (formula instanceof Or) {
    return isClause(formula);
  }

  if (formula instanceof And) {
    return formula.getOperands().every((conjunct) => {
      return (
        isLogicalLiteral(conjunct) ||
        (conjunct instanceof Or && isClause(conjunct))
      );
    });
  }

  return false;
}

export function isLogicalLiteral(formula: Formula) {
  return (
    formula instanceof Symbol ||
    (formula instanceof Not && formula.isLogicalLiteral())
  );
}
