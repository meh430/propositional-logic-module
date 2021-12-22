import * as assert from "assert";
import { And } from "../src/language/And";
import { Not } from "../src/language/Not";
import { Literal } from "../src/language/Literal";
import { TestSuite } from "./test";

function getLiterals(): Literal[] {
  return [new Literal("p"), new Literal("q")];
}

const tests: TestSuite = {
  "And evaluates to 0 when both operands are 0": () => {
    const and = new And(...getLiterals());
    assert.equal(and.evaluate({ p: false, q: false }), false);
  },
  "And evaluates to 0 when one operand is 0": () => {
    const and = new And(...getLiterals());
    assert.equal(and.evaluate({ p: true, q: false }), false);
    assert.equal(and.evaluate({ p: false, q: true }), false);
  },
  "And evaluates to 1 when both operands are 1": () => {
    const and = new And(...getLiterals());
    assert.equal(and.evaluate({ p: true, q: true }), true);
  },
  "And returns the correct formula": () => {
    const p = new Literal("p");
    const q = new Literal("q");
    const r = new Literal("r");

    // p and p
    const f1 = new And(p, p);
    assert.equal(f1.getFormula(), "(p ∧ p)");

    // p and q
    const f2 = new And(p, q);
    assert.equal(f2.getFormula(), "(p ∧ q)");

    // p and q and r
    const f3 = new And(p, q, r);
    assert.equal(f3.getFormula(), "(p ∧ q ∧ r)");

    const f4 = new And(p, q, new Not(r), r, q, p);
    assert.equal(f4.getFormula(), "(p ∧ q ∧ (¬r) ∧ r ∧ q ∧ p)");

    assert.deepEqual(f4.getSymbols(), new Set<string>(["p", "q", "r"]));
  },
};

module.exports = tests;
