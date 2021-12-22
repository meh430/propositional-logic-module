import { Formula, Valuation } from "./language/Formula";
import { collectSymbols, generateValuations } from "./Utils";

export function isSatisfiableFormula(formula: Formula): boolean {
  const symbols = formula.getSymbols();
  const valuations = generateValuations(symbols);
  // satisfiable iff there exists a valuation for which the formula is true
  return valuations.some((v) => formula.evaluate(v));
}

export function isSatisfiableSet(formulas: Formula[]): boolean {
  // empty set is satisfiable
  if (formulas.length == 0) {
    return true;
  }

  const symbols: Set<string> = collectSymbols(formulas);

  const valuations: Valuation[] = generateValuations(symbols);
  // satisfiable set iff there exists a valuation for which every formula is true
  return valuations.some((v) => formulas.every((f) => f.evaluate(v)));
}

export function getTautologicalConsequenceCounter(
  premises: Formula[],
  conclusion: Formula
): Valuation | undefined {
  // empty set implies everything
  if (premises.length == 0) {
    return undefined;
  }

  const symbols: Set<string> = collectSymbols([...premises, conclusion]);
  const valuations = generateValuations(symbols);

  // unsatisfiable set implies everything
  // unsatisfiable iff all valuations result in a false set
  const isUnsatisfiable = valuations.every((v) =>
    premises.some((p) => !p.evaluate(v))
  );

  if (isUnsatisfiable) {
    return undefined;
  }

  // for every valuation where the premises are true, if the conclusion is false, that is the counter
  for (let i = 0; i < valuations.length; i++) {
    const v = valuations[i];
    const premisesSatisfied = premises.every((p) => p.evaluate(v));
    const conclusionSatisfied = conclusion.evaluate(v);
    if (premisesSatisfied && !conclusionSatisfied) {
      return v;
    }
  }

  return undefined;
}
