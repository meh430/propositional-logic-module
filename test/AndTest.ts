import * as assert from "assert";
import { And } from "../language/And";
import { Literal } from "../language/Literal";
import { TestSuite } from "./test";

function getLiterals(): Literal[] {
  return [new Literal("p"), new Literal("q")];
}

const tests: TestSuite = {
  "And evaluates to 0 when both operands are 0": () => {
    const and = new And(getLiterals());
    assert.equal(and.evaluate({ p: false, q: false }), false);
  },
  "And evaluates to 0 when one operand is 0": () => {
    const and = new And(getLiterals());
    assert.equal(and.evaluate({ p: true, q: false }), false);
    assert.equal(and.evaluate({ p: false, q: true }), false);
  },
  "And evaluates to 1 when both operands are 1": () => {
    const and = new And(getLiterals());
    assert.equal(and.evaluate({ p: true, q: true }), true);
  },
};

module.exports = tests;
