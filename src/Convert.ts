import { And, Formula, Literal, Not, Or } from "../logic";
import { generateValuations } from "./Utils";

export function convertToDNF(formula: Formula): Formula {
  const valuations = generateValuations(formula.getSymbols());
  const disjuncts = valuations
    .filter((v) => formula.evaluate(v))
    .map((v) => {
      const literals: Formula[] = [];
      for (const l in v) {
        if (v[l]) {
          literals.push(new Literal(l));
        } else {
          literals.push(new Not(new Literal(l)));
        }
      }

      return new And(...literals);
    });
  return new Or(...disjuncts);
}

export function convertToCNF(formula: Formula): Formula {
  const negated = new Not(formula);
  const dnf = convertToDNF(negated);
  return dnf.getDual();
}
