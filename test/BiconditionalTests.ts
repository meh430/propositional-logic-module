import * as assert from "assert";
import { Biconditional } from "../src/language/Biconditional";
import { Not, Symbol } from "../src/language/Literal";
import { TestSuite } from "./test";

function getBiconditional(): Biconditional {
  return new Biconditional(new Symbol("p"), new Symbol("q"));
}

const tests: TestSuite = {
  "Biconditional matches truth table": () => {
    const biconditional = getBiconditional();
    assert.equal(biconditional.evaluate({ p: false, q: false }), true);
    assert.equal(biconditional.evaluate({ p: true, q: false }), false);
    assert.equal(biconditional.evaluate({ p: false, q: true }), false);
    assert.equal(biconditional.evaluate({ p: true, q: true }), true);
  },
  "Biconditional returns the correct formula": () => {
    const p = new Symbol("p");
    const q = new Symbol("q");
    assert.equal(new Biconditional(p, q).getFormula(), "(p ↔ q)");
    assert.equal(new Biconditional(p, p).getFormula(), "(p ↔ p)");
    assert.equal(new Biconditional(new Not(q), p).getFormula(), "((¬q) ↔ p)");

    assert.deepEqual(
      getBiconditional().getSymbols(),
      new Set<string>(["p", "q"])
    );
  },
};

module.exports = tests;
