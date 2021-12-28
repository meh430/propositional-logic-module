import * as assert from "assert";
import { Implication } from "../src/language/Implication";
import { Not, Symbol } from "../src/language/Literal";
import { TestSuite } from "./test";

function getImplication(): Implication {
  return new Implication(new Symbol("p"), new Symbol("q"));
}

const tests: TestSuite = {
  "Implication evaluates to 1 when antecedent is 0": () => {
    const implication = getImplication();
    assert.equal(implication.evaluate({ p: false, q: false }), true);
    assert.equal(implication.evaluate({ p: false, q: true }), true);
  },
  "Implication evaluates to 0 when antecedent is 1 and consequent is 0": () => {
    const implication = getImplication();
    assert.equal(implication.evaluate({ p: true, q: false }), false);
  },
  "Implication returns the correct formula": () => {
    const p = new Symbol("p");
    const q = new Symbol("q");

    assert.equal(new Implication(p, q).getFormula(), "(p → q)");
    assert.equal(new Implication(p, p).getFormula(), "(p → p)");
    assert.equal(new Implication(new Not(p), q).getFormula(), "((¬p) → q)");
    assert.equal(new Implication(p, new Not(q)).getFormula(), "(p → (¬q))");

    assert.deepEqual(
      getImplication().getSymbols(),
      new Set<string>(["p", "q"])
    );
  },
};

module.exports = tests;
