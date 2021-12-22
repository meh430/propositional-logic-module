import { Formula, Valuation } from "./language/Formula";
import { collectSymbols, generateValuations } from "./Utils";

export function isSatisfiableFormula(formula: Formula): boolean {
  const symbols = formula.getSymbols();
  const valuations = generateValuations(symbols);
  return valuations.some((v) => formula.evaluate(v));
}

export function isSatisfiableSet(formulas: Formula[]): boolean {
  if (formulas.length == 0) {
    return true;
  }

  const symbols: Set<string> = collectSymbols(formulas);

  const valuations: Valuation[] = generateValuations(symbols);
  return valuations.some((v) => !formulas.some((f) => !f.evaluate(v)));
}

export function getTautologicalConsequenceCounter(
  premises: Formula[],
  conclusion: Formula
): Valuation | undefined {
  // empty set implies everything
  if (premises.length == 0) {
    return undefined;
  }

  // for every valuation where the premises are true, if the conclusion is false, that is the counter
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
