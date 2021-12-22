import * as assert from "assert";
import { Or } from "../language/Or";
import { Literal } from "../language/Literal";
import { TestSuite } from "./test";

function getLiterals(): Literal[] {
  return [new Literal("p"), new Literal("q")];
}

const tests: TestSuite = {
  "Or evaluates to 0 when both operands are 0": () => {
    const or = new Or(getLiterals());
    assert.equal(or.evaluate({ p: false, q: false }), false);
  },
  "Or evaluates to 1 when one operand is 1": () => {
    const or = new Or(getLiterals());
    assert.equal(or.evaluate({ p: true, q: false }), true);
    assert.equal(or.evaluate({ p: false, q: true }), true);
  },
  "Or evaluates to 1 when both operands are 1": () => {
    const or = new Or(getLiterals());
    assert.equal(or.evaluate({ p: true, q: true }), true);
  },
};

module.exports = tests;
