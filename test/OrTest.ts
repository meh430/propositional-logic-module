import * as assert from "assert";
import { Or } from "../src/language/Or";
import { Not } from "../src/language/Not";
import { Literal } from "../src/language/Literal";
import { TestSuite } from "./test";

function getLiterals(): Literal[] {
  return [new Literal("p"), new Literal("q")];
}

const tests: TestSuite = {
  "Or evaluates to 0 when both operands are 0": () => {
    const or = new Or(...getLiterals());
    assert.equal(or.evaluate({ p: false, q: false }), false);
  },
  "Or evaluates to 1 when one operand is 1": () => {
    const or = new Or(...getLiterals());
    assert.equal(or.evaluate({ p: true, q: false }), true);
    assert.equal(or.evaluate({ p: false, q: true }), true);
  },
  "Or evaluates to 1 when both operands are 1": () => {
    const or = new Or(...getLiterals());
    assert.equal(or.evaluate({ p: true, q: true }), true);
  },
  "Or returns the correct formula": () => {
    const p = new Literal("p");
    const q = new Literal("q");
    const r = new Literal("r");

    assert.equal(new Or(p, q).getFormula(), "(p ∨ q)");
    assert.equal(new Or(p, p).getFormula(), "(p ∨ p)");
    assert.equal(new Or(p, q, r).getFormula(), "(p ∨ q ∨ r)");
    assert.equal(new Or(p, new Not(q)).getFormula(), "(p ∨ (¬q))");
    assert.equal(
      new Or(p, q, r, r, p, q).getFormula(),
      "(p ∨ q ∨ r ∨ r ∨ p ∨ q)"
    );

    assert.deepEqual(
      new Or(p, q, r, r, p, q).getSymbols(),
      new Set<string>(["p", "q", "r"])
    );
  },
};

module.exports = tests;
